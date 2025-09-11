import { Stack } from "@mui/material";
import { useCallback, useState, useTransition } from "react";
import InstructionsInput from "./instructions";
import Introduction from "./introduction";
import ResponseArea from "./response";

export default function Home() {
  const [previousInstructions, setPreviousInstructions] = useState<
    Array<string>
  >([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback((instructions: string) => {
    startTransition(async () => {
      console.log("transition ", instructions);
      // await fetch action
      await new Promise((r) => setTimeout(r, 2000)); // TEMP - for testing loading states

      setPreviousInstructions((previous) => [...previous, instructions]);
      return; // done
    });
  }, []);

  return (
    <Stack>
      <Introduction isFirstQuery={!previousInstructions.length} />
      <InstructionsInput onSubmit={handleSubmit} />
      <ResponseArea isLoading={isPending} text={"hi"} />
    </Stack>
  );
}
