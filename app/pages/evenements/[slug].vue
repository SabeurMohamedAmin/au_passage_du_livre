<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import type { EventWithRelations } from '~/stores/events'

definePageMeta({ name: 'event-details' })

const route = useRoute()
const theme = useTheme()
const { locale } = useI18n()

// Fetch the event by slug
const { data: event } = await useFetch<EventWithRelations>(
  `/api/events/${route.params.slug}`,
)

// ── Helpers ───────────────────────────────────────────────────────────────
const translation = computed(() =>
  event.value?.translations.find(t => t.locale === locale.value) ??
  event.value?.translations.find(t => t.locale === 'fr') ??
  event.value?.translations[0],
)

const heroGradient = computed(() => {
  const rgb = theme.global.current.value.dark ? '0,0,0' : '255,255,255'
  return `to top, rgba(${rgb}, 0.4) 0%, rgba(${rgb}, 0) 80%`
})

// Group sessions by date for the schedule display
const sessionsByDate = computed(() => {
  if (!event.value) return []
  const groups = new Map<string, typeof event.value.sessions>()

  for (const session of event.value.sessions) {
    const key = session.date
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(session)
  }

  return Array.from(groups.entries()).map(([date, sessions]) => {
    const d = new Date(date)
    return {
      day:      d.getDate().toString(),
      month:    d.toLocaleString('fr-FR', { month: 'short' }),
      year:     d.getFullYear().toString(),
      sessions: sessions.sort((a, b) => (a.time > b.time ? 1 : -1)),
    }
  })
})

// Unique intervenants across the whole event
const allIntervenants = computed(() => {
  if (!event.value) return []
  const map = new Map<number, (typeof event.value.intervenants)[0]['intervenant']>()
  event.value.intervenants.forEach(ei => map.set(ei.intervenant.id, ei.intervenant))
  event.value.sessions.forEach(s =>
    s.intervenants.forEach(si => map.set(si.intervenant.id, si.intervenant)),
  )
  return Array.from(map.values())
})

// Parse highlights (one per line) into an array
const highlights = computed(() =>
  (translation.value?.highlights ?? '')
    .split('\n')
    .map(h => h.trim())
    .filter(Boolean),
)
</script>

