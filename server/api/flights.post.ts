export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { origin, destination, date } = body;

  const apiKey =
    process.env.IGNAV_API_KEY || "ignav_FeUxRhsAZ_SAzJGZwLDsRIxpRUxBKhNA";

  try {
    const response = await $fetch("https://ignav.com/api/fares/one-way", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: {
        origin,
        destination,
        departure_date: date,
        market: "SE",
        adults: 1,
      },
    });

    return response;
  } catch (error) {
    console.error("Ignav API error:", error);
    return { itineraries: [] };
  }
});
