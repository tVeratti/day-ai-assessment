import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  FilledInput,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useCallback, useState } from "react";

interface InstructionsProps {
  onSubmit: (instructions: string) => void;
}

const SUBMIT_KEYS: Array<String> = ["Enter"];

export default function Instructions({ onSubmit }: InstructionsProps) {
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
      <FormLabel>Describe your location...</FormLabel>
      <FilledInput
        name="instructions"
        aria-label="Location Description"
        required
        multiline
        rows={3}
        fullWidth
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="large" color="primary" onClick={handleSubmit}>
              <PlayArrowIcon fontSize="large" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
