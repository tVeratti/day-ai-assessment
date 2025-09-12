import { Stack } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import fetchLocation, { type LocationResponse } from "../data/fetchLocation";
import useConversation from "../data/useConversation";
import useStreamResponse from "../data/useStreamResponse";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [location, setLocation] = useState<LocationResponse>();
  const [responseText, setResponseText] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Conversation history
  const [instructions, setInstructions] = useState<Array<string>>([]);
  const [responses, setResponses] = useState<Array<string>>([]);
  const locationConversation = useConversation(instructions, responses);

  // Response streams return by fetch calls
  const [recommendationResponse, setRecommendationResponse] =
    useState<Response>();

  const { text: recommendationText } = useStreamResponse(
    recommendationResponse,
  );

  const handleSubmit = useCallback((newInstructions: string) => {
    // Trigger next fetch by adding in the INSTRUCTIONS, and
    // therefore altering the `conversation` array that is being watched.
    setInstructions((prev) => [...prev, newInstructions]);
  }, []);

  const handleRetryLocation = useCallback(() => {
    if (location) {
      // Trigger next fetch by adding in the previous RESPONSE, and
      // therefore altering the `conversation` array that is being watched.
      setResponseText("Hmm, let me try again...");
      setResponses((prev) => [...prev, location.friendlyName]);
      setInstructions((prev) => [
        ...prev,
        `previous response from assistant was incorrect, try again it is not: ${location.friendlyName}`,
      ]);
    }
  }, [location]);

  const handleConfirmLocation = useCallback(() => {
    if (location) {
      // // fetch attire recommendations next
      // startTransition(async () => {
      //   const response = await fetchAttire(
      //     location.latitude,
      //     location.longitude,
      //   );
      //   setRecommendationResponse(response);
      //   return; // done
      // });
    }
  }, [location]);

  useEffect(() => {
    if (locationConversation.length) {
      startTransition(async () => {
        const response = await fetchLocation(locationConversation);
        const result = await response.json();
        setLocation(result);
        setResponseText(result.friendlyName);
        return; // done
      });
    }
  }, [locationConversation.length]);

  return (
    <Stack>
      <Introduction isFirstQuery={true} />
      {/* Location Input */}
      <InstructionsInput onSubmit={handleSubmit} />

      <ResponseArea
        isLoading={isPending}
        text={responseText}
        onConfirm={handleConfirmLocation}
        onRetry={handleRetryLocation}
      />

      {/* Attire Response */}
      {recommendationResponse && (
        <ResponseArea isLoading={isPending} text={recommendationText} />
      )}
    </Stack>
  );
}
