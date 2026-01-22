<!-- src/components/GuestsLandingPage.vue -->
<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { ref } from 'vue'

// ==========================================================================
// CONFIGURATION
// ==========================================================================
const heroImageUrl = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2500&auto=format&fit=crop'

const guestInfo = {
  title: 'Bienvenue aux Artistes & Intervenants !',
  subtitle: 'Au Passage du Livre – Foire Européenne 2026',
  description: 'Cher·ère auteur·e, poète, historien·ne, journaliste ou créateur·rice, merci de faire partie de l’aventure "Au Passage du Livre" à la Foire Européenne 2026 ! Votre présence enrichit notre mission : célébrer la littérature, favoriser les échanges culturels et inspirer le public européen.',
  keyDates: {
    event: '4–14 septembre 2026',
    deadline: '15 mars 2026',
    hours: '10h00 – 20h00'
  },
  contact: {
    email: 'invites@passagedulivre.eu',
    phone: '+33 (0)1 23 45 67 89'
  }
}

const steps = [
  {
    title: 'Confirmez votre participation',
    desc: 'Répondez à notre email d’invitation avant le 15 mars 2026.'
  },
  {
    title: 'Soumettez vos documents',
    desc: 'Photo professionnelle, biographie (max. 120 mots), liste des ouvrages, préférences techniques.'
  },
  {
    title: 'Planifiez vos interventions',
    desc: 'Séances de dédicace, tables rondes, ateliers exclusifs.'
  },
  {
    title: 'Logistique & Accueil',
    desc: 'Réservation hôtel (prise en charge partielle), transferts, badge VIP & accès backstage.'
  }
]

const usefulLinks = [
  { label: 'Télécharger le guide de l’intervenant·e (PDF)', href: '#' },
  { label: 'Consulter le planning prévisionnel', href: '#' },
  { label: 'Accéder à l’espace privé', href: '#' }
]

// ==========================================================================
// REACTIVE & COMPUTED
// ==========================================================================
const { mdAndUp } = useDisplay()

const heroStyle = computed(() => ({
  backgroundImage: `url(${heroImageUrl})`
}))

const cardElevation = computed(() => (mdAndUp.value ? 4 : 2))
</script>

