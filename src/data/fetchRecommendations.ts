const fetchRecommendations = async (location: string) => {
  return await fetch("/.netlify/functions/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location,
    }),
  });
};

export default fetchRecommendations;
