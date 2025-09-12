import "dotenv/config";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const DailyWeatherEvent = z.object({
  shortDescription: z.string(),
  date: z.string(),
  idealAttire: z.string(),
});

const WeatherEvent = z.object({
  days: z.array(DailyWeatherEvent),
});

// Open Meteo API Constants
// https://open-meteo.com/en/docs
const NUM_DAYS_FORECAST: number = 7;
const DAILY_PARAMS: string = [
  "weather_code",
  "apparent_temperature_min",
  "apparent_temperature_max",
].join(",");

export default async (req: Request, _context) => {
  const body = await req.json();
  const { latitude, longitude } = body;

  // Weather
  // -------------------------------------
  // Get forecast from Open Meteo
  const meteoApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=${NUM_DAYS_FORECAST}&daily=${DAILY_PARAMS}&temperature_unit=fahrenheit`;
  const weatherResponse = await fetch(meteoApiUrl);
  const weatherResult = await weatherResponse.json();

  // Attire
  // -------------------------------------
  // Give weather data to openai to suggest attire
  const response = await openai.responses.create({
    model: "gpt-4.1-nano",
    instructions:
      "Describe the weather based on this data from Open Meteo. Use the data from each day to suggest attire that matches the weather.",
    input: JSON.stringify(weatherResult),
    stream: true,
    text: {
      format: zodTextFormat(WeatherEvent, "event"),
    },
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