<template>
  <!-- Not found -->
  <v-container v-if="!event" class="py-16 text-center">
    <v-icon icon="mdi-calendar-remove" size="64" class="mb-4 opacity-50" />
    <h2 class="text-h5 mb-2">Événement introuvable</h2>
    <p class="text-medium-emphasis mb-6">Cet événement n'existe pas ou a été supprimé.</p>
    <v-btn to="/evenements" variant="tonal" prepend-icon="mdi-arrow-left">Retour aux événements</v-btn>
  </v-container>

  <!-- Event content -->
  <div v-else>
    <!-- Hero -->
    <section>
      <v-img
        :src="event.coverImage || '/img/home/diffrents-directions.png'"
        :gradient="heroGradient"
        class="align-end"
        height="70vh"
        cover
      >
        <v-container>
          <div class="mb-10 bg-glassy rounded-xl">
            <h1 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-90">
              {{ translation?.title }}
            </h1>
            <p v-if="translation?.subtitle" class="text-h6 font-weight-light mb-6">
              {{ translation.subtitle }}
            </p>
            <div class="d-flex flex-wrap ga-6 text-subtitle-1">
              <span v-if="event.locationName" class="d-flex align-center">
                <v-icon start>mdi-map-marker</v-icon> {{ event.locationName }}
              </span>
              <span class="d-flex align-center">
                <v-icon start>mdi-calendar</v-icon>
                {{ event.startDate }}
                <template v-if="event.endDate"> → {{ event.endDate }}</template>
              </span>
              <span class="d-flex align-center">
                <v-icon start>mdi-ticket-confirmation</v-icon> {{ $t(event.entranceType) }}
              </span>
            </div>
          </div>
        </v-container>
      </v-img>
    </section>

    <v-container>
      <!-- About -->
      <section v-if="translation?.about" class="py-2">
        <v-row justify="space-between">
          <v-col cols="12" md="7" order="3" order-md="1">
            <h2 class="mb-8 text-h5 text-sm-h4 font-weight-black opacity-70">À propos</h2>
            <div class="text-body-1 editorial-text" style="white-space: pre-line;">{{ translation.about }}</div>
          </v-col>
          <v-col cols="12" md="1" order="2" class="d-none d-md-flex justify-end">
            <v-divider thickness="5" vertical />
          </v-col>
          <v-col cols="12" md="4" order="2">
            <div class="pt-md-2">
              <div v-if="event.locationName" class="mb-4">
                <div class="text-caption text-uppercase font-weight-bold text-grey">Lieu</div>
                <div class="text-body-1">{{ event.locationName }}</div>
              </div>
              <div v-if="event.time" class="mb-4">
                <div class="text-caption text-uppercase font-weight-bold text-grey">Horaires</div>
                <div class="text-body-1">{{ event.time }}</div>
              </div>
              <div v-if="event.address" class="mb-4">
                <div class="text-caption text-uppercase font-weight-bold text-grey">Adresse</div>
                <div class="text-body-1">{{ event.address }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <v-divider v-if="highlights.length" class="mb-10 mx-2" />

      <!-- Highlights -->
      <section v-if="highlights.length" class="mb-16">
        <h2 class="mb-8 text-h5 text-sm-h4 font-weight-black opacity-70">Au programme</h2>
        <v-row>
          <v-col v-for="(h, i) in highlights" :key="i" cols="12" sm="6" md="4">
            <h3 class="text-h6 font-weight-bold mb-2">• {{ h }}</h3>
          </v-col>
        </v-row>
      </section>

      <!-- Schedule -->
      <section v-if="sessionsByDate.length" class="mb-16">
        <h2 class="mb-8 text-h5 text-sm-h4 font-weight-black opacity-70">Programme détaillé</h2>

        <article v-for="group in sessionsByDate" :key="group.day + group.month">
          <div class="d-flex align-center mb-8 background-opacity-sticky rounded-xl">
            <div class="text-h4 font-weight-black mr-4">{{ group.day }}</div>
            <div class="d-flex flex-column py-5 pe-4">
              <p class="text-h6 text-uppercase font-weight-bold mb-0">{{ group.month }} {{ group.year }}</p>
            </div>
            <v-divider class="ml-6 flex-shrink-1" />
          </div>

          <v-row v-for="session in group.sessions" :key="session.id" class="mb-8 border-bottom-soft pb-6">
            <v-col cols="12" md="2" class="text-md-right">
              <span class="text-h6 font-weight-bold">{{ session.time }}</span>
            </v-col>
            <v-col cols="12" md="7">
              <h4 class="text-h5 font-weight-bold mb-2">
                {{ session.translations.find(t => t.locale === locale)?.title ?? session.translations.find(t => t.locale === 'fr')?.title ?? session.translations[0]?.title }}
              </h4>
              <p class="text-body-2 text-medium-emphasis mb-4">
                {{ session.translations.find(t => t.locale === locale)?.description ?? session.translations.find(t => t.locale === 'fr')?.description }}
              </p>
              <div v-if="session.location" class="text-caption text-primary">📍 {{ session.location }}</div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="d-flex ga-2 flex-wrap">
                <v-avatar v-for="si in session.intervenants" :key="si.intervenantId" size="36" class="border">
                  <v-img v-if="si.intervenant.image" :src="si.intervenant.image" />
                  <span v-else class="text-caption">{{ si.intervenant.name.charAt(0) }}</span>
                  <v-tooltip activator="parent" location="top">{{ si.intervenant.name }}</v-tooltip>
                </v-avatar>
              </div>
            </v-col>
          </v-row>
        </article>
      </section>

      <!-- Intervenants -->
      <section v-if="allIntervenants.length" id="guests" class="mb-16 py-12 rounded-lg px-6 border">
        <h2 class="text-h4 serif mb-10">Les Intervenants</h2>
        <v-row>
          <v-col v-for="guest in allIntervenants" :key="guest.id" cols="6" sm="4" md="2" class="text-center mb-6">
            <v-avatar size="100" class="mb-3 grayscale-hover">
              <v-img v-if="guest.image" :src="guest.image" cover />
              <span v-else class="text-h4">{{ guest.name.charAt(0) }}</span>
            </v-avatar>
            <div class="text-subtitle-2 font-weight-bold">{{ guest.name }}</div>
            <div class="text-caption text-grey">{{ guest.role }}</div>
          </v-col>
        </v-row>
      </section>

      <!-- Documents -->
      <section v-if="event.documents.length" class="mb-16">
        <h2 class="text-h4 serif mb-8">Documents & archives</h2>
        <v-row>
          <v-col v-for="doc in event.documents" :key="doc.id" cols="12" sm="6" md="4">
            <v-card flat border rounded="lg" class="pa-4">
              <div class="d-flex align-center gap-3">
                <v-icon icon="mdi-file-pdf-box" color="error" size="32" />
                <div>
                  <div class="font-weight-bold">{{ doc.label }}</div>
                  <a :href="doc.url" target="_blank" class="text-caption text-primary">Télécharger</a>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Libre+Baskerville&display=swap');

.bg-glassy {
  margin: 0 -10px;
  padding: 10px;
  background-color: rgba(100, 100, 100, 0.05);
  backdrop-filter: blur(2px);
}
.serif          { font-family: 'Playfair Display', serif; }
.editorial-text { font-family: 'Libre Baskerville', serif; line-height: 1.8; }
.border-bottom-soft { border-bottom: 1px solid rgba(0, 0, 0, 0.05); }

.grayscale-hover       { filter: grayscale(100%); transition: filter 0.3s ease; }
.grayscale-hover:hover { filter: grayscale(0%); }

.background-opacity-sticky {
  position: sticky;
  top: 70px;
  z-index: 5;
  background-color: rgba(150, 150, 150, 0.04);
  margin: 0 -10px;
  padding: 10px;
  backdrop-filter: blur(12px);
}
</style>