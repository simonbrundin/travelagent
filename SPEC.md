# SkyPulse - Flight Search App

## Concept & Vision

SkyPulse är en elegant flygsöksapp med en mörk, luftig estetik som påminner om att titta ut genom ett flygplans fönster på natten. Appen känns premium och sofistikerad, med subtila animationer som ger liv åt data utan att störa. Fokus ligger på att snabbt hitta rätt flygning och se priset tydligt.

## Design Language

### Aesthetic Direction

**"Midnight Terminal"** — Mörk bakgrund med varma accentfärger som påminner om neonskyltar på en flygplats. Clean och funktionell men med karaktär.

### Color Palette

```css
--bg-primary: #0c0e14;
--bg-secondary: #141820;
--bg-card: #1a1f2a;
--text-primary: #f0f2f5;
--text-secondary: #8b95a5;
--accent-warm: #ff6b4a;      /* Departure - varm orange */
--accent-cool: #4da6ff;       /* Arrival - klarblå */
--accent-gold: #ffd700;      /* Price highlight */
--border-subtle: #2a3142;
--success: #22c55e;
```

### Typography

- **Headings**: `Space Grotesk` (bold, geometric)
- **Body**: `DM Sans` (clean, readable)
- **Monospace** (prices, times): `JetBrains Mono`

### Motion Philosophy

- Staggered fade-in för flight cards (100ms delay mellan kort)
- Subtle hover lift på kort (translateY -4px, shadow expansion)
- Smooth filter transitions (height + opacity)
- Price counter animation vid hover

### Visual Assets

- **Icons**: Lucide icons (plane, clock, calendar, map-pin, arrow-up, arrow-down)
- **Decorative**: Subtle grid pattern i bakgrunden, gradient glows bakom headings
- **Empty state**: Custom illustration av ett tomt boarding gate

## Layout & Structure

### Page Structure

1. **Hero Section** — Sökfältet är centralt med stor rubrik "Where to?"
2. **Filters Bar** — Datum-picker och toggle för departure/arrival
3. **Results Grid** — Kort i en responsive grid (1-3 kolumner)
4. **Footer** — Minimal med copyright

### Responsive Strategy

- Mobile: Single column, compact cards
- Tablet: 2 columns
- Desktop: 3 columns med sidebar för filters

## Features & Interactions

### Core Features

1. **City Search** — Text input med autocomplete för städer (mock data)
2. **Date Picker** — Kalender för att välja resedatum
3. **Flight Toggle** — Växla mellan avgående/ankommande
4. **Results Display** — Flight cards med:
   - Flygbolag + flight number
   - Origin → Destination (eller omvänt)
   - Departure/Arrival times
   - Duration
   - Price (prominent)
   - Stops (direct / 1 stop / 2 stops)
5. **Sort by Price** — Klicka på pris-header för att sortera asc/desc
6. **Filter by Stops** — Visa bara direct flights, etc.

### Interaction Details

- **Search submit**: Enter eller klick på sök-knapp
- **Card hover**: Lift + shadow + subtle glow
- **Price sort**: Toggle arrow indicator
- **Empty search**: Friendly illustration + "No flights found"
- **Loading**: Skeleton cards med pulse animation

### Edge Cases

- Inga sökresultat: Vänlig meddelande
- Ogiltigt datum (i fortiden): Disable + tooltip
- Tom sökning: Focus på input med glow

## Component Inventory

### SearchInput

- **Default**: Dark input med placeholder "Search city..."
- **Focus**: Border glow i accent-färg
- **Filled**: Vit text med clear button

### FlightCard

- **Default**: Card med subtle border, departure/arrival färgkodade
- **Hover**: Lift + expanded shadow + border glow
- **Direct flight badge**: Green
- **Stop-over badge**: Orange med stop count

### PriceBadge

- **Default**: Large, gold color, monospace font
- **Hover**: Subtle scale + glow

### SortToggle

- **Default**: Pill buttons för ASC/DESC
- **Active**: Filled background

### DatePicker

- **Default**: Input med kalender-ikon
- **Open**: Dropdown kalender
- **Selected**: Accent border + filled date

### LoadingSkeleton

- Animated pulse i card-form

## Technical Approach

### Stack

- **Framework**: Nuxt 3
- **Styling**: Vanilla CSS med CSS variables
- **State**: Vue reactivity (ref, computed)
- **Icons**: Lucide Vue

### Data Strategy

Mock data med 20+ realistiska flygningar per stad/datum-kombination:

- Swedish airports: ARN, MMA, BMA, GOT, MMX
- European destinations: LHR, CDG, FRA, AMS, FCO, MAD
- Realistic airlines: SAS, Norwegian, KLM, Lufthansa, BA, Air France

### Mock API Structure

```typescript
interface Flight {
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
}

interface Airport {
  code: string;
  name: string;
  city: string;
}
```

### Search Flow

1. User enters city → filter airports by city name
2. Select date → generate mock flights for that date
3. Toggle departure/arrival → filter flights
4. Sort by price → computed sorted array
5. Display results with staggered animation
