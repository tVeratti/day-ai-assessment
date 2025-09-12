import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";

interface ResponseProps {
  text?: string;
  onConfirm: () => void;
  onRetry: (currentGuess: string) => void;
  isLoading: boolean;
  /** Text will stream in, indicate if it's still "typing"... */
  isStreaming?: boolean;
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

export default function Response({
  text,
  isLoading,
  isStreaming,
  onConfirm,
  onRetry,
}: ResponseProps) {
  const theme = useTheme();
  const showLoading: boolean = isLoading;
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    setIsConfirmed(true);
    onConfirm();
  }, []);

  const handleRetry = useCallback(() => {
    onRetry(text || "");
  }, [text]);

  let stateEmoji: string = STATE_EMOJIS.READY;
  switch (true) {
    case isStreaming:
      stateEmoji = STATE_EMOJIS.STREAMING;
      break;
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
        <CardContent>{text || "..."}</CardContent>
        {!isConfirmed && !showLoading && text && (
          <CardActions>
            <Button variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="text" onClick={handleRetry}>
              Retry
            </Button>
          </CardActions>
        )}
      </Card>
    </Root>
  );
}
