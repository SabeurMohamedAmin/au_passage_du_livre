<script setup lang="ts">

  interface Mission {
    id: number
    title: string
    description: string
    slug: string
    button: {
      label: string
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
      slug: 'notre-mission',
      button: { 
        label: 'En savoir plus',
        color: '#D97736'
      },
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
      slug: 'education-jeunesse',
      button: { label: 'Nos programmes', color: '#4E8098' },
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
      slug: 'patrimoine-vivant',
      button: { label: 'Explorer l’histoire', color: '#8A5A44' },
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
  <section class="mission-section position-relative pb-10 d-flex align-center">
    <!-- BACKGROUND & CONTAINER -->
    <v-container>
      <v-row align="stretch" justify="space-between">
        <!-- LEFT COLUMN -->
        <v-col cols="12" md="5" lg="5">
          <v-fade-transition mode="out-in">
            <div :key="activeMission?.id">
              <h1 class="d-flex flex-column text-dynamicText gap-4 text-h5 text-transparent-3 lh-1 mb-2">
                {{ activeMission?.title }}
              </h1>
              <p class="text-h6 text-dynamicText font-weight-regular description-text">
                {{ activeMission?.description }}
              </p>
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
              :key="activeMission?.id"
              class="border-xl feature-card rounded-xl pa-6 pa-md-8 mb-5"
              elevation="4"
              border
            >
              <v-row align="center" no-gutters>
                <v-col cols="12" sm="7" class="pr-sm-4">
                  <h3 class="text-h4 font-weight-bold text-dynamicText mb-4">
                    {{ activeMission?.card.title }}
                  </h3>
                  <p class="text-body-1 text-dynamicText mb-6 card-text-min-height">
                    {{ activeMission?.card.text }}
                  </p>
                  
                  <!-- NUXT FEATURE: Fixed Button Nesting -->
                  <v-btn 
                    :to="$localePath({name:'mission-details', params:{ slug: activeMission?.slug } })"
                    class="px-5 mb-6 text-none font-weight-bold feature-link"
                    rounded="xl"
                    variant="outlined"
                    color="primary"
                  >
                    {{ activeMission?.card.cta }}
                    <v-icon icon="mdi-arrow-right" class="ms-2" size="small" />
                  </v-btn>
                </v-col>

                <v-col cols="12" sm="5" class="d-flex justify-end mt-4 mt-sm-0">
                  <v-img
                    :src="activeMission?.card.image"
                    :alt="activeMission?.card.title"
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
    </v-container>
    
    <!-- NAVIGATION DOTS -->
    <div class="position-absolute bottom-0 w-100 d-flex justify-center py-6">
      <button
        v-for="(mission, index) in missions"
        :key="mission.id"
        @click="setMission(index)"
        class="mx-1 mission-dot"
        :class="{ 'active': index === activeIndex }"
        :aria-label="'Voir mission ' + (index + 1)"
      ></button>
    </div>
  </section>
</template>

<style scoped>
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


  .mission-dot {
    width: 12px;
    height: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(121, 85, 72, 0.3);
    background-color: transparent;
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
