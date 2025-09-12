import { Stack } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import fetchLocation from "../data/fetchLocation";
import useConversation from "../data/useConversation";
import useStreamResponse from "../data/useStreamResponse";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [locations, setLocations] = useState<Array<string>>([]);
  const [responses, setResponses] = useState<Array<string>>([]);
  const locationConversation = useConversation(locations, responses);

  // Response streams return by fetch calls
  const [locationResponse, setLocationResponse] = useState<Response>();
  const [recommendationResponse, setRecommendationResponse] =
    useState<Response>();

  const { text: locationText, isReading: isReadingLocation } =
    useStreamResponse(locationResponse);

  const { text: recommendationText } = useStreamResponse(
    recommendationResponse,
  );

  const handleSubmit = useCallback((instructions: string) => {
    // Trigger next fetch by adding in the INSTRUCTIONS, and
    // therefore altering the `conversation` array that is being watched.
    setLocations((prev) => [...prev, instructions]);
  }, []);

  const handleRetryLocation = useCallback((currentResponse: string) => {
    // Trigger next fetch by adding in the previous RESPONSE, and
    // therefore altering the `conversation` array that is being watched.
    setResponses((prev) => [...prev, currentResponse]);
    setLocations((prev) => [
      ...prev,
      `retry previous user input with another guess`,
    ]);
  }, []);

  const handleConfirmLocation = useCallback(
    (confirmedLocation: string) => {
      console.log(confirmedLocation);
      // fetch attire recommendations next
      // startTransition(async () => {
      //   const response = await fetchRecommendations(confirmedLocation);
      //   setRecommendationResponse(response);

      //   return; // done
      // });
    },
    [responses],
  );

  useEffect(() => {
    if (locationConversation.length) {
      startTransition(async () => {
        const response = await fetchLocation(locationConversation);
        setLocationResponse(response);

        return; // done
      });
    }
  }, [locationConversation.length]);

  return (
    <Stack>
      <Introduction isFirstQuery={true} />
      {/* Location Input */}
      <InstructionsInput onSubmit={handleSubmit} />
      {locationResponse && (
        <ResponseArea
          isLoading={isPending}
          isStreaming={isReadingLocation}
          text={locationText}
          onConfirm={handleConfirmLocation}
          onRetry={handleRetryLocation}
        />
      )}
      {/* Attire Response */}
      {recommendationResponse && (
        <ResponseArea isLoading={isPending} text={recommendationText} />
      )}
    </Stack>
  );
}
