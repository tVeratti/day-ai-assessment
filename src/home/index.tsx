import { Stack } from "@mui/material";
import InstructionsInput from "./instructions";
import ResponseArea from "./response";

export default function Home() {
  return (
    <Stack>
      <InstructionsInput />
      <ResponseArea />
    </Stack>
  );
}
