import "dotenv/config";
import OpenAI from "openai";

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export default async (req: Request, _context) => {
  const body = await req.json();
  const { conversation } = body;

  const response = await openai.responses.create({
    model: "gpt-4.1-nano",
    instructions:
      "Determine the user's location based on a potentially vague description. Provide a one sentence guess.",
    input: conversation,
    stream: true,
    store: true,
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        if (chunk.type == "response.output_text.delta") {
          const content = chunk.delta;
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
};
