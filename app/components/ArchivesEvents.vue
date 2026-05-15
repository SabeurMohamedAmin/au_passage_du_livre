<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useEventsStore, type EventWithRelations } from '~/stores/events'

/* =========================================================
   STORE
========================================================= */
const eventsStore = useEventsStore()
const { locale } = useI18n()

// SSR-safe data fetching — reuse already-fetched data if available
if (!eventsStore.items.length) {
  await eventsStore.fetchPublic()
}

/* =========================================================
   HELPERS
========================================================= */
/** Extract a year from an ISO date string "YYYY-MM-DD" */
function yearOf(dateStr: string): number {
  return dateStr ? new Date(dateStr).getFullYear() : 0
}

/** Resolved i18n title for an event */
function getTitle(ev: EventWithRelations): string {
  return (
    ev.translations.find(t => t.locale === locale.value)?.title ??
    ev.translations.find(t => t.locale === 'fr')?.title ??
    ev.translations[0]?.title ??
    '—'
  )
}

/** Resolved slug for an event (used in router link) */
function getSlug(ev: EventWithRelations): string {
  return (
    ev.translations.find(t => t.locale === locale.value)?.slug ??
    ev.translations.find(t => t.locale === 'fr')?.slug ??
    ev.translations[0]?.slug ??
    ''
  )
}

/**
 * Format "SEPTEMBRE 2026" from an ISO date.
 * Events that span multiple months show the start month.
 */
function formatMonth(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr)
    .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    .toUpperCase()
}

/* =========================================================
   YEAR TIMELINE — built from real DB data
========================================================= */
/** All years that appear in at least one event, descending */
const availableYears = computed<number[]>(() => {
  const set = new Set<number>()
  for (const ev of eventsStore.items) {
    const y = yearOf(ev.startDate)
    if (y > 0) set.add(y)
  }
  return [...set].sort((a, b) => b - a)
})

// Generate the static 15-year sliding window (2026 → 2012) as before,
// but only show years that actually have data — rest are still navigable
const ALL_YEARS = Array.from({ length: 15 }, (_, i) => 2026 - i)

const windowSize   = ref(5)
const startIndex   = ref(0)
const selectedYear = ref<number>(new Date().getFullYear())

const visibleYears = computed(() =>
  ALL_YEARS.slice(startIndex.value, startIndex.value + windowSize.value)
)

const dropdownYears = computed(() =>
  ALL_YEARS.filter(y => !visibleYears.value.includes(y))
)

/** Events for the selected year, sorted by startDate asc */
const filteredEvents = computed<EventWithRelations[]>(() =>
  eventsStore.items
    .filter(ev => yearOf(ev.startDate) === selectedYear.value)
    .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
)

/* =========================================================
   WINDOW SIZING (ResizeObserver)
========================================================= */
const selectorContainerRef = ref<HTMLElement | null>(null)

function calculateWindowSize(width: number): number {
  if (width < 400)  return 3
  if (width < 600)  return 5
  if (width < 800)  return 7
  if (width < 1024) return 9
  return 11
}

function updateWindowVisibility() {
  if (!selectorContainerRef.value) return
  const calculated = calculateWindowSize(selectorContainerRef.value.offsetWidth)
  if (calculated === windowSize.value) return

  windowSize.value = calculated
  const idx = ALL_YEARS.indexOf(selectedYear.value)
  if (idx !== -1) {
    const half = Math.floor(calculated / 2)
    startIndex.value = Math.max(
      0,
      Math.min(idx - half, ALL_YEARS.length - calculated)
    )
  }
}

function centerOnYear(year: number) {
  const idx = ALL_YEARS.indexOf(year)
  if (idx === -1) return
  const half = Math.floor(windowSize.value / 2)
  startIndex.value = Math.max(
    0,
    Math.min(idx - half, ALL_YEARS.length - windowSize.value)
  )
  selectedYear.value = year
}

