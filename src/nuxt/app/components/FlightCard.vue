<script setup lang="ts">
import type { Flight } from '~/composables/useFlights'

defineProps<{
  flight: Flight
  index: number
}>()

function getStatusClass(status: string): string {
  const s = status.toLowerCase()
  if (s.includes('expected') || s.includes('scheduled')) return 'status-ok'
  if (s.includes('delayed') || s.includes('late')) return 'status-delay'
  if (s.includes('cancelled') || s.includes('canceled')) return 'status-cancel'
  return ''
}
</script>

<template>
  <article 
    class="flight-card"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <div class="card-header">
      <div class="airline-info">
        <span class="flight-number">{{ flight.flightNumber }}</span>
        <span class="airline-name">{{ flight.airline }}</span>
      </div>
      <span 
        class="stops-badge"
        :class="{ 
          'direct': flight.stops === 0,
          'one-stop': flight.stops === 1,
          'multi-stop': flight.stops >= 2 
        }"
      >
        {{ flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}` }}
      </span>
    </div>

    <div class="route-info">
      <div class="route-point origin">
        <span class="time">{{ flight.departureTime }}</span>
        <span class="code">{{ flight.origin.code }}</span>
        <span class="city">{{ flight.origin.city }}</span>
      </div>
      
      <div class="route-line">
        <div class="line"></div>
        <svg class="plane-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
      
      <div class="route-point destination">
        <span class="time">{{ flight.arrivalTime }}</span>
        <span class="code">{{ flight.destination.code }}</span>
        <span class="city">{{ flight.destination.city }}</span>
      </div>
    </div>

    <div class="card-footer">
      <div class="flight-meta">
        <span v-if="flight.aircraft" class="meta-item">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          {{ flight.aircraft }}
        </span>
        <span v-if="flight.status" class="meta-item status" :class="getStatusClass(flight.status)">
          {{ flight.status }}
        </span>
      </div>
      <div v-if="flight.price > 0" class="price">
        <span class="currency">SEK</span>
        <span class="amount">{{ flight.price.toLocaleString('sv-SE') }}</span>
      </div>
      <div v-else class="price no-price">
        <span class="no-price-text">Pris saknas</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.flight-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeSlideUp 0.5s ease-out both;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flight-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-cool);
  box-shadow: 
    0 12px 40px rgba(77, 166, 255, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.airline-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.flight-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.airline-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.stops-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stops-badge.direct {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
}

.stops-badge.one-stop {
  background: rgba(255, 107, 74, 0.15);
  color: var(--accent-warm);
}

.stops-badge.multi-stop {
  background: rgba(139, 149, 165, 0.15);
  color: var(--text-secondary);
}

.route-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.route-point {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-point.origin {
  text-align: left;
}

.route-point.destination {
  text-align: right;
}

.time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.city {
  font-size: 13px;
  color: var(--text-secondary);
}

.route-line {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
}

.line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-warm), var(--accent-cool));
  border-radius: 1px;
}

.plane-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-cool);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.flight-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 13px;
}

.meta-item .icon {
  width: 14px;
  height: 14px;
}

.meta-item.status {
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
}

.status-ok {
  background: rgba(34, 197, 94, 0.15);
  color: var(--success);
}

.status-delay {
  background: rgba(234, 179, 8, 0.15);
  color: #eab308;
}

.status-cancel {
  background: rgba(239, 68, 68, 0.15);
  color: var(--error);
}

.price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.currency {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.amount {
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-gold);
  transition: transform 0.2s ease;
}

.flight-card:hover .amount {
  transform: scale(1.05);
}

.price.no-price {
  background: rgba(139, 149, 165, 0.1);
  padding: 4px 12px;
  border-radius: 6px;
}

.no-price-text {
  font-size: 12px;
  color: var(--text-secondary);
  font-style: italic;
}

@media (max-width: 640px) {
  .flight-card {
    padding: 16px;
  }
  
  .time {
    font-size: 20px;
  }
  
  .amount {
    font-size: 24px;
  }
  
  .route-line {
    padding: 0 8px;
  }
}
</style>
