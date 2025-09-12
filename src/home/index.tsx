import { Stack } from "@mui/material";
import { useCallback, useState, useTransition } from "react";
import fetchLocation from "../data/fetchLocation";
import useStreamResponse from "../data/useStreamResponse";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [locationInstructions, setLocationInstructions] = useState<string>("");
  const [locationResponse, setLocationResponse] = useState<Response>();

  const { text: locationText, isReading: isReadingLocation } =
    useStreamResponse(locationResponse);

  const handleSubmit = useCallback((instructions: string) => {
    setLocationInstructions(instructions);
    // Clear previous response - TODO: Add response history?
    startTransition(async () => {
      const response = await fetchLocation(instructions);
      setLocationResponse(response);

      return; // done
    });
  }, []);

  const handleConfirmLocation = useCallback(() => {
    // fetch attire recommendations next
  }, []);

  const handleRetryLocation = useCallback(
    (currentGuess: string) => {
      startTransition(async () => {
        const response = await fetchLocation(
          `retry guessing based on "${locationInstructions}" - previous guess that was incorrect was: "${currentGuess}"`,
        );
        setLocationResponse(response);

        return; // done
      });
    },
    [locationInstructions],
  );

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
