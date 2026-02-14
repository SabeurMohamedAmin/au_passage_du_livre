<script setup lang="ts">
/* =========================================================
   TYPES
========================================================= */
type ArchiveEvent = {
  id: number
  title: string
  date: string
  location: string
  image: string
  year: number
}

/* =========================================================
   CONFIG & STATE
========================================================= */
// Replace fixed WINDOW_SIZE with a reactive value
const windowSize = ref(5) // Default starting size
const selectorContainerRef = ref<HTMLElement | null>(null)

const allYears = Array.from({ length: 15 }, (_, index) => {
  return 2026 - index
})

const events: ArchiveEvent[] = [
  {
    id: 1,
    title: 'Foire Européenne',
    date: 'Septembre 2026',
    location: 'Strasbourg',
    image: 'https://images.unsplash.com/photo-1529156069898-a1c2e315a42f',
    year: 2026
  },
  {
    id: 2,
    title: 'Rencontre Littéraire',
    date: 'Novembre 2025',
    location: 'Au Passage du Livre',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    year: 2025
  },
  {
    id: 3,
    title: 'Atelier Bande Dessinée',
    date: 'Mars 2024',
    location: 'Strasbourg',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    year: 2024
  },
  {
    id: 4,
    title: 'Salon du Livre Jeunesse',
    date: 'Avril 2023',
    location: 'Colmar',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    year: 2023
  },
  {
    id: 5,
    title: 'Conférence Histoire',
    date: 'Juin 2022',
    location: 'Mulhouse',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744',
    year: 2022
  }
]

const selectedYear = ref(2026)
const startIndex = ref(0)

/* =========================================================
   COMPUTED
========================================================= */
const visibleYears = computed(() =>
  allYears.slice(startIndex.value, startIndex.value + windowSize.value)
)

const dropdownYears = computed(() =>
  allYears.filter(y => !visibleYears.value.includes(y))
)

const filteredEvents = computed(() =>
  events.filter(e => e.year === selectedYear.value)
)

/* =========================================================
   LOGIC
========================================================= */

// Calculate the number of visible years based on container width
function calculateWindowSize(width: number): number {
  if (width < 400) return 3;
  if (width < 600) return 5;
  if (width < 800) return 7;
  if (width < 1024) return 9; 
  return 11; // For xl screens or very wide containers
}

// Function to re-calculate and update the window size
function updateWindowVisibility() {
  if (!selectorContainerRef.value) return;

  const containerWidth = selectorContainerRef.value.offsetWidth;
  const calculatedSize = calculateWindowSize(containerWidth);

  // Only update if the size has actually changed
  if (calculatedSize !== windowSize.value) {
    windowSize.value = calculatedSize;

    // Adjust startIndex to keep the selected year centered or visible if possible
    const indexOfSelected = allYears.indexOf(selectedYear.value);
    if (indexOfSelected !== -1) {
      let newStartIndex = startIndex.value;

      // If the selected year is now outside the new visible range, adjust
      if (indexOfSelected < newStartIndex || indexOfSelected >= newStartIndex + calculatedSize) {
        const half = Math.floor(calculatedSize / 2);
        newStartIndex = Math.max(
          0,
          Math.min(indexOfSelected - half, allYears.length - calculatedSize)
        );
      }

      // Ensure startIndex doesn't become invalid for the new window size
      if (newStartIndex + calculatedSize > allYears.length) {
        newStartIndex = Math.max(0, allYears.length - calculatedSize);
      }

      // Update startIndex only if necessary
      if (newStartIndex !== startIndex.value) {
        startIndex.value = newStartIndex;
      }
    }
  }
}

// Center the view on a specific year after updating visibility
function centerOnYear(year: number) {
  const index = allYears.indexOf(year)
  if (index === -1) return

  const half = Math.floor(windowSize.value / 2);
  startIndex.value = Math.max(
    0,
    Math.min(index - half, allYears.length - windowSize.value)
  )

  selectedYear.value = year
}

// Watch for changes in selectedYear and ensure it's centered
watch(
  () => selectedYear.value,
  year => {
    // Wait for the DOM to potentially update due to windowSize change before re-centering
    nextTick(() => {
      centerOnYear(year);
    });
  },
  { immediate: true }
)