// Keep selected year centered in the window when it changes
watch(
  () => selectedYear.value,
  year => nextTick(() => centerOnYear(year)),
  { immediate: true }
)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!selectorContainerRef.value) return
  resizeObserver = new ResizeObserver(() => updateWindowVisibility())
  resizeObserver.observe(selectorContainerRef.value)
  updateWindowVisibility()
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <section class="archives-section mb-16 min-w-340">

    <!-- ================= YEAR SELECTOR ================= -->
    <div class="d-flex mb-10">
      <div
        ref="selectorContainerRef"
        class="year-selector-wrapper d-flex align-center justify-space-between rounded-lg px-2 py-2 bg-surface border w-100"
      >
        <div class="flex-grow-1 d-flex align-center gap-1 flex-wrap">
          <v-btn
            v-for="year in visibleYears"
            :key="year"
            rounded="lg"
            density="comfortable"
            class="pa-2 mx-1 year-btn flex-shrink-0 flex-grow-1"
            :variant="year === selectedYear ? 'tonal' : 'text'"
            :color="year === selectedYear ? 'primary' : undefined"
            @click="selectedYear = year"
          >
            {{ year }}
            <!-- Dot indicator when this year has events -->
            <span
              v-if="availableYears.includes(year)"
              class="year-dot"
              :class="{ active: year === selectedYear }"
            />
          </v-btn>
        </div>

        <v-divider vertical class="mx-2 my-1 opacity-30" />

        <v-menu location="bottom end" max-height="280">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-calendar-search"
              variant="text"
              size="small"
              rounded="lg"
              v-bind="props"
              aria-label="Sélectionner une année"
            />
          </template>

          <v-list density="compact" class="year-dropdown">
            <v-list-subheader class="dropdown-header text-caption font-weight-bold">
              Toutes les années
            </v-list-subheader>
            <v-list-item
              v-for="year in dropdownYears"
              :key="year"
              @click="centerOnYear(year)"
            >
              <v-list-item-title class="d-flex align-center justify-space-between">
                {{ year }}
                <v-icon
                  v-if="availableYears.includes(year)"
                  icon="mdi-circle"
                  size="8"
                  color="primary"
                  class="ml-2"
                />
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <!-- ================= EVENTS HEADER ================= -->
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-4">
      <div class="d-flex align-center gap-3">
        <span class="text-h5 font-weight-black me-2">{{ selectedYear }}</span>
        <v-chip size="small" variant="outlined" color="primary">
          {{ filteredEvents.length }}
          {{ $t('event', filteredEvents.length) }}
        </v-chip>
      </div>

      <v-btn
        size="small"
        color="secondary"
        variant="tonal"
        prepend-icon="mdi-file-pdf-box"
        rounded="lg"
      >
        {{ $t('download_pdf') }}
      </v-btn>
    </div>

    <!-- ================= EVENTS GRID ================= -->
    <transition name="fade" mode="out-in">
      <v-row :key="selectedYear">

        <!-- EVENT CARDS -->
        <v-col
          v-for="event in filteredEvents"
          :key="event.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            :to="`/evenements/${getSlug(event)}`"
            class="rounded-xl overflow-hidden h-100 archive-card"
            border
          >
            <!-- Cover image -->
            <v-img
              :src="event.coverImage || '/img/home/diffrents-directions.png'"
              height="220"
              cover
              gradient="to top, rgba(0,0,0,0.72), transparent"
            >
              <div class="pa-4 text-white card-content">
                <div class="text-overline font-weight-bold mb-1">
                  {{ formatMonth(event.startDate) }}
                  <template v-if="event.endDate && yearOf(event.endDate) !== yearOf(event.startDate)">
                    – {{ formatMonth(event.endDate) }}
                  </template>
                </div>

                <h3 class="text-h6 font-weight-bold leading-tight mb-1">
                  {{ getTitle(event) }}
                </h3>

                <div class="d-flex align-center gap-2 flex-wrap mt-1">
                  <span v-if="event.locationName" class="text-caption opacity-90 d-flex align-center">
                    <v-icon size="small" start>mdi-map-marker</v-icon>
                    {{ event.locationName }}
                  </span>
                  <v-chip
                    v-if="event.entranceType"
                    size="x-small"
                    variant="tonal"
                    class="chip-on-image"
                  >
                    {{ $t(event.entranceType) }}
                  </v-chip>
                </div>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <!-- EMPTY STATE -->
        <v-col v-if="filteredEvents.length === 0" cols="12">
          <v-sheet class="py-16 rounded-xl text-center border border-dashed">
            <v-icon size="40" class="mb-3" color="medium-emphasis">
              mdi-archive-off-outline
            </v-icon>
            <div class="text-h6 mb-1">{{ $t('no_event') }}</div>
            <div class="text-body-2 text-medium-emphasis">
              {{ $t('no_archive_available') }} {{ selectedYear }}.
            </div>
          </v-sheet>
        </v-col>

      </v-row>
    </transition>
  </section>
</template>

<style scoped>
.min-w-340 { min-width: 340px; }

.year-selector-wrapper { display: flex; align-items: center; }

.year-btn {
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease,
    opacity 0.15s ease;
  flex-shrink: 0;
  position: relative;
}
.year-btn:not(.v-btn--active) { opacity: 0.65; }
.year-btn.v-btn--active { transform: scale(1.05); opacity: 1; }

/* Small dot under years that have events */
.year-dot {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.4;
}
.year-dot.active { opacity: 1; }

.year-dropdown { max-height: 280px; overflow-y: auto; }

.dropdown-header {
  top: -10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: sticky;
  z-index: 20;
  background-color: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-border-color), 0.2);
}

/* Card */
.archive-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.archive-card:hover { transform: translateY(-3px); }

.card-content { position: absolute; bottom: 0; left: 0; right: 0; }

.chip-on-image {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  backdrop-filter: blur(4px);
}

.leading-tight { line-height: 1.25; }

/* Transition */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>