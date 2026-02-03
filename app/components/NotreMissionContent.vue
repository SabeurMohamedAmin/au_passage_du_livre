<script setup lang="ts">

  interface Mission {
    id: number
    title: string
    description: string
    card: {
      title: string
      text: string
      image: string
      slug: string
      button: {
        label: string
        color: string
      }
    }
  }

  // Data: In a real Nuxt app, this might come from `useAsyncData` or a CMS composable
  const missions: Mission[] = [
    {
      id: 1,
      title: 'Génération Créative',
      description: 'Nous connectons la jeunesse aux acteurs du livre à travers des expériences concrètes qui rendent la littérature vivante et accessible.',
      card: {
        title: "Éveiller l'Imaginaire",
        text: 'Créer des rencontres et des expériences sensibles pour ouvrir les jeunes à la littérature, stimuler leur créativité et encourager leur regard sur le monde.',
        image: '/img/avatars/Fiona Homann design_graphic.jpg',
        slug: 'notre-mission',
        button: { 
          label: 'En savoir plus',
          color: '#D97736'
        },
      }
    },
    {
      id: 2,
      title: 'Rencontres & Dialogue',
      description: 'Créer des moments d’échange entre les auteurs, les artistes et le public, pour favoriser le dialogue, la transmission et la découverte des œuvres et des parcours créatifs.',
      card: {
        title: 'Rencontres avec des auteurs',
        text: 'Des temps privilégiés pour échanger avec des auteurs et des illustrateurs, découvrir leur univers, leurs inspirations et mieux comprendre les processus de création.',
        slug: 'rencontres-dialogue',
        button: { label: 'En savoir plus', color: '#4E8098' },
        image: '/img/avatars/pat thiebaut author.jpeg'
      }
    },
    {
      id: 3,
      title: 'Création & Illustration',
      description: 'Mettre en lumière les arts visuels et narratifs à travers des expositions, des rencontres et des temps de création.',
      card: {
        title: 'Illustration & arts visuels',
        text: 'Découvrir le travail des illustrateurs et artistes visuels, explorer les liens entre image et récit et valoriser la création graphique contemporaine.',
        image: '/img/avatars/Taga Mely photogaphe.jpeg',
        slug: 'notre-mission',
        button: { 
          label: 'En savoir plus',
          color: '#D97736'
        },
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
  <section class="mission-section pb-10 d-flex align-center ">
    <!-- BACKGROUND & CONTAINER -->
    <v-container class="pa-0">
      <v-row align="stretch" class=" bg-light rounded-xl pa-1">
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
        <v-spacer/>
        <!-- RIGHT COLUMN -->
        <v-col
          cols="12" md="6" lg="6"
          @mouseenter="pauseTimer"
          @mouseleave="startTimer"
        >
          <v-fade-transition mode="out-in">
            <v-card
              :key="activeMission?.id"
              class="border-xl feature-card rounded-xl pa-6 pa-md-8"
              elevation="4"
              border
            >
              <v-row align="center" no-gutters>
                <v-col cols="12" sm="7" class="pr-sm-4 d-flex flex-column align-start">
                  <h3 class="text-clamp-2 text-h5 text-lg-h4 font-weight-bold text-dynamicText mb-4">
                    {{ activeMission?.card.title }}
                  </h3>
                  <p class="card-text-clamp text-body-1 text-dynamicText mb-6 card-text-min-height">
                    {{ activeMission?.card.text }}
                  </p>
                  
                  <!-- NUXT FEATURE: Fixed Button Nesting -->
                  <v-btn 
                    :to="$localePath({name:'mission-details', params:{ slug: activeMission?.card.slug } })"
                    class="px-5 mb-6 text-none font-weight-bold feature-link"
                    rounded="xl"
                    variant="outlined"
                    color="primary"
                  >
                    {{ activeMission?.card.button.label }}
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
    <div
      class="position-absolute bottom-0 left-0 right-0 d-flex justify-center py-6"
    >
      <button
        v-for="(mission, index) in missions"
        :key="mission.id"
        @click="setMission(index)"
        class="mx-1 mission-dot"
        :class="{ active: index === activeIndex }"
        :aria-label="'Voir mission ' + (index + 1)"
      />
    </div>
  </section>
</template>

<style scoped>
/* --------------------------------------------------------------------------
  TEXT
  -------------------------------------------------------------------------- */
.description-text {
  line-height: 1.6;
  max-width: 520px;
}
.text-clamp-2 {
  display: -webkit-box;        /* REQUIRED */
  -webkit-box-orient: vertical;/* REQUIRED */
  line-clamp: 2;               /* number of lines */
  -webkit-line-clamp: 2;       /* number of lines */
  overflow: hidden;            /* REQUIRED */
}
/* Clamp card text to 3 lines */
.card-text-clamp {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  min-height: calc(1.5em * 4);
  position: relative;
}

/* --------------------------------------------------------------------------
  CARD
  -------------------------------------------------------------------------- */
.feature-card {
  height: 320px;
}

@media (max-width: 960px) {
  .feature-card {
    height: auto;
  }
}

.transform-rotate {
  transform: rotate(3deg);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s ease;
}

.feature-card:hover .transform-rotate {
  transform: rotate(0deg) scale(1.05);
}

/* --------------------------------------------------------------------------
  DOTS
  -------------------------------------------------------------------------- */
.mission-dots {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.mission-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(121, 85, 72, 0.3);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mission-dot.active {
  background-color: #5d4037;
  border-color: #5d4037;
  transform: scale(1.2);
}

/* --------------------------------------------------------------------------
  BACKGROUND
  -------------------------------------------------------------------------- */
.bg-light {
  background-color: #8a8a8a08;
}
</style>
