<script setup lang="ts">
import { 
  Plane, 
  Calendar, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  MapPin,
  Search,
  X,
  Clock,
  Filter,
  PlaneTakeoff,
  PlaneLanding
} from '@lucide/vue'

const {
  searchCity,
  selectedDate,
  flightType,
  sortOrder,
  stopsFilter,
  isLoading,
  isLoadingPrices,
  filteredAirports,
  filteredFlights,
  usingApi,
  apiName,
  apiQuota,
  search,
  toggleSort,
  selectCity,
  setStopsFilter,
} = useFlights()

const showDropdown = ref(false)
const inputRef = ref<HTMLInputElement>()

// Set default date to tomorrow
onMounted(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  selectedDate.value = tomorrow.toISOString().split('T')[0]
})

function handleInput() {
  showDropdown.value = true
}

function handleSelect(city: string) {
  selectCity(city)
  showDropdown.value = false
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.search-container')) {
    showDropdown.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && searchCity.value) {
    search()
    showDropdown.value = false
  }
  if (e.key === 'Escape') {
    showDropdown.value = false
  }
}

const today = computed(() => new Date().toISOString().split('T')[0])

const hasSearched = computed(() => filteredFlights.value.length > 0 || isLoading.value)
</script>

<template>
  <div class="app" @click="handleClickOutside">
    <div class="background-pattern"></div>
    
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content">
        <div class="logo">
          <Plane class="logo-icon" :size="40" />
          <h1>SkyPulse</h1>
        </div>
        <p class="tagline">Find your next flight</p>
        
        <!-- Search Section -->
        <div class="search-section">
          <div class="search-row">
            <!-- City Search -->
            <div class="search-container">
              <div class="input-wrapper" :class="{ focused: searchCity }">
                <MapPin class="input-icon" :size="20" />
                <input
                  ref="inputRef"
                  v-model="searchCity"
                  type="text"
                  placeholder="Search city..."
                  class="search-input"
                  @input="handleInput"
                  @keydown="handleKeydown"
                />
                <button 
                  v-if="searchCity" 
                  class="clear-btn"
                  @click="searchCity = ''"
                >
                  <X :size="16" />
                </button>
              </div>
              
              <!-- Autocomplete Dropdown -->
              <div v-if="showDropdown && filteredAirports.length > 0" class="dropdown">
                <button
                  v-for="airport in filteredAirports"
                  :key="airport.code"
                  class="dropdown-item"
                  @click="handleSelect(airport.city)"
                >
                  <MapPin :size="16" />
                  <span class="airport-city">{{ airport.city }}</span>
                  <span class="airport-name">{{ airport.name }}</span>
                </button>
              </div>
            </div>

            <!-- Date Picker -->
            <div class="input-wrapper">
              <Calendar class="input-icon" :size="20" />
              <input
                v-model="selectedDate"
                type="date"
                class="date-input"
                :min="today"
              />
            </div>

            <!-- Search Button -->
            <button 
              class="search-btn"
              :disabled="!searchCity || !selectedDate"
              @click="search"
            >
              <Search :size="20" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Results Section -->
    <main v-if="hasSearched" class="results-section">
      <div class="results-container">
        <!-- Filters Bar -->
        <div class="filters-bar">
          <div class="flight-type-toggle">
            <button 
              class="type-btn"
              :class="{ active: flightType === 'departure' }"
              @click="flightType = 'departure'"
            >
              <PlaneTakeoff :size="16" />
              Departures
            </button>
            <button 
              class="type-btn"
              :class="{ active: flightType === 'arrival' }"
              @click="flightType = 'arrival'"
            >
              <PlaneLanding :size="16" />
              Arrivals
            </button>
          </div>

          <div class="filters-right">
            <!-- Stops Filter -->
            <div class="stops-filter">
              <Filter :size="16" />
              <button 
                class="filter-btn"
                :class="{ active: stopsFilter === null }"
                @click="setStopsFilter(null)"
              >All</button>
              <button 
                class="filter-btn"
                :class="{ active: stopsFilter === 0 }"
                @click="setStopsFilter(0)"
              >Direct</button>
              <button 
                class="filter-btn"
                :class="{ active: stopsFilter === 1 }"
                @click="setStopsFilter(1)"
              >1 Stop</button>
            </div>

            <!-- Sort -->
            <button class="sort-btn" @click="toggleSort">
              <ArrowUpDown :size="16" />
              <span>{{ sortOrder === 'time' ? 'Time' : 'Price' }}</span>
              <ArrowUp v-if="sortOrder === 'asc'" :size="14" />
              <ArrowDown v-else-if="sortOrder === 'desc'" :size="14" />
              <Clock v-else :size="14" />
            </button>
          </div>
        </div>

        <!-- Results Count & Quota -->
        <div class="results-meta">
          <div class="meta-left">
            <span class="results-count">
              {{ filteredFlights.length }} flights found
              <span v-if="usingApi && apiName" class="api-badge">{{ apiName }}</span>
              <span v-else class="mock-badge">Demo data</span>
            </span>
            <span v-if="usingApi && apiName === 'AeroDataBox' && !isLoadingPrices && filteredFlights.some(f => f.price > 0)" class="data-info">
              • Priser laddade
            </span>
            <span v-else-if="usingApi && apiName === 'AeroDataBox'" class="data-info loading">
              • {{ isLoadingPrices ? 'Hämtar priser...' : 'Hämtar priser...' }}
            </span>
          </div>
          
          <!-- API Quota Meter -->
          <div v-if="apiQuota" class="quota-meter">
            <span class="quota-label">API-kvot:</span>
            <div class="quota-bar">
              <div 
                class="quota-fill" 
                :style="{ width: `${(apiQuota.aeroDataBox.remaining / apiQuota.aeroDataBox.limit) * 100}%` }"
                :class="{ low: apiQuota.aeroDataBox.remaining < 100 }"
              ></div>
            </div>
            <span class="quota-text">
              {{ apiQuota.aeroDataBox.remaining }} / {{ apiQuota.aeroDataBox.limit }}
            </span>
          </div>
        </div>

        <!-- Loading Skeletons -->
        <div v-if="isLoading" class="flights-grid">
          <div v-for="i in 6" :key="i" class="skeleton-card">
            <div class="skeleton-header">
              <div class="skeleton skeleton-small"></div>
              <div class="skeleton skeleton-badge"></div>
            </div>
            <div class="skeleton-route">
              <div class="skeleton skeleton-time"></div>
              <div class="skeleton skeleton-line"></div>
              <div class="skeleton skeleton-time"></div>
            </div>
            <div class="skeleton-footer">
              <div class="skeleton skeleton-duration"></div>
              <div class="skeleton skeleton-price"></div>
            </div>
          </div>
        </div>

        <!-- Flight Cards -->
        <div v-else-if="filteredFlights.length > 0" class="flights-grid">
          <FlightCard
            v-for="(flight, index) in filteredFlights"
            :key="flight.id"
            :flight="flight"
            :index="index"
          />
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <div class="no-results-icon">
            <Plane :size="64" />
          </div>
          <h3>No flights found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    </main>

    <!-- Initial State -->
    <main v-else class="initial-state">
      <div class="empty-state">
        <div class="empty-illustration">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="var(--border-subtle)" stroke-width="2" stroke-dasharray="8 8"/>
            <path d="M140 100L155 85M140 100L155 115M140 100H100" stroke="var(--accent-cool)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="100" cy="100" r="8" fill="var(--accent-warm)"/>
          </svg>
        </div>
        <h2>Search for flights</h2>
        <p>Enter a Swedish city and date to find available flights</p>
      </div>
    </main>

    <footer class="footer">
      <p>SkyPulse Flight Search</p>
    </footer>
  </div>
