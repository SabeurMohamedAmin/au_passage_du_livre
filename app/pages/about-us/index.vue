<script setup lang="ts">
import { useTheme } from 'vuetify'

/* ====================
   THEME LOGIC
   ===================*/
const theme = useTheme();

// Computed classes for text colors based on active theme
const textColor = computed(() => theme.global.current.value.dark ? 'text-orange-lighten-4' : 'text-brown-darken-4')
const subTextColor = computed(() => theme.global.current.value.dark ? 'text-grey-lighten-1' : 'text-brown-darken-3')

/* =====================
   DATA
   ====================*/
const missions = [
  {
    id: 1,
    title: 'Notre mission',
    text: 'Transmettre la culture, soutenir les artistes et rendre la création accessible à tous.',
    btnLabel: "Rejoindre l'aventure",
    btnColor: '#D97736', 
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    align: 'left'
  },
  {
    id: 2,
    title: 'Éducation & Jeunesse',
    text: 'Des ateliers pédagogiques pour inspirer les nouvelles générations et éveiller leur créativité.',
    btnLabel: 'Nos programmes',
    btnColor: '#5C7C78', 
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    align: 'right'
  },
  {
    id: 3,
    title: 'Patrimoine Vivant',
    text: 'Préserver et valoriser l’histoire locale à travers des expositions et des conférences inédites.',
    btnLabel: "Explorer l'histoire",
    btnColor: '#8A5A44', 
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    align: 'left'
  }
]

const stats = [
  { value: '50+', label: 'événements culturels' },
  { value: '120', label: 'artistes soutenus' },
  { value: '10', label: 'ans d\'engagement' }
]

const actions = [
  {
    title: 'Création',
    text: 'Soutien aux auteurs, artistes et projets culturels locaux.',
    icon: 'mdi-book-open-page-variant-outline',
    color: '#D97736'
  },
  {
    title: 'Transmission',
    text: 'Rencontres, ateliers et médiation culturelle.',
    icon: 'mdi-account-group-outline',
    color: '#5C7C78'
  },
  {
    title: 'Ancrage local',
    text: 'Valorisation du patrimoine et des initiatives alsaciennes.',
    icon: 'mdi-home-city-outline',
    color: '#8A5A44'
  }
]
</script>

