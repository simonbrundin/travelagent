# SkyPulse - Flight Search App

En elegant flygsöksapp byggd med Nuxt 4.

## Funktioner

- **Stadsökning** - Sök på svenska städer med autocomplete
- **Datumväljare** - Välj resedatum
- **Avgående/ankommande** - Växla mellan utgående och inkommande flyg
- **Prissortering** - Sortera stigande eller fallande
- **Stopp-filter** - Visa alla, direktflyg eller flyg med mellanlandning
- **Realistisk mock-data** - 15-25 flygningar per sökning

## Svenska städer som stöds

- Stockholm (ARN, BMA)
- Göteborg (GOT)
- Malmö (MMX)

## Starta appen

```bash
cd src/nuxt
npm install
npm run dev
```

Öppna <http://localhost:3000>

## Tech Stack

- Nuxt 4
- Vue 3 Composition API
- @lucide/vue (ikoner)
- Vanilla CSS med CSS Variables
