import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useState } from "react";

interface InstructionsProps {
  isLoading: boolean;
  onSubmit: (instructions: string) => void;
}

const SUBMIT_KEYS: Array<String> = ["Enter"];

const Input = styled(OutlinedInput)(
  () => `
background: white;
`,
);

export default function Instructions({
  isLoading,
  onSubmit,
}: InstructionsProps) {
  const [locationDescription, setLocationDescription] = useState<string>("");

  const handleSubmit = useCallback(() => {
    if (locationDescription) {
      onSubmit(locationDescription);
    }
  }, [locationDescription]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (SUBMIT_KEYS.includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationDescription(e.target.value);
  }, []);

  return (
    <FormControl fullWidth>
      <Input
        sx={{ background: "white" }}
        name="instructions"
        aria-label="Location Description"
        placeholder="Describe your location..."
        required
        multiline
        rows={2}
        fullWidth
        disabled={isLoading}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="large"
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <PlayArrowIcon fontSize="large" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