</template>

<style>
@import '~/assets/css/main.css';
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(77, 166, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 107, 74, 0.05) 0%, transparent 50%),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 50px 50px, 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.hero {
  position: relative;
  z-index: 1;
  padding: 60px 24px 80px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  color: var(--accent-cool);
}

.logo h1 {
  font-size: 48px;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-cool));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  color: var(--text-secondary);
  font-size: 18px;
  margin-bottom: 48px;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 280px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.2s ease;
}

.input-wrapper.focused {
  border-color: var(--accent-cool);
  box-shadow: 0 0 0 3px rgba(77, 166, 255, 0.1);
}

.input-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  color: var(--text-primary);
  font-size: 16px;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.clear-btn {
  color: var(--text-secondary);
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  color: var(--text-primary);
  background: var(--border-subtle);
}

.date-input {
  color: var(--text-primary);
  font-size: 16px;
  background: transparent;
  cursor: pointer;
  min-width: 150px;
}

.date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.6;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  color: var(--text-primary);
  text-align: left;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
}

.airport-city {
  font-weight: 600;
}

.airport-name {
  color: var(--text-secondary);
  font-size: 14px;
  margin-left: auto;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-warm), #ff8a6b);
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 107, 74, 0.3);
}

.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Results Section */
.results-section {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 0 24px 60px;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
}

