/// <reference types="node" />
export default defineEventHandler(async (event) => {
  const apiKey = "e5e3d3c7a9msh57af80f8866a941p19a2a4jsn3f3f54a605ed";

  try {
    const response = await $fetch.raw(
      "https://aerodatabox.p.rapidapi.com/subscriptions/balance",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
      },
    );

    // Extract quota info from headers
    const headers = response.headers;
    return {
      remaining: parseInt(
        headers.get("x-ratelimit-api-units-remaining") || "0",
      ),
      limit: parseInt(headers.get("x-ratelimit-api-units-limit") || "600"),
      resetTime: parseInt(headers.get("x-ratelimit-api-units-reset") || "0"),
    };
  } catch (error: any) {
    console.error("Quota check error:", error?.message);
    return { error: error?.message || "Failed" };
  }
});
