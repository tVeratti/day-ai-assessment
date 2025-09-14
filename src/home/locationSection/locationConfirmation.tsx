import styled from "@emotion/styled";

import { Button, Fade, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import type { LocationResponse } from "../../data/fetchLocation";

interface ResponseProps {
  locationResponse?: LocationResponse;
  isLoading: boolean;
  onConfirm: () => void;
  onRetry: () => void;
}

interface RootProps {
  isLoading: boolean;
}

const Root = styled.div<RootProps>`
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  margin: 2rem 0;
  border: 2px solid #049dbf;
  border-radius: 4px;

  ${(props) =>
    props.isLoading
      ? "animation: loadingAnimation 1s infinite alternate;"
      : ""};

  @keyframes loadingAnimation {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function LocationConfirmation({
  locationResponse,
  isLoading,

  onConfirm,
  onRetry,
}: ResponseProps) {
  const showLoading: boolean = isLoading;

  const handleConfirm = useCallback(() => {
    onConfirm();
  }, []);

  return (
    <Root isLoading={showLoading}>
      {!showLoading && locationResponse && (
        <Fade in={true}>
          <Stack gap={3}>
            <div>
              <Typography variant="h4" component="p" color="#049dbf">
                {locationResponse.friendlyName}
              </Typography>

              <Typography variant="body1">
                {locationResponse.guessReason}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                {locationResponse.latitude}, {locationResponse.longitude}
              </Typography>
            </div>

            <Stack gap={2} direction="row">
              <Button variant="contained" size="large" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="outlined" size="large" onClick={onRetry}>
                Retry
              </Button>
            </Stack>
          </Stack>
        </Fade>
      )}
    </Root>
  );
}