.flight-type-toggle {
  display: flex;
  gap: 8px;
}

.type-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.type-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.type-btn.active {
  color: var(--text-primary);
  background: var(--accent-cool);
  background: linear-gradient(135deg, var(--accent-cool), #6bb8ff);
}

.filters-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stops-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.filter-btn {
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.filter-btn.active {
  color: var(--accent-cool);
  background: rgba(77, 166, 255, 0.1);
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.sort-btn:hover {
  background: var(--border-subtle);
}

.results-meta {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* API Quota Meter */
.quota-meter {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
}

.quota-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.quota-bar {
  width: 80px;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.quota-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-cool), var(--success));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.quota-fill.low {
  background: linear-gradient(90deg, var(--accent-warm), var(--error));
}

.quota-text {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--text-secondary);
  min-width: 70px;
}

.results-count {
  color: var(--text-secondary);
  font-size: 14px;
}

.api-badge {
  background: rgba(77, 166, 255, 0.15);
  color: var(--accent-cool);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}

.mock-badge {
  background: rgba(255, 107, 74, 0.15);
  color: var(--accent-warm);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}

.data-info {
  color: var(--text-secondary);
  font-size: 13px;
  margin-left: 16px;
}

.data-info.loading {
  color: var(--accent-warm);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.flights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

/* Skeleton Loading */
.skeleton-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 20px;
}

.skeleton {
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-subtle) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.skeleton-small { width: 80px; height: 20px; }
.skeleton-badge { width: 60px; height: 24px; border-radius: 12px; }

.skeleton-route {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.skeleton-time { width: 60px; height: 28px; }
.skeleton-line { flex: 1; height: 2px; margin: 0 16px; }

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.skeleton-duration { width: 80px; height: 20px; }
.skeleton-price { width: 100px; height: 32px; }

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results-icon {
  color: var(--text-secondary);
  margin-bottom: 24px;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.no-results p {
  color: var(--text-secondary);
}

/* Initial State */
.initial-state {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
}

.empty-state {
  text-align: center;
}

.empty-illustration {
  width: 200px;
  height: 200px;
  margin: 0 auto 32px;
  opacity: 0.8;
}

.empty-state h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 16px;
}

/* Footer */
.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 24px;
  color: var(--text-secondary);
  font-size: 14px;
  border-top: 1px solid var(--border-subtle);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 40px 16px 60px;
  }
  
  .logo h1 {
    font-size: 36px;
  }
  
  .search-row {
    flex-direction: column;
  }
  
  .search-container,
  .input-wrapper {
    width: 100%;
    max-width: none;
  }
  
  .search-btn {
    width: 100%;
    justify-content: center;
  }
  
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flight-type-toggle {
    justify-content: center;
  }
  
  .filters-right {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .flights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
