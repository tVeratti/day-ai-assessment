import { Stack } from "@mui/material";
import { useCallback, useState, useTransition } from "react";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [previousInstructions, setPreviousInstructions] = useState<
    Array<string>
  >([]);
  const [isPending, startTransition] = useTransition();
  const [locationResponse, setLocationResponse] = useState<string>("");

  const fetchLocation = useCallback(async (locationDescription: string) => {
    // TODO: Separate into its own file
    const response = await fetch("/.netlify/functions/locator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationDescription,
      }),
    });

    setLocationResponse("");

    if (response.body) {
      // Stream the response and save the text delta
      const reader = response.body.getReader();
      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const chunk = new TextDecoder().decode(value);
            setLocationResponse((prevText) => prevText + chunk);
          }
        } catch (err) {
          // TODO: Add error handling
        } finally {
          reader.releaseLock();
        }
      };

      readStream();
    }
  }, []);

  const handleSubmit = useCallback((instructions: string) => {
    // Clear previous response - TODO: Add response history?
    setLocationResponse("...");
    startTransition(async () => {
      await fetchLocation(instructions);
      setPreviousInstructions((previous) => [...previous, instructions]);
      return; // done
    });
  }, []);

  const handleConfirmLocation = useCallback(() => {}, []);

  const handleRetryLocation = useCallback(() => {}, []);

  return (
    <Stack>
      <Introduction isFirstQuery={!previousInstructions.length} />
      {/* Location Input */}
      <InstructionsInput onSubmit={handleSubmit} />
      {locationResponse && (
        <ResponseArea
          isLoading={isPending}
          text={locationResponse}
          onConfirm={handleConfirmLocation}
          onRetry={handleRetryLocation}
        />
      )}
      {/* Attire Response 
      <ResponseArea />*/}
    </Stack>
  );
}
