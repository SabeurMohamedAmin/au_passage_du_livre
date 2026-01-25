<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ==========================================================================
   INTERFACES & DATA
   ========================================================================== */
interface Mission {
  id: number
  // Left Column Content
  title: string
  description: string
  buttonText: string
  buttonColor: string
  // Right Column (Card) Content
  cardTitle: string
  cardText: string
  cardLinkText: string
  cardImage: string
}

const missions: Mission[] = [
  {
    id: 1,
    title: 'Notre mission',
    description: 'Découvrez nos actions pour soutenir, créer et partager la culture, accessibles à tous.',
    buttonText: 'En savoir plus',
    buttonColor: '#D97736',
    cardTitle: 'Rencontres avec des auteurs',
    cardText: 'Séances de dédicaces, discussions et rencontres littéraires avec vos auteurs préférés.',
    cardLinkText: 'Voir le programme',
    cardImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 2,
    title: 'Éducation & Jeunesse',
    description: 'Des ateliers pédagogiques pour inspirer les nouvelles générations et éveiller leur créativité.',
    buttonText: 'Nos programmes',
    buttonColor: '#4E8098', // Teal/Blue for variety
    cardTitle: 'Ateliers d’écriture',
    cardText: 'Des sessions interactives pour apprendre à structurer un récit et développer son imagination.',
    cardLinkText: 'Inscrire une classe',
    cardImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 3,
    title: 'Patrimoine Vivant',
    description: 'Préserver et valoriser l’histoire locale à travers des expositions et des conférences inédites.',
    buttonText: 'Explorer l’histoire',
    buttonColor: '#8A5A44', // Darker brown
    cardTitle: 'Conférences Histoire',
    cardText: 'Plongez dans le passé avec nos historiens experts lors de soirées thématiques exceptionnelles.',
    cardLinkText: 'Agenda des conférences',
    cardImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=300'
  }
]

/* ==========================================================================
   STATE & LOGIC
   ========================================================================== */
const activeIndex = ref(0)
const activeMission = computed(() => missions[activeIndex.value])
let intervalId: any = null

const nextMission = () => {
  activeIndex.value = (activeIndex.value + 1) % missions.length
}

const setMission = (index: number) => {
  activeIndex.value = index
  resetTimer()
}

// Timer Logic
const startTimer = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(nextMission, 5000) // Change every 5 seconds
}

const pauseTimer = () => {
  if (intervalId) clearInterval(intervalId)
}

const resetTimer = () => {
  pauseTimer()
  startTimer()
}

// Lifecycle hooks
onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  pauseTimer()
})
</script>

<template>
  <section 
    class="mission-section py-16 position-relative d-flex align-center"
    @mouseenter="pauseTimer"
    @mouseleave="startTimer"
  >
    <v-container>
      <v-row align="center" justify="space-between" class="gy-8">
        
        <!-- =============================================
             LEFT COLUMN: DYNAMIC TEXT
        ============================================= -->
        <v-col cols="12" md="5" lg="5">
          <!-- Using mode="out-in" ensures the old content leaves before new enters -->
          <v-fade-transition mode="out-in">
            <div :key="activeMission.id">
              <h2 class="text-h3 font-weight-bold text-brown-darken-4 mb-4 serif-font">
                {{ activeMission.title }}
              </h2>
              <p class="text-h6 text-brown-darken-3 font-weight-regular mb-8" style="line-height: 1.6; min-height: 80px;">
                {{ activeMission.description }}
              </p>
              
              <v-btn
                :color="activeMission.buttonColor"
                class="text-white px-8 transition-colors"
                rounded="pill"
                size="large"
                elevation="2"
                flat
              >
                {{ activeMission.buttonText }}
                <v-icon end icon="mdi-arrow-right" />
              </v-btn>
            </div>
          </v-fade-transition>
        </v-col>

        <!-- =============================================
             RIGHT COLUMN: DYNAMIC FEATURE CARD
        ============================================= -->
        <v-col cols="12" md="6" lg="6">
          <v-fade-transition mode="out-in">
            <v-card
              :key="activeMission.id"
              class="feature-card rounded-xl pa-6 pa-md-8"
              elevation="4"
              border
            >
              <v-row align="center" no-gutters>
                <!-- Card Text -->
                <v-col cols="12" sm="7" class="pr-sm-4">
                  <h3 class="text-h4 font-weight-bold text-brown-darken-4 mb-4 serif-font">
                    {{ activeMission.cardTitle }}
                  </h3>
                  <p class="text-body-1 text-brown-darken-2 mb-6" style="min-height: 72px;">
                    {{ activeMission.cardText }}
                  </p>
                  <a 
                    href="#" 
                    class="text-brown-darken-3 text-decoration-none font-weight-bold d-inline-flex align-center feature-link"
                  >
                    {{ activeMission.cardLinkText }}
                    <v-icon icon="mdi-arrow-right" class="ms-1" size="small" />
                  </a>
                </v-col>

                <!-- Card Image -->
                <v-col cols="12" sm="5" class="d-flex justify-end mt-4 mt-sm-0">
                  <v-img
                    :src="activeMission.cardImage"
                    :alt="activeMission.cardTitle"
                    width="180"
                    height="240"
                    class="rounded-lg transform-rotate"
                    cover
                  >
                    <template #placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="brown-lighten-3" />
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-card>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- =============================================
         BOTTOM CONTROLS (DOTS)
    ============================================= -->
    <div class="scroll-indicator position-absolute bottom-0 w-100 d-flex justify-center pb-6 gap-2">
      <button
        v-for="(mission, index) in missions"
        :key="mission.id"
        @click="setMission(index)"
        class="mission-dot"
        :class="{ 'active': index === activeIndex }"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div>
  </section>
</template>

<style scoped>
/* BACKGROUND */
.mission-section {
  min-height: 500px; /* Increased min-height to prevent jumping */
  background-color: #FDF6E9;
  background-image: 
    radial-gradient(at 10% 10%, rgba(255, 255, 255, 0.8) 0%, transparent 40%),
    radial-gradient(at 90% 90%, rgba(230, 210, 190, 0.5) 0%, transparent 40%),
    url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  background-size: cover, cover, 200px 200px;
  transition: background-color 0.5s ease;
}

/* TYPOGRAPHY */
.serif-font {
  font-family: "Playfair Display", "Merriweather", serif !important;
  letter-spacing: -0.5px;
}

/* FEATURE CARD */
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

/* DOTS NAVIGATION */
.scroll-indicator {
  display: flex;
  gap: 12px;
}

.mission-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(121, 85, 72, 0.3); /* Brownish */
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mission-dot:hover {
  background-color: rgba(121, 85, 72, 0.3);
}

.mission-dot.active {
  background-color: #5D4037; /* Brown Darken 2 */
  border-color: #5D4037;
  transform: scale(1.2);
}

.transition-colors {
  transition: background-color 0.3s ease;
}
</style>