<template>
  <div class="transition-all" :class="theme.global.current.value.dark ? 'bg-texture-dark' : 'bg-texture-paper'">
    <!-- =============================================
         1. ZIG-ZAG MISSIONS SECTION
         ============================================= -->
    <v-container class="py-16">
      <div v-for="(mission, index) in missions" :key="mission.id" class="mb-16">
        <v-row align="center" justify="space-between" :class="{'flex-row-reverse': mission.align === 'right'}">
          
          <!-- TEXT COLUMN -->
          <v-col cols="12" md="5" lg="5">
            <h2 class="text-h3 font-weight-black mb-4 serif-font transition-colors" :class="textColor">
              {{ mission.title }}
            </h2>
            <p class="text-h6 font-weight-regular mb-8 transition-colors" :class="subTextColor" style="line-height: 1.6;">
              {{ mission.text }}
            </p>
            <v-btn
              :color="mission.btnColor"
              class="text-white px-8"
              rounded="pill"
              size="large"
              elevation="4"
            >
              {{ mission.btnLabel }}
              <v-icon v-if="index === 2" end icon="mdi-arrow-right" />
            </v-btn>
          </v-col>

          <!-- IMAGE COLUMN -->
          <v-col cols="12" md="6" lg="6">
            <v-card class="rounded-xl overflow-hidden elevation-6 border-image">
              <v-img
                :src="mission.image"
                height="350"
                cover
                class="sepia-filter"
              ></v-img>
            </v-card>
          </v-col>

        </v-row>
      </div>
    </v-container>

    <!-- =============================================
         2. IMPACT STATS SECTION
         ============================================= -->
    <section class="impact-section py-10 my-8">
      <v-container>
        <!-- Section Title (Centered with lines) -->
        <div class="d-flex align-center justify-center mb-10 opacity-60">
          <v-divider :color="theme.global.current.value.dark ? 'white' : 'brown'" class="border-opacity-50 mx-4" length="100"></v-divider>
          <span class="text-h5 font-weight-bold serif-font text-uppercase ls-2 transition-colors" :class="textColor">Impact</span>
          <v-divider :color="theme.global.current.value.dark ? 'white' : 'brown'" class="border-opacity-50 mx-4" length="100"></v-divider>
        </div>

        <v-row justify="center" class="text-center">
          <v-col 
            v-for="(stat, i) in stats" 
            :key="i" 
            cols="12" sm="4"
            class="d-flex flex-column align-center position-relative"
          >
            <!-- Vertical Divider -->
            <div 
              v-if="i < stats.length - 1" 
              class="d-none d-sm-block position-absolute vertical-divider"
              :class="theme.global.current.value.dark ? 'bg-grey-darken-2' : 'bg-brown-lighten-4'"
            ></div>

            <div class="text-h2 font-weight-bold mb-2 serif-font transition-colors" :class="textColor">
              {{ stat.value }}
            </div>
            <div class="text-body-1 transition-colors" :class="subTextColor" style="max-width: 150px; line-height: 1.2;">
              {{ stat.label }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- =============================================
         3. HOW WE ACT (CARDS) SECTION
         ============================================= -->
    <section class="py-16">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 serif-font transition-colors" :class="textColor">
            Comment nous agissons
          </h2>
          <p class="text-h6 font-weight-regular transition-colors" :class="subTextColor">
            Bénévoles, artistes, partenaires — chacun a un rôle à jouer.
          </p>
        </div>

        <v-row>
          <v-col v-for="action in actions" :key="action.title" cols="12" md="4">
            <v-card 
              class="h-100 rounded-xl pa-8 text-center d-flex flex-column align-center"
              :class="theme.global.current.value.dark ? 'bg-transparent-card-dark' : 'bg-transparent-card-light'"
              elevation="0"
              border
            >
              <v-avatar :color="action.color" size="80" variant="tonal" class="mb-6 rounded-lg">
                <v-icon :icon="action.icon" size="40" :color="action.color"></v-icon>
              </v-avatar>

              <h3 class="text-h5 font-weight-bold mb-4 serif-font transition-colors" :class="textColor">
                {{ action.title }}
              </h3>
              
              <p class="text-body-1 transition-colors" :class="subTextColor">
                {{ action.text }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
  .z-index-100 {
    z-index: 100;
  }

  /* Light Mode Texture (Cream Paper) */
  .bg-texture-paper {
    background-color: #FDF6E9;
    background-image: 
      radial-gradient(at 20% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 50%),
      radial-gradient(at 80% 80%, rgba(217, 187, 155, 0.3) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  }

  /* Dark Mode Texture (Dark Stone/Leather) */
  .bg-texture-dark {
    background-color: #121212;
    background-image: 
      radial-gradient(at 20% 20%, rgba(40, 40, 40, 0.7) 0%, transparent 50%),
      radial-gradient(at 80% 80%, rgba(20, 20, 20, 0.5) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  }

  /* ==================================
     TRANSPARENT CARDS
     ================================== */
  /* Light Mode Card */
  .bg-transparent-card-light {
    background: rgba(255, 255, 255, 0.4) !important;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  .bg-transparent-card-light:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.7) !important;
    box-shadow: 0 10px 20px rgba(121, 85, 72, 0.1) !important;
  }

  /* Dark Mode Card */
  .bg-transparent-card-dark {
    background: rgba(30, 30, 30, 0.4) !important;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .bg-transparent-card-dark:hover {
    transform: translateY(-5px);
    background: rgba(45, 45, 45, 0.6) !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5) !important;
  }

  /* ==================================
     TYPOGRAPHY
     ================================== */
  .serif-font {
    font-family: "Playfair Display", serif !important;
  }
  .ls-2 {
    letter-spacing: 2px !important;
  }
  .transition-colors {
    transition: color 0.3s ease;
  }

  /* ==================================
     IMAGE STYLES
     ================================== */
  .border-image {
    border: 4px solid white;
  }
  .bg-texture-dark .border-image {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .sepia-filter {
    filter: sepia(0.2) contrast(1.1);
    transition: filter 0.3s ease;
  }
  .v-card:hover .sepia-filter {
    filter: sepia(0) contrast(1);
  }

  /* ==================================
     DIVIDERS
     ================================== */
  .vertical-divider {
    right: 0;
    top: 10%;
    height: 80%;
    width: 1px;
  }
</style>
