export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  status: string;
}

export interface ApiQuota {
  aeroDataBox: {
    remaining: number;
    limit: number;
    resetTime: number;
  };
}

// Swedish airports mapping
const airportMapping: Record<string, string> = {
  stockholm: "ARN",
  göteborg: "GOT",
  malmö: "MMX",
};

// All available airports for display
const airports: Airport[] = [
  {
    code: "ARN",
    name: "Arlanda Airport",
    city: "Stockholm",
    country: "Sweden",
  },
  {
    code: "GOT",
    name: "Landvetter Airport",
    city: "Göteborg",
    country: "Sweden",
  },
  { code: "MMX", name: "Sturup Airport", city: "Malmö", country: "Sweden" },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { code: "LGW", name: "Gatwick Airport", city: "London", country: "UK" },
  {
    code: "MAN",
    name: "Manchester Airport",
    city: "Manchester",
    country: "UK",
  },
  { code: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "UK" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "ORY", name: "Orly Airport", city: "Paris", country: "France" },
  { code: "NCE", name: "Cote d'Azur Airport", city: "Nice", country: "France" },
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany",
  },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  { code: "BER", name: "Berlin Airport", city: "Berlin", country: "Germany" },
  { code: "HAM", name: "Hamburg Airport", city: "Hamburg", country: "Germany" },
  {
    code: "DUS",
    name: "Düsseldorf Airport",
    city: "Düsseldorf",
    country: "Germany",
  },
  {
    code: "AMS",
    name: "Schiphol Airport",
    city: "Amsterdam",
    country: "Netherlands",
  },
  { code: "FCO", name: "Fiumicino Airport", city: "Rome", country: "Italy" },
  { code: "MXP", name: "Malpensa Airport", city: "Milan", country: "Italy" },
  { code: "VCE", name: "Venice Airport", city: "Venice", country: "Italy" },
  { code: "MAD", name: "Barajas Airport", city: "Madrid", country: "Spain" },
  { code: "BCN", name: "El Prat Airport", city: "Barcelona", country: "Spain" },
  { code: "AGP", name: "Malaga Airport", city: "Malaga", country: "Spain" },
  { code: "PMI", name: "Palma Airport", city: "Palma", country: "Spain" },
  {
    code: "ZRH",
    name: "Zurich Airport",
    city: "Zurich",
    country: "Switzerland",
  },
  {
    code: "GVA",
    name: "Geneva Airport",
    city: "Geneva",
    country: "Switzerland",
  },
  {
    code: "CPH",
    name: "Copenhagen Airport",
    city: "Copenhagen",
    country: "Denmark",
  },
  { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway" },
  { code: "TOS", name: "Tromsø Airport", city: "Tromsø", country: "Norway" },
  {
    code: "SVG",
    name: "Stavanger Airport",
    city: "Stavanger",
    country: "Norway",
  },
  { code: "BGO", name: "Bergen Airport", city: "Bergen", country: "Norway" },
  {
    code: "HEL",
    name: "Helsinki Airport",
    city: "Helsinki",
    country: "Finland",
  },
  { code: "VIE", name: "Vienna Airport", city: "Vienna", country: "Austria" },
  {
    code: "BRU",
    name: "Brussels Airport",
    city: "Brussels",
    country: "Belgium",
  },
  { code: "WAW", name: "Warsaw Airport", city: "Warsaw", country: "Poland" },
  { code: "LIS", name: "Lisbon Airport", city: "Lisbon", country: "Portugal" },
  { code: "ATH", name: "Athens Airport", city: "Athens", country: "Greece" },
  {
    code: "HER",
    name: "Heraklion Airport",
    city: "Heraklion",
    country: "Greece",
  },
  {
    code: "PRG",
    name: "Prague Airport",
    city: "Prague",
    country: "Czech Republic",
  },
  {
    code: "BUD",
    name: "Budapest Airport",
    city: "Budapest",
    country: "Hungary",
  },
  // More Sweden
  { code: "LLA", name: "Luleå Airport", city: "Luleå", country: "Sweden" },
  { code: "VBY", name: "Visby Airport", city: "Visby", country: "Sweden" },
  {
    code: "SDL",
    name: "Sundsvall Airport",
    city: "Sundsvall",
    country: "Sweden",
  },
  { code: "UME", name: "Umeå Airport", city: "Umeå", country: "Sweden" },
  { code: "UME", name: "Umeå Airport", city: "Umeå", country: "Sweden" },
  {
    code: "SFT",
    name: "Skellefteå Airport",
    city: "Skellefteå",
    country: "Sweden",
  },
  {
    code: "OSD",
    name: "Östersund Airport",
    city: "Östersund",
    country: "Sweden",
  },
  { code: "RNB", name: "Ronneby Airport", city: "Ronneby", country: "Sweden" },
  {
    code: "AGH",
    name: "Ängelholm Airport",
    city: "Ängelholm",
    country: "Sweden",
  },
  { code: "KLR", name: "Kalmar Airport", city: "Kalmar", country: "Sweden" },
  { code: "KRN", name: "Kiruna Airport", city: "Kiruna", country: "Sweden" },
  {
    code: "HAD",
    name: "Hagshult Airport",
    city: "Hagshult",
    country: "Sweden",
  },
  { code: "TKU", name: "Turku Airport", city: "Turku", country: "Finland" },
  { code: "VAA", name: "Vaasa Airport", city: "Vaasa", country: "Finland" },
  // Baltic
  { code: "TLL", name: "Tallinn Airport", city: "Tallinn", country: "Estonia" },
  { code: "RIX", name: "Riga Airport", city: "Riga", country: "Latvia" },
  {
    code: "VNO",
    name: "Vilnius Airport",
    city: "Vilnius",
    country: "Lithuania",
  },
  // More Europe
  {
    code: "IST",
    name: "Istanbul Airport",
    city: "Istanbul",
    country: "Turkey",
  },
  {
    code: "SAW",
    name: "Sabiha Gökçen Airport",
    city: "Istanbul",
    country: "Turkey",
  },
  { code: "KRK", name: "Kraków Airport", city: "Kraków", country: "Poland" },
  { code: "GDN", name: "Gdańsk Airport", city: "Gdańsk", country: "Poland" },
  {
    code: "BEG",
    name: "Belgrade Airport",
    city: "Belgrade",
    country: "Serbia",
  },
  { code: "TIA", name: "Tirana Airport", city: "Tirana", country: "Albania" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
  { code: "STN", name: "Stansted Airport", city: "London", country: "UK" },
  {
    code: "BHX",
    name: "Birmingham Airport",
    city: "Birmingham",
    country: "UK",
  },
  {
    code: "LUX",
    name: "Luxembourg Airport",
    city: "Luxembourg",
    country: "Luxembourg",
  },
  {
    code: "STR",
    name: "Stuttgart Airport",
    city: "Stuttgart",
    country: "Germany",
  },
  { code: "VLC", name: "Valencia Airport", city: "Valencia", country: "Spain" },
  { code: "ALC", name: "Alicante Airport", city: "Alicante", country: "Spain" },
  {
    code: "CRL",
    name: "Charleroi Airport",
    city: "Brussels",
    country: "Belgium",
  },
  { code: "BLL", name: "Billund Airport", city: "Billund", country: "Denmark" },
  {
    code: "BKK",
    name: "Suvarnabhumi Airport",
    city: "Bangkok",
    country: "Thailand",
  },
  { code: "PEK", name: "Capital Airport", city: "Beijing", country: "China" },
  { code: "DOH", name: "Hamad Airport", city: "Doha", country: "Qatar" },
  {
    code: "ADD",
    name: "Bole Airport",
    city: "Addis Ababa",
    country: "Ethiopia",
  },
  // More Scandinavia
  {
    code: "TRD",
    name: "Trondheim Airport",
    city: "Trondheim",
    country: "Norway",
  },
  // Mediterranean & Southern Europe
  {
    code: "FNC",
    name: "Madeira Airport",
    city: "Funchal",
    country: "Portugal",
  },
  { code: "FAO", name: "Faro Airport", city: "Faro", country: "Portugal" },
  { code: "OPO", name: "Porto Airport", city: "Porto", country: "Portugal" },
  { code: "RHO", name: "Rhodes Airport", city: "Rhodes", country: "Greece" },
  { code: "CHQ", name: "Chania Airport", city: "Chania", country: "Greece" },
  {
    code: "SKG",
    name: "Thessaloniki Airport",
    city: "Thessaloniki",
    country: "Greece",
  },
  { code: "FLR", name: "Florence Airport", city: "Florence", country: "Italy" },
  { code: "NAP", name: "Naples Airport", city: "Naples", country: "Italy" },
  { code: "PMO", name: "Palermo Airport", city: "Palermo", country: "Italy" },
  { code: "OLB", name: "Olbia Airport", city: "Olbia", country: "Italy" },
  { code: "BLQ", name: "Bologna Airport", city: "Bologna", country: "Italy" },
  {
    code: "MRS",
    name: "Marseille Airport",
    city: "Marseille",
    country: "France",
  },
  // Eastern Europe
  { code: "WRO", name: "Wrocław Airport", city: "Wrocław", country: "Poland" },
  { code: "POZ", name: "Poznań Airport", city: "Poznań", country: "Poland" },
  { code: "KUN", name: "Kaunas Airport", city: "Kaunas", country: "Lithuania" },
  {
    code: "SJJ",
    name: "Sarajevo Airport",
    city: "Sarajevo",
    country: "Bosnia",
  },
  // Turkey
  {
    code: "GZP",
    name: "Gazipaşa Airport",
    city: "Gazipaşa",
    country: "Turkey",
  },
  { code: "AYT", name: "Antalya Airport", city: "Antalya", country: "Turkey" },
  // North Africa
  {
    code: "RAK",
    name: "Marrakech Airport",
    city: "Marrakech",
    country: "Morocco",
  },
  // Cyprus
  { code: "LCA", name: "Larnaca Airport", city: "Larnaca", country: "Cyprus" },
  // Germany
  { code: "FKB", name: "Baden Airport", city: "Karlsruhe", country: "Germany" },
  // Iceland
  {
    code: "KEF",
    name: "Keflavik Airport",
    city: "Reykjavik",
    country: "Iceland",
  },
  // China & Asia
  { code: "PVG", name: "Pudong Airport", city: "Shanghai", country: "China" },
  // More airports
  { code: "MLA", name: "Malta Airport", city: "Malta", country: "Malta" },
  { code: "CAG", name: "Cagliari Airport", city: "Cagliari", country: "Italy" },
  { code: "BSL", name: "Basel Airport", city: "Basel", country: "Switzerland" },
  { code: "VHM", name: "Hemavan Airport", city: "Hemavan", country: "Sweden" },
  { code: "LIN", name: "Linate Airport", city: "Milan", country: "Italy" },
  { code: "EWR", name: "Newark Airport", city: "Newark", country: "USA" },
  { code: "ZAG", name: "Zagreb Airport", city: "Zagreb", country: "Croatia" },
  { code: "BGO", name: "Bergen Airport", city: "Bergen", country: "Norway" },
  {
    code: "LYC",
    name: "Lycksele Airport",
    city: "Lycksele",
    country: "Sweden",
  },
  { code: "HFS", name: "Hagfors Airport", city: "Hagfors", country: "Sweden" },
  {
    code: "KRF",
    name: "Kramfors Airport",
    city: "Kramfors",
    country: "Sweden",
  },
  { code: "MXX", name: "Sveg Airport", city: "Sveg", country: "Sweden" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
];

function getAirportByCode(code: string): Airport {
  return (
    airports.find((a) => a.code === code) || {
      code,
      name: code,
      city: code,
      country: "Unknown",
    }
  );
}

// Fetch API quota info
async function fetchQuota(): Promise<ApiQuota | null> {
  try {
    const response = await fetch("/api/quota");
    const data = await response.json();

    if (data.error) return null;

    // Server returns flat structure: { remaining, limit, resetTime }
    return {
      aeroDataBox: {
        remaining: data.remaining || 0,
        limit: data.limit || 600,
        resetTime: data.resetTime || 0,
      },
    };
  } catch {
    return null;
  }
}

// Search all departures/arrivals from an airport using AeroDataBox
async function searchAeroDataBox(
  airportCode: string,
  date: string,
  direction: "departure" | "arrival",
): Promise<Flight[]> {
  try {
    const allFlights: Flight[] = [];
    const [year, month, day] = date.split("-");

    console.log("Fetching flights for", airportCode, date);

    // Single API call - server handles morning/afternoon split
    const url = `/api/departures?airport=${airportCode}&fromLocal=${encodeURIComponent(`${year}-${month}-${day}T00:00:00`)}&direction=${direction}`;
    const response = await fetch(url);
    const data = await response.json();

    const flightList =
      direction === "departure" ? data.departures || [] : data.arrivals || [];
    console.log("Total flights:", flightList.length);

    for (const f of flightList) {
      const departure = f.departure || f.movement || {};
      const arrival = f.arrival || {};
      const departureTime = departure.scheduledTime?.local || "";
      const arrivalTime = arrival.scheduledTime?.local || "";
      const destAirport = arrival.airport || {};
      const destCode = destAirport.iata || "";

      if (!destCode || f.codeshareStatus === "IsCodeshared") continue;

      allFlights.push({
        id: `aero-${f.number}-${f.departure?.scheduledTime?.utc || departureTime}`,
        airline: f.airline?.name || "Unknown",
        flightNumber: f.number || "",
        origin:
          direction === "departure"
            ? getAirportByCode(airportCode)
            : getAirportByCode(destCode),
        destination:
          direction === "departure"
            ? getAirportByCode(destCode)
            : getAirportByCode(airportCode),
        departureTime: departureTime.slice(11, 16) || "00:00",
        arrivalTime: arrivalTime.slice(11, 16) || "00:00",
        duration: "",
        price: 0,
        stops: 0,
        aircraft: f.aircraft?.model || "",
        status: f.status || "Unknown",
      });
    }

    return allFlights;
  } catch (error) {
    console.error("AeroDataBox error:", error);
    return [];
  }
}

// Fetch prices from Ignav for specific routes
async function fetchPricesFromIgnav(
  origin: string,
  destination: string,
  date: string,
): Promise<Map<string, number>> {
  try {
    const response = await fetch("/api/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, date }),
    });
    const data = await response.json();
    const prices = new Map<string, number>();

    if (data.itineraries && Array.isArray(data.itineraries)) {
      for (const itinerary of data.itineraries) {
        const segments = itinerary.outbound?.segments || [];
        const firstSegment = segments[0] || {};
        const carrier = firstSegment.marketing_carrier_code || "";
        const price = Math.round(itinerary.price?.amount || 0);

        if (carrier && price > 0) {
          // Store lowest price per airline code
          if (!prices.has(carrier) || prices.get(carrier)! > price) {
            prices.set(carrier, price);
          }
        }
      }
    }

    return prices;
  } catch (error) {
    console.error("Ignav price fetch error:", error);
    return new Map();
  }
}

// Mock data generator
function generateMockFlights(
  originCity: string,
  date: string,
  type: "departure" | "arrival",
): Flight[] {
  const swedishAirports = airports.filter(
    (a) =>
      a.country === "Sweden" &&
      a.city.toLowerCase().includes(originCity.toLowerCase()),
  );
  if (swedishAirports.length === 0) return [];

  const originCityAirport = swedishAirports[0]!;
  const destinations = airports.filter((a) => a.country !== "Sweden");
  const flights: Flight[] = [];

  for (let i = 0; i < 40; i++) {
    const destination =
      destinations[Math.floor(Math.random() * destinations.length)]!;
    const baseHour = Math.floor(Math.random() * 14) + 6;
    const baseMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)] ?? 0;
    const departureTime = `${String(baseHour).padStart(2, "0")}:${String(baseMinute).padStart(2, "0")}`;

    const airlinesList = [
      "SAS",
      "Norwegian",
      "KLM",
      "Lufthansa",
      "British Airways",
      "Air France",
    ] as const;
    const airline =
      airlinesList[Math.floor(Math.random() * airlinesList.length)] ?? "SAS";
    const codes = {
      SAS: "SK",
      Norwegian: "DY",
      KLM: "KL",
      Lufthansa: "LH",
      "British Airways": "BA",
      "Air France": "AF",
    } as const;
    const code = codes[airline as keyof typeof codes] ?? "SK";
    const flightNum = `${code}${Math.floor(Math.random() * 900) + 100}`;

    flights.push({
      id: `mock-${date}-${i}`,
      airline,
      flightNumber: flightNum,
      origin: type === "departure" ? originCityAirport : destination,
      destination: type === "departure" ? destination : originCityAirport,
      departureTime,
      arrivalTime: "00:00",
      duration: "",
      price: Math.floor(Math.random() * 2500) + 400,
      stops: 0,
      aircraft: "Boeing 737",
      status: "Scheduled",
    });
  }

  return flights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
}

