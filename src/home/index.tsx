import { Stack } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import fetchAttire from "../data/fetchAttire";
import fetchLocation, { type LocationResponse } from "../data/fetchLocation";
import useConversation from "../data/useConversation";
import useStreamResponse from "../data/useStreamResponse";
import AttireSection from "./attireSection";
import Introduction from "./introduction";
import InstructionsInput from "./locationSection/instructions";

import LocationConfirmation from "./locationSection/locationConfirmation";

export default function Home() {
  const [location, setLocation] = useState<LocationResponse>();
  const [isPending, startTransition] = useTransition();

  // Conversation history
  const [instructions, setInstructions] = useState<Array<string>>([]);
  const [responses, setResponses] = useState<Array<string>>([]);
  const locationConversation = useConversation(instructions, responses);

  // Attire Recommendation Response / Stream
  const [recommendationResponse, setRecommendationResponse] =
    useState<Response>();
  const { text: attireJson, reset: resetAttire } = useStreamResponse(
    recommendationResponse,
  );

  const handleSubmit = useCallback((newInstructions: string) => {
    console.log(newInstructions);
    // Trigger next fetch by adding in the INSTRUCTIONS, and
    // therefore altering the `conversation` array that is being watched.
    setInstructions([newInstructions]);
  }, []);

  const handleRetryLocation = useCallback(() => {
    if (location) {
      // Trigger next fetch by adding in the previous RESPONSE, and
      // therefore altering the `conversation` array that is being watched.
      setResponses((prev) => [...prev, location.friendlyName]);
      setInstructions((prev) => [
        ...prev,
        `previous response from assistant was incorrect, try again it is not: ${location.friendlyName}`,
      ]);
    }
  }, [location]);

  const handleConfirmLocation = useCallback(() => {
    if (location) {
      // fetch attire recommendations next
      startTransition(async () => {
        const response = await fetchAttire(
          location.latitude,
          location.longitude,
        );
        setRecommendationResponse(response);
        return; // done
      });
    }
  }, [location]);

  useEffect(() => {
    if (locationConversation.length) {
      resetAttire();
      startTransition(async () => {
        const response = await fetchLocation(locationConversation);
        const result = await response.json();
        setLocation(result);
        return; // done
      });
    }
  }, [locationConversation]);

  return (
    <Stack>
      <Introduction isFirstQuery={true} />
      {/* Location Input */}
      <InstructionsInput onSubmit={handleSubmit} isLoading={isPending} />

      {/* Location Response */}
      {location && (
        <LocationConfirmation
          isLoading={isPending}
          locationResponse={location}
          onConfirm={handleConfirmLocation}
          onRetry={handleRetryLocation}
        />
      )}

      {/* Attire Response */}
      <AttireSection isLoading={isPending} attireResponseJson={attireJson} />
    </Stack>
  );
}
