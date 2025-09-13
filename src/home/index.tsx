import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import fetchAttire from "../data/fetchAttire";
import fetchLocation, { type LocationResponse } from "../data/fetchLocation";
import useConversation from "../data/useConversation";
import useStreamResponse from "../data/useStreamResponse";
import AttireSection from "./attireSection";
import Introduction from "./introduction";
import InstructionsInput from "./locationSection/instructions";
import LocationConfirmation from "./locationSection/locationConfirmation";

const TopSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 2rem;
  flex-direction: column;
  color: white;
  background: #049dbf;
  background: linear-gradient(190deg, #0d5466 0%, #049dbf 100%);
  border-radius: 4px;

  @media screen and (max-width: 900px) {
    align-items: stretch;
  }
`;

export default function Home() {
  const [location, setLocation] = useState<LocationResponse>();
  const [isLocationPending, startLocationTransition] = useTransition();
  const [isAttirePending, startAttireTransition] = useTransition();

  // Conversation history
  const [instructions, setInstructions] = useState<Array<string>>([]);
  const [responses, setResponses] = useState<Array<string>>([]);
  const locationConversation = useConversation(instructions, responses);

  // Attire Recommendation Response / Stream
  const [recommendationResponse, setRecommendationResponse] =
    useState<Response>();
  const {
    text: attireJson,
    isReading,
    reset: resetAttire,
  } = useStreamResponse(recommendationResponse);

  const handleSubmit = useCallback((newInstructions: string) => {
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
      startAttireTransition(async () => {
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
      startLocationTransition(async () => {
        const response = await fetchLocation(locationConversation);
        const result = await response.json();
        setLocation(result);
        return; // done
      });
    }
  }, [locationConversation]);

  return (
    <Stack>
      <TopSection>
        <Introduction isFirstQuery={true} />
        {/* Location Input */}
        <InstructionsInput
          onSubmit={handleSubmit}
          isLoading={isLocationPending}
        />
      </TopSection>

      {/* Location Response */}
      {/* <Typography variant="h4">2. Confirm Location</Typography> */}
      {location && (
        <LocationConfirmation
          isLoading={isLocationPending}
          locationResponse={location}
          onConfirm={handleConfirmLocation}
          onRetry={handleRetryLocation}
        />
      )}

      <Box marginTop={2}>
        {/* <Typography variant="h4">3. Review Weather & Attire</Typography> */}
        {/* Attire Response */}
        <AttireSection
          isLoading={isAttirePending || isReading}
          attireResponseJson={attireJson}
        />
      </Box>
    </Stack>
  );
}
