import type { InputEntry } from "./useConversation";

export interface LocationResponse {
  longitude: string;
  latitude: string;
  friendlyName: string;
}

const fetchLocation = async (conversation: Array<InputEntry>) => {
  return await fetch("/.netlify/functions/location", {
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
