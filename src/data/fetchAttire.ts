export interface AttireResponse {
  days: Array<DailyAttire>;
}

export interface DailyAttire {
  shortDescription: string;
  idealAttire: string;
  date: string;
}

const fetchAttire = async (latitude: string, longitude: string) => {
  return await fetch("/.netlify/functions/attire", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });
};

export default fetchAttire;
