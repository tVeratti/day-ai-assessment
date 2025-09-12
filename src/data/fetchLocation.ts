import type { InputEntry } from "./useLocationConversation";

const fetchLocation = async (conversation: Array<InputEntry>) => {
  return await fetch("/.netlify/functions/locator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation,
    }),
  });
};

export default fetchLocation;