<template>
  <div class="guests-landing pa-4 pa-md-8">
    <!-- Hero Section -->
    <v-card
      class="hero-card rounded-xl overflow-hidden mb-10"
      height="400"
      :style="heroStyle"
    >
      <div class="glass-overlay"></div>
      <div class="content-layer pa-6 pa-md-10 h-100 d-flex flex-column justify-center text-center text-white">
        <h1 class="text-h4 text-md-h3 font-weight-black mb-2">{{ guestInfo.title }}</h1>
        <p class="text-h6 font-weight-light opacity-90">{{ guestInfo.subtitle }}</p>
      </div>
    </v-card>

    <!-- Intro Paragraph -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <p class="text-body-1 text-justify mb-8">
          {{ guestInfo.description }}
        </p>
      </v-col>
    </v-row>

    <!-- Key Info Grid -->
    <v-row class="mb-10" dense>
      <v-col cols="12" sm="6" md="4">
        <v-sheet
          class="rounded-xl py-6 px-4 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center"
        >
          <v-avatar color="primary" variant="tonal" size="50" class="mb-3">
            <v-icon size="24">mdi-calendar</v-icon>
          </v-avatar>
          <h3 class="font-weight-bold text-subtitle-1">Dates de l’événement</h3>
          <p class="mt-2 text-body-2">{{ guestInfo.keyDates.event }}</p>
          <p class="text-caption text-medium-emphasis">{{ guestInfo.keyDates.hours }}</p>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-sheet
          class="rounded-xl py-6 px-4 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center"
        >
          <v-avatar color="warning" variant="tonal" size="50" class="mb-3">
            <v-icon size="24">mdi-clock-alert</v-icon>
          </v-avatar>
          <h3 class="font-weight-bold text-subtitle-1">Date limite</h3>
          <p class="mt-2 text-body-2">Confirmation requise avant le</p>
          <p class="text-body-1 font-weight-medium">{{ guestInfo.keyDates.deadline }}</p>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6" md="4" offset-sm="3" offset-md="0">
        <v-sheet
          class="rounded-xl py-6 px-4 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center"
        >
          <v-avatar color="success" variant="tonal" size="50" class="mb-3">
            <v-icon size="24">mdi-map-marker</v-icon>
          </v-avatar>
          <h3 class="font-weight-bold text-subtitle-1">Lieu</h3>
          <p class="mt-2 text-body-2">Parc des Expositions</p>
          <p class="text-body-2">Hall 5, Stand B-24</p>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Steps Section -->
    <v-row class="mb-12">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold text-center mb-8">Prochaines Étapes pour les Invité·es</h2>

        <v-timeline
          side="end"
          density="compact"
          class="px-4"
        >
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="i"
            :dot-color="i === 0 ? 'primary' : i === 1 ? 'secondary' : i === 2 ? 'success' : 'info'"
            size="small"
            class="mb-6"
          >
            <template #icon>
              <v-icon :color="i === 0 ? 'white' : i === 1 ? 'white' : i === 2 ? 'white' : 'white'">
                {{ ['mdi-email-check', 'mdi-file-document', 'mdi-calendar-multiple', 'mdi-car'][i] }}
              </v-icon>
            </template>
            <v-card
              :elevation="cardElevation"
              class="rounded-lg"
            >
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ step.title }}
              </v-card-title>
              <v-card-text class="text-body-2">
                {{ step.desc }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <!-- Contact & Links -->
    <v-row class="mb-10">
      <v-col cols="12" md="6" class="mb-6 mb-md-0">
        <v-card
          class="rounded-xl"
          color="grey-lighten-5"
        >
          <v-card-title class="text-h6 font-weight-bold">
            📩 Contact Dédié
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-1">
              Pour toute question :
            </p>
            <p class="text-body-1 font-weight-medium">
              📧 <a :href="`mailto:${guestInfo.contact.email}`" class="text-decoration-none">{{ guestInfo.contact.email }}</a>
            </p>
            <p class="text-body-1 font-weight-medium">
              📞 {{ guestInfo.contact.phone }} (lun–ven, 9h–17h)
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          class="rounded-xl"
          color="grey-lighten-5"
        >
          <v-card-title class="text-h6 font-weight-bold">
            🔗 Liens Utiles
          </v-card-title>
          <v-card-text>
            <v-list nav dense>
              <v-list-item
                v-for="(link, i) in usefulLinks"
                :key="i"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="text-body-2"
              >
                <template #prepend>
                  <v-icon size="small" class="me-2">mdi-link</v-icon>
                </template>
                {{ link.label }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Closing Quote -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card
          class="rounded-xl elevation-0 border"
          variant="outlined"
        >
          <v-card-text class="text-center py-6">
            <p class="text-body-1 italic font-italic">
              « Votre voix compte. Ensemble, faisons de ces 10 jours un pont entre les langues, les idées et les cœurs. »
            </p>
            <p class="text-body-2 text-medium-emphasis mt-2">
              — L’équipe d’<strong>Au Passage du Livre</strong>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Final CTA -->
    <div class="text-center mt-12">
      <v-btn
        color="primary"
        size="x-large"
        rounded="xl"
        prepend-icon="mdi-check-circle-outline"
        @click="$router.push('/contact')"
      >
        Confirmer ma participation
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.hero-card {
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
}

.glass-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85));
  z-index: 1;
}

.content-layer {
  position: relative;
  z-index: 2;
}

.guests-landing {
  max-width: 1400px;
  margin: 0 auto;
}

.v-timeline-item__body {
  width: 100%;
}
</style>