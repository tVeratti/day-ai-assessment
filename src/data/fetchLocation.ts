const fetchLocation = async (locationDescription: string) => {
  return await fetch("/.netlify/functions/locator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationDescription,
    }),
  });
};

export default fetchLocation;
