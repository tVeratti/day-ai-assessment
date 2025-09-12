import { useMemo } from "react";

export interface InputEntry {
  role: string;
  content: string;
}

const useConversation = (
  instructions: Array<string>,
  responses: Array<string>,
): Array<InputEntry> => {
  const instructionsString = instructions.join("_");
  return useMemo(() => {
    const conversation: Array<InputEntry> = [];
    for (let i = 0; i < instructions.length; i++) {
      const userInput: InputEntry = { role: "user", content: instructions[i] };
      conversation.push(userInput);

      if (responses.length > i) {
        const assistantInput: InputEntry = {
          role: "assistant",
          content: responses[i],
        };
        conversation.push(assistantInput);
      }
    }

    return conversation;
  }, [instructionsString, responses]);
};

export default useConversation;
