import { Stack } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import fetchLocation from "../data/fetchLocation";
import useLocationConversation from "../data/useLocationConversation";
import useStreamResponse from "../data/useStreamResponse";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [locations, setLocations] = useState<Array<string>>([]);
  const [responses, setResponses] = useState<Array<string>>([]);
  const conversation = useLocationConversation(locations, responses);

  const [locationResponse, setLocationResponse] = useState<Response>();

  const { text: locationText, isReading: isReadingLocation } =
    useStreamResponse(locationResponse);

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

  const handleConfirmLocation = useCallback(() => {
    // fetch attire recommendations next
  }, []);

  useEffect(() => {
    if (conversation.length) {
      startTransition(async () => {
        const response = await fetchLocation(conversation);
        setLocationResponse(response);

        return; // done
      });
    }
  }, [conversation.length]);

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
      {/* Attire Response 
      <ResponseArea />*/}
    </Stack>
  );
}
