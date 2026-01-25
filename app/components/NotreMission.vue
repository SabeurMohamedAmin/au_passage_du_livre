<script setup lang="ts">

interface Mission {
  id: number
  title: string
  description: string
  button: {
    label: string
    link: string
    color: string
  }
  card: {
    title: string
    text: string
    cta: string
    image: string
  }
}

// Data: In a real Nuxt app, this might come from `useAsyncData` or a CMS composable
const missions: Mission[] = [
  {
    id: 1,
    title: 'Notre mission',
    description: 'Découvrez nos actions pour soutenir, créer et partager la culture, accessibles à tous.',
    button: { label: 'En savoir plus', link: '/mission', color: '#D97736' },
    card: {
      title: 'Rencontres avec des auteurs',
      text: 'Séances de dédicaces, discussions et rencontres littéraires avec vos auteurs préférés.',
      cta: 'Voir le programme',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300'
    }
  },
  {
    id: 2,
    title: 'Éducation & Jeunesse',
    description: 'Des ateliers pédagogiques pour inspirer les nouvelles générations et éveiller leur créativité.',
    button: { label: 'Nos programmes', link: '/education', color: '#4E8098' },
    card: {
      title: 'Ateliers d’écriture',
      text: 'Des sessions interactives pour apprendre à structurer un récit et développer son imagination.',
      cta: 'Inscrire une classe',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300'
    }
  },
  {
    id: 3,
    title: 'Patrimoine Vivant',
    description: 'Préserver et valoriser l’histoire locale à travers des expositions et des conférences inédites.',
    button: { label: 'Explorer l’histoire', link: '/history', color: '#8A5A44' },
    card: {
      title: 'Conférences Histoire',
      text: 'Plongez dans le passé avec nos historiens experts lors de soirées thématiques exceptionnelles.',
      cta: 'Agenda des conférences',
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=300'
    }
  }
]

/* ==========================================================================
   LOGIC
   ========================================================================== */
const activeIndex = ref(0)
const activeMission = computed(() => missions[activeIndex.value])
let intervalId: NodeJS.Timeout | null = null

const nextMission = () => {
  activeIndex.value = (activeIndex.value + 1) % missions.length
}

const setMission = (index: number) => {
  activeIndex.value = index
  resetTimer()
}

// Timer Controls
const startTimer = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(nextMission, 5000)
}

const pauseTimer = () => {
  if (intervalId) clearInterval(intervalId)
}

const resetTimer = () => {
  pauseTimer()
  startTimer()
}

// Nuxt Lifecycle (Auto-imported)
onMounted(() => startTimer())
onUnmounted(() => pauseTimer())
</script>

<template>
  <v-row align="start" justify="space-between">
    <!-- LEFT COLUMN -->
    <v-col cols="12" md="5" lg="5">
      <v-fade-transition mode="out-in">
        <div :key="activeMission.id">
          <h2 class="text-h3 font-weight-bold text-brown-darken-4 mb-2 serif-font">
            {{ activeMission.title }}
          </h2>
          <p class="text-h6 text-brown-darken-3 font-weight-regular mb-2 description-text">
            {{ activeMission.description }}
          </p>
          
          <!-- NUXT FEATURE: NuxtLink for internal navigation -->
          <v-btn
            :to="activeMission.button.link" 
            :color="activeMission.button.color"
            component="NuxtLink"
            class="text-white px-8 transition-colors"
            rounded="pill"
            size="large"
            elevation="2"
            flat
          >
            {{ activeMission.button.label }}
            <v-icon end icon="mdi-arrow-right" />
          </v-btn>
        </div>
      </v-fade-transition>
    </v-col>

    <!-- RIGHT COLUMN -->
    <v-col
      cols="12" md="6" lg="6"
      @mouseenter="pauseTimer"
      @mouseleave="startTimer"
    >
      <v-fade-transition mode="out-in">
        <v-card
          :key="activeMission.id"
          class="feature-card rounded-xl pa-6 pa-md-8"
          elevation="4"
          border
        >
          <v-row align="center" no-gutters>
            <v-col cols="12" sm="7" class="pr-sm-4">
              <h3 class="text-h4 font-weight-bold text-brown-darken-4 mb-4 serif-font">
                {{ activeMission.card.title }}
              </h3>
              <p class="text-body-1 text-brown-darken-2 mb-6 card-text-min-height">
                {{ activeMission.card.text }}
              </p>
              
              <!-- NUXT FEATURE: NuxtLink for text links -->
              <NuxtLink 
                :to="activeMission.button.link"
                class="text-brown-darken-3 text-decoration-none font-weight-bold d-inline-flex align-center feature-link"
              >
                {{ activeMission.card.cta }}
                <v-icon icon="mdi-arrow-right" class="ms-1" size="small" />
              </NuxtLink>
            </v-col>

            <v-col cols="12" sm="5" class="d-flex justify-end mt-4 mt-sm-0">
              <v-img
                :src="activeMission.card.image"
                :alt="activeMission.card.title"
                width="180"
                height="240"
                class="rounded-lg transform-rotate"
                cover
              />
            </v-col>
          </v-row>
        </v-card>
      </v-fade-transition>
    </v-col>
  </v-row>
  <!-- NAVIGATION DOTS -->
  <div class="scroll-indicator position-absolute bottom-0 w-100 d-flex justify-center pb-2 gap-2">
    <button
      v-for="(mission, index) in missions"
      :key="mission.id"
      @click="setMission(index)"
      class="mission-dot"
      :class="{ 'active': index === activeIndex }"
      :aria-label="'Voir mission ' + (index + 1)"
    ></button>
  </div>
</template>

<style scoped>
/* BACKGROUND */
.mission-section {
  min-height: 500px;
  background-color: #FDF6E9;
  /* Optimized noise using CSS variable or static asset in Nuxt public/ folder is better, 
     but inline SVG is fine for portable components */
  background-image: 
    radial-gradient(at 10% 10%, rgba(255, 255, 255, 0.8) 0%, transparent 40%),
    radial-gradient(at 90% 90%, rgba(230, 210, 190, 0.5) 0%, transparent 40%),
    url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  background-size: cover, cover, 200px 200px;
}

/* TYPOGRAPHY */
.serif-font {
  /* Ensure these fonts are loaded in nuxt.config.ts via @nuxtjs/google-fonts */
  font-family: "Playfair Display", "Merriweather", serif !important;
  letter-spacing: -0.5px;
}

/* UTILITIES */
.description-text {
  line-height: 1.6;
  min-height: 80px; /* Prevents layout jumping */
}

.card-text-min-height {
  min-height: 72px; /* Prevents layout jumping */
}

/* COMPONENT STYLES */
.feature-card {
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03),
    inset 0 0 20px rgba(255, 248, 240, 0.8);
}

.feature-link {
  transition: opacity 0.2s ease;
}
.feature-link:hover {
  opacity: 0.7;
}

.transform-rotate {
  transform: rotate(3deg);
  box-shadow: 10px 10px 20px rgba(0,0,0,0.1);
  transition: transform 0.5s ease;
}
.feature-card:hover .transform-rotate {
  transform: rotate(0deg) scale(1.05);
}

.scroll-indicator {
  display: flex;
  gap: 12px;
}

.mission-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(121, 85, 72, 0.3);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mission-dot:hover {
  background-color: rgba(121, 85, 72, 0.3);
}

.mission-dot.active {
  background-color: #5D4037;
  border-color: #5D4037;
  transform: scale(1.2);
}

.transition-colors {
  transition: background-color 0.3s ease;
}
</style>
