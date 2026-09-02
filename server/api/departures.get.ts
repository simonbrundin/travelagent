/// <reference types="node" />

// Simple in-memory cache (15 min)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000;

function getCacheKey(
  airport: string,
  dateStr: string,
  direction: string,
): string {
  return `${airport}:${dateStr}:${direction}`;
}

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function fetchFlights(
  airport: string,
  fromTime: string,
  toTime: string,
  direction: string,
  apiKey: string,
  key: string,
): Promise<any[]> {
  try {
    const result = await $fetch(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${airport}/${fromTime}/${toTime}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
        query: { direction, withLeg: true, withCodeshared: true },
      },
    );
    return (result as any)?.[key] || [];
  } catch {
    return [];
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { airport, fromLocal, direction } = query;

  if (!airport || !fromLocal) {
    return { departures: [], arrivals: [] };
  }

  const fromDate = new Date(fromLocal as string);
  const year = fromDate.getFullYear();
  const month = String(fromDate.getMonth() + 1).padStart(2, "0");
  const day = String(fromDate.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  const dir = (direction as string) || "Departure";
  const isArrival = dir.toLowerCase().includes("arrival");
  const key = isArrival ? "arrivals" : "departures";

  // Check cache
  const cacheKey = getCacheKey(airport as string, dateStr, dir);
  const cached = getCached<any>(cacheKey);
  if (cached) {
    return { ...cached, _cached: true };
  }

  const apiKey = String(process.env.NUXT_PUBLIC_AERODATABOX_API_KEY ?? "");
  if (!apiKey) {
    return { departures: [], arrivals: [], error: "API key not configured" };
  }

  // Fetch morning flights
  const morningFlights = await fetchFlights(
    airport as string,
    `${dateStr}T00:00:00`,
    `${dateStr}T12:00:00`,
    dir,
    apiKey,
    key,
  );

  // Delay to avoid rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch afternoon flights
  const afternoonFlights = await fetchFlights(
    airport as string,
    `${dateStr}T12:00:00`,
    `${dateStr}T23:59:59`,
    dir,
    apiKey,
    key,
  );

  const result = {
    [key]: [...morningFlights, ...afternoonFlights],
    _meta: {
      morningCount: morningFlights.length,
      afternoonCount: afternoonFlights.length,
    },
  };

  setCache(cacheKey, result);

  return result;
});
