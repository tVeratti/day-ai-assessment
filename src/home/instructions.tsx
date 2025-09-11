import styled from "@emotion/styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useCallback, useState, useTransition } from "react";

const Root = styled.div`
  display: flex;
  padding: 2rem;
  min-height: 30vh;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out 0.5s;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InfoRoot = styled.div`
  max-width: 25rem;
`;

const InputRoot = styled.div`
  flex: 1;
`;

export default function Instructions() {
  const [instructions, setInstructions] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      // await fetch action
      console.log("transition");
      return; // done
    });
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInstructions(e.target.value);
  }, []);

  return (
    <Root>
      {/* Info */}
      <InfoRoot>
        <Typography variant="h4">Get Started!</Typography>
        <Typography variant="body1">
          Describe your location and receive weather-appropriate attire
          recommendations for the next seven days.
        </Typography>
      </InfoRoot>

      {/* Input */}
      <InputRoot>
        <form action={handleSubmit}>
          <FormControl fullWidth>
            <OutlinedInput
              aria-label="Location Description"
              multiline
              rows={3}
              fullWidth
              onInput={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" size="large" color="primary">
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </InputRoot>
    </Root>
  );
}