// Initialize ResizeObserver when component mounts
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (selectorContainerRef.value) {
    resizeObserver = new ResizeObserver(entries => {
      // Use the contentRect of the observed element
      const newWidth = entries[0]?.contentRect.width;
      updateWindowVisibility();
    });

    resizeObserver.observe(selectorContainerRef.value);
  }
});

// Clean up observer when component unmounts
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <section class="archives-section mb-16 min-w-340">
    <!-- ================= YEAR SELECTOR ================= -->
    <div class="d-flex mb-10">
      <!-- Wrapper div to get the container reference for ResizeObserver -->
      <div 
        ref="selectorContainerRef" 
        class="year-selector-wrapper d-flex align-center justify-space-between rounded-lg px-2 py-2 bg-surface border w-100"
      >
        <div class="flex-grow-1 d-flex align-center gap-1 flex-wrap">
          <v-btn
            v-for="year in visibleYears"
            :key="year"
            size=""
            rounded="lg"
            density="comfortable"
            class="pa-2 mx-1 year-btn flex-shrink-0 flex-grow-1"
            :variant="year === selectedYear ? 'tonal' : 'text'"
            :color="year === selectedYear ? 'primary' : undefined"
            @click="selectedYear = year"
          >
            {{ year }}
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
              aria-label="Select year"
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
              <v-list-item-title>{{ year }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <!-- ================= EVENTS HEADER ================= -->
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-4">
      <div class="d-flex align-center gap-3">
        <span class="text-h5 font-weight-black me-2">
          {{ selectedYear }}
        </span>
        <v-chip size="small" variant="outlined" color="primary">
          {{ filteredEvents.length }} {{ $t('event') }} {{ filteredEvents.length !== 1 ? 's' : '' }}
        </v-chip>
      </div>

      <v-btn
        size="small"
        color="secondary"
        variant="tonal"
        prepend-icon="mdi-file-pdf-box"
        rounded="lg"
      >
        {{$t('download_pdf')}}
      </v-btn>
    </div>

    <!-- ================= EVENTS GRID ================= -->
    <transition name="fade" mode="out-in">
      <v-row :key="selectedYear">
        <v-col
          v-for="event in filteredEvents"
          :key="event.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="rounded-xl overflow-hidden h-100" border>
            <v-img
              :src="event.image.trim()"
              height="220"
              cover
              gradient="to top, rgba(0,0,0,0.75), transparent"
            >
              <div class="pa-4 text-white">
                <div class="text-overline font-weight-bold mb-1">
                  {{ event.date }}
                </div>
                <h3 class="text-h6 font-weight-bold leading-tight mb-1">
                  {{ event.title }}
                </h3>
                <div class="text-caption opacity-90 d-flex align-center">
                  <v-icon size="small" start>mdi-map-marker</v-icon>
                  {{ event.location }}
                </div>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <!-- EMPTY STATE -->
        <v-col v-if="filteredEvents.length === 0" cols="12">
          <v-sheet
            class="py-16 rounded-xl text-center border border-dashed"
          >
            <v-icon size="40" class="mb-3" color="medium-emphasis">
              mdi-archive-off-outline
            </v-icon>
            <div class="text-h6 mb-1">
              Aucun événement
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Aucun archive disponible pour {{ selectedYear }}.
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </transition>
  </section>
</template>

<style scoped>
  .max-w-lg {
    max-width: 720px;
  }

  .min-w-340 {
    min-width: 340px;
  }

  .year-selector-wrapper {
    display: flex;
    align-items: center;
  }

  .year-btn {
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease,
      opacity 0.15s ease;
    flex-shrink: 0;
  }

  .year-btn:not(.v-btn--active) {
    opacity: 0.65;
  }

  .year-btn.v-btn--active {
    transform: scale(1.05);
    opacity: 1;
  }

  .year-dropdown {
    max-height: 280px;
    overflow-y: auto;
  }

  /* Sticky subheader */
  .dropdown-header {
    top: -10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    position: sticky;
    z-index: 20;
    background-color: rgb(var(--v-theme-surface));
    border-bottom: 1px solid rgba(var(--v-border-color), 0.2);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .leading-tight {
    line-height: 1.25;
  }
</style>