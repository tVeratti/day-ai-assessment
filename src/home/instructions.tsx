import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useCallback, useRef } from "react";

interface InstructionsProps {
  onSubmit: (instructions: string) => void;
}

const SUBMIT_KEYS: Array<String> = ["Enter"];

export default function Instructions({ onSubmit }: InstructionsProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    const instructions = formData.get("instructions") as string;
    if (instructions) {
      formRef.current?.reset();
      onSubmit(instructions);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (SUBMIT_KEYS.includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        if (formRef) {
          formRef.current?.requestSubmit();
        }
      }
    },
    [],
  );

  return (
    <form action={handleSubmit} ref={formRef}>
      <FormControl fullWidth>
        <FormLabel>Describe your location...</FormLabel>
        <OutlinedInput
          name="instructions"
          aria-label="Location Description"
          required
          multiline
          rows={3}
          fullWidth
          onKeyDown={handleKeyDown}
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
  );
}
