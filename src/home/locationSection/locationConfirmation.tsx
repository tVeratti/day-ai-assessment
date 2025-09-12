import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
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
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  color: ${(props) => (props.isLoading ? "red" : "black")};

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

const STATE_EMOJIS: Record<string, string> = {
  LOADING: ":o",
  STREAMING: ":D",
  READY: ":)",
};

export default function LocationConfirmation({
  locationResponse,
  isLoading,

  onConfirm,
  onRetry,
}: ResponseProps) {
  const theme = useTheme();
  const showLoading: boolean = isLoading;

  let stateEmoji: string = STATE_EMOJIS.READY;
  switch (true) {
    case isLoading:
      stateEmoji = STATE_EMOJIS.LOADING;
      break;
  }

  return (
    <Root isLoading={showLoading}>
      <Avatar
        sx={{ bgcolor: theme.palette.primary.main, transform: "rotate(90deg)" }}
      >
        {stateEmoji}
      </Avatar>
      <Card variant="outlined">
        {!showLoading && locationResponse && (
          <>
            <CardContent>
              <Typography variant="body1">
                {locationResponse.guessReason}
              </Typography>
              <Typography variant="h4" component="p">
                {locationResponse.friendlyName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={onConfirm}>
                Confirm
              </Button>
              <Button variant="text" onClick={onRetry}>
                Retry
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </Root>
  );
}