export function useFlights() {
  const searchCity = ref("");
  const selectedDate = ref("");
  const flightType = ref<"departure" | "arrival">("departure");
  const sortOrder = ref<"time" | "asc" | "desc">("time");
  const stopsFilter = ref<number | null>(null);
  const isLoading = ref(false);
  const isLoadingPrices = ref(false);
  const flights = ref<Flight[]>([]);
  const usingApi = ref(false);
  const apiName = ref<string>("");
  const apiQuota = ref<ApiQuota | null>(null);

  const filteredAirports = computed(() => {
    if (!searchCity.value || searchCity.value.length < 2) return [];
    const query = searchCity.value.toLowerCase();
    return airports
      .filter(
        (a) =>
          a.city.toLowerCase().includes(query) ||
          a.name.toLowerCase().includes(query) ||
          a.code.toLowerCase().includes(query),
      )
      .slice(0, 6);
  });

  const filteredFlights = computed(() => {
    let result = [...flights.value];

    if (stopsFilter.value !== null) {
      result = result.filter((f) => f.stops === stopsFilter.value);
    }

    result.sort((a, b) => {
      if (sortOrder.value === "time") {
        return a.departureTime.localeCompare(b.departureTime);
      }

      // Price sorting: put flights with price=0 at the end
      if (a.price === 0 && b.price === 0) return 0;
      if (a.price === 0) return 1;
      if (b.price === 0) return -1;

      return sortOrder.value === "asc" ? a.price - b.price : b.price - a.price;
    });

    return result;
  });

  // Load quota on mount
  async function loadQuota() {
    apiQuota.value = await fetchQuota();
  }

  async function search() {
    if (!searchCity.value || !selectedDate.value) return;

    isLoading.value = true;
    isLoadingPrices.value = false;
    usingApi.value = false;
    apiName.value = "";

    const cityLower = searchCity.value.toLowerCase();
    let airportCode = airportMapping[cityLower];
    const matchedAirport = airports.find(
      (a) =>
        a.city.toLowerCase() === cityLower ||
        a.name.toLowerCase().includes(cityLower),
    );
    if (matchedAirport && matchedAirport.country === "Sweden") {
      airportCode = matchedAirport.code;
    }

    if (!airportCode) {
      flights.value = generateMockFlights(
        searchCity.value,
        selectedDate.value,
        flightType.value,
      );
      isLoading.value = false;
      return;
    }

    // Step 1: Get all flights from AeroDataBox
    const aeroFlights = await searchAeroDataBox(
      airportCode,
      selectedDate.value,
      flightType.value,
    );

    if (aeroFlights.length > 0) {
      flights.value = aeroFlights;
      usingApi.value = true;
      apiName.value = "AeroDataBox";
      isLoading.value = false;

      // Step 2: Fetch prices from Ignav for unique routes
      await fetchPrices(aeroFlights, selectedDate.value);
      await loadQuota(); // Update quota after search
      return;
    }

    flights.value = generateMockFlights(
      searchCity.value,
      selectedDate.value,
      flightType.value,
    );
    isLoading.value = false;
  }

  async function fetchPrices(aeroFlights: Flight[], date: string) {
    isLoadingPrices.value = true;

    // Get unique destination routes (limit to avoid too many API calls)
    const routes = new Map<string, { origin: string; destination: string }>();
    for (const flight of aeroFlights) {
      const key = `${flight.origin.code}-${flight.destination.code}`;
      if (!routes.has(key)) {
        routes.set(key, {
          origin: flight.origin.code,
          destination: flight.destination.code,
        });
      }
    }

    // Fetch prices for up to 20 routes
    const routeArray = Array.from(routes.values()).slice(0, 20);
    console.log(`Fetching prices for ${routeArray.length} routes...`);

    // Fetch prices sequentially to avoid rate limits
    const priceMap = new Map<string, Map<string, number>>();
    for (const route of routeArray) {
      const routeKey = `${route.origin}-${route.destination}`;
      const prices = await fetchPricesFromIgnav(
        route.origin,
        route.destination,
        date,
      );
      if (prices.size > 0) {
        priceMap.set(routeKey, prices);
      }
      // Small delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    // Apply prices to flights
    let pricesApplied = 0;
    for (const flight of flights.value) {
      const routeKey = `${flight.origin.code}-${flight.destination.code}`;
      const routePrices = priceMap.get(routeKey);

      if (routePrices && routePrices.size > 0) {
        // Get flight number prefix (e.g., "SK" from "SK 1234")
        const flightPrefix =
          flight.flightNumber.split(/\s/)[0]?.toUpperCase() || "";

        // Find best matching price for this airline
        let bestPrice = 0;

        for (const [carrier, price] of routePrices) {
          // Match by airline code prefix
          if (
            flightPrefix.startsWith(carrier) ||
            carrier.startsWith(flightPrefix.slice(0, 2))
          ) {
            if (bestPrice === 0 || price < bestPrice) {
              bestPrice = price;
            }
          }
        }

        // If no specific match, use lowest available price for this route
        if (bestPrice === 0) {
          bestPrice = Math.min(...Array.from(routePrices.values()));
        }

        if (bestPrice > 0) {
          flight.price = bestPrice;
          pricesApplied++;
        }
      }
    }

    console.log(`Applied prices to ${pricesApplied} flights`);
    isLoadingPrices.value = false;
    apiName.value = "AeroDataBox + Ignav";
  }

  function toggleSort() {
    const options: Array<"time" | "asc" | "desc"> = ["time", "asc", "desc"];
    const currentIndex = options.indexOf(sortOrder.value);
    sortOrder.value = options[(currentIndex + 1) % options.length] ?? "time";
  }

  function selectCity(city: string) {
    searchCity.value = city;
  }

  function setStopsFilter(stops: number | null) {
    stopsFilter.value = stops;
  }

  // Load quota on composable creation
  loadQuota();

  return {
    searchCity,
    selectedDate,
    flightType,
    sortOrder,
    stopsFilter,
    isLoading,
    isLoadingPrices,
    flights,
    filteredAirports,
    filteredFlights,
    usingApi,
    apiName,
    apiQuota,
    search,
    toggleSort,
    selectCity,
    setStopsFilter,
  };
}
