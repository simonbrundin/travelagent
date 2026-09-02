/// <reference types="node" />
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { from, to, date, tripType } = query;

  if (!from || !to || !date) {
    return { error: "Missing parameters: from, to, date required" };
  }

  try {
    // Call Google Flights MCP server
    const response = await $fetch(
      "https://google-flights-lulu.flightpowers.com/mcp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name:
              tripType === "roundtrip"
                ? "search_roundtrip_flights"
                : "search_oneway_flights",
            arguments: {
              from_airport: from,
              to_airport: to,
              departure_date_from: date,
              departure_date_to: date,
              sort_by: "price",
            },
          },
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error("Google Flights MCP error:", error?.message);
    return { error: error?.message || "Failed to fetch flights" };
  }
});
