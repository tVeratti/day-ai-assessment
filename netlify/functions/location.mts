import "dotenv/config";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const LocationEvent = z.object({
  latitude: z.string(),
  longitude: z.string(),
  friendlyName: z.string(),
});

export default async (req: Request, _context) => {
  const body = await req.json();
  const { conversation } = body;

  // TODO: handle input that cannot generate a valid response
  const response = await openai.responses.parse({
    model: "gpt-4.1-nano",
    instructions:
      "Determine the user's location based on a potentially vague description. Review previous responses in case there are incorrect guesses already made. Only use digits in latitude/longitude.",
    input: conversation,
    store: true,
    text: {
      format: zodTextFormat(LocationEvent, "event"),
    },
  });

  return new Response(JSON.stringify(response.output_parsed), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
