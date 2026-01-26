<script setup lang="ts">
  import { useDisplay } from 'vuetify'
  /* ==========================================================================
    INTERFACES
    ========================================================================== */
  interface Guest {
    id: number
    name: string
    role: 'Auteur' | 'Artiste' | 'Conférencier' | 'Historien'
    specialty: string
    bio: string
    image: string
    featured: boolean
    socialLinks?: {
      website?: string
      twitter?: string
      instagram?: string
    }
  }


  interface FilterCategory {
    label: string
    value: 'all' | 'author' | 'artist' | 'speaker'
  }


  /* ==========================================================================
    CONTENT
    ========================================================================== */
  const pageContent = {
    header: {
      title: 'Artistes et Intervenants',
      subtitle:
        'Découvrez les talents qui feront vivre notre événement. Des auteurs renommés, des artistes passionnés et des intervenants inspirants vous attendent.'
    },
    stats: [
      { value: '50+', label: 'Invités' },
      { value: '15', label: 'Pays' },
      { value: '20+', label: 'Ateliers' }
    ]
  }


  const filterCategories: FilterCategory[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Auteurs', value: 'author' },
    { label: 'Artistes', value: 'artist' },
    { label: 'Conférenciers', value: 'speaker' }
  ]


  const guestsSeed: Guest[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Auteur',
      specialty: 'Science-Fiction',
      bio: 'Auteure primée de la trilogie « Cosmos Éternel », traduite en 25 langues.',
      image: 'https://i.pravatar.cc/300?u=a042581f4e29026024d',
      featured: true,
      socialLinks: { website: '#', twitter: '#' }
    },
    {
      id: 2,
      name: 'Marc Dubois',
      role: 'Historien',
      specialty: 'Histoire Européenne',
      bio: "Professeur et spécialiste de l'histoire contemporaine européenne.",
      image: 'https://i.pravatar.cc/300?u=a042581f4e29026704d',
      featured: true,
      socialLinks: { website: '#' }
    },
    {
      id: 3,
      name: 'Elena Silva',
      role: 'Auteur',
      specialty: 'Poésie',
      bio: 'Poétesse et lauréate du Prix International de Poésie 2024.',
      image: 'https://i.pravatar.cc/300?u=a04258114e29026302d',
      featured: true,
      socialLinks: { instagram: '#', website: '#' }
    },
    {
      id: 4,
      name: 'David Okafor',
      role: 'Conférencier',
      specialty: 'Journalisme',
      bio: "Journaliste d'investigation reconnu internationalement.",
      image: 'https://i.pravatar.cc/300?u=a04258114e29026708c',
      featured: false,
      socialLinks: { twitter: '#' }
    },
    {
      id: 5,
      name: 'Amélie Rousseau',
      role: 'Artiste',
      specialty: 'Illustration',
      bio: 'Illustratrice de livres jeunesse, créatrice de « Les Aventures de Léo ».',
      image: 'https://i.pravatar.cc/300?u=a042581f4e29026024e',
      featured: true,
      socialLinks: { instagram: '#', website: '#' }
    },
    {
      id: 6,
      name: 'Thomas Weber',
      role: 'Auteur',
      specialty: 'Thriller',
      bio: "Best-seller avec plus de 2 millions d'exemplaires vendus.",
      image: 'https://i.pravatar.cc/300?u=a042581f4e29026704e',
      featured: false,
      socialLinks: { website: '#' }
    },
    {
      id: 7,
      name: 'Fatima Al-Rashid',
      role: 'Conférencier',
      specialty: 'Littérature Mondiale',
      bio: "Critique littéraire et animatrice d'ateliers d'écriture créative.",
      image: 'https://i.pravatar.cc/300?u=a04258114e29026302e',
      featured: false,
      socialLinks: { twitter: '#' }
    },
    {
      id: 8,
      name: 'Luca Moretti',
      role: 'Artiste',
      specialty: 'Calligraphie',
      bio: "Maître calligraphe spécialisé dans l'art manuscrit médiéval.",
      image: 'https://i.pravatar.cc/300?u=a04258114e29026708e',
      featured: true,
      socialLinks: { instagram: '#' }
    }
  ]

  /* ==========================================================================
    STATE
    ========================================================================== */
  const guests = ref<Guest[]>(guestsSeed)
  const selectedFilter = ref<FilterCategory['value']>('all')
  const searchQuery = ref('')

  /* ==========================================================================
    DISPLAY
    ========================================================================== */
  const { xs, sm } = useDisplay()

  /* ==========================================================================
    COMPUTED
    ========================================================================== */
  const featuredGuests = computed(() => guests.value.filter(g => g.featured))

  const filteredGuests = computed(() => {
    let result = guests.value

    // category filter
    if (selectedFilter.value !== 'all') {
      const roleMap: Record<Exclude<FilterCategory['value'], 'all'>, Guest['role']> = {
        author: 'Auteur',
        artist: 'Artiste',
        speaker: 'Conférencier'
      }

      const mappedRole = roleMap[selectedFilter.value]
      result = result.filter(g => g.role === mappedRole)
    }

    // search filter
    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      result = result.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.specialty.toLowerCase().includes(q) ||
        g.bio.toLowerCase().includes(q)
      )
    }
    return result
  })

  const statsCols = computed(() => {
    if (xs.value) return { cols: 12, sm: 4, md: 2 }
    return { cols: 4, sm: 4, md: 2 }
  })

  const slideCardWidth = computed(() => {
    if (xs.value) return 240
    if (sm.value) return 260
    return 280
  })

  /* ==========================================================================
    HELPERS
    ========================================================================== */
  const getRoleColor = (role: Guest['role']): string => {
    const colorMap: Record<Guest['role'], string> = {
      Auteur: 'primary',
      Artiste: 'secondary',
      Conférencier: 'success',
      Historien: 'info'
    }
    return colorMap[role] || 'default'
  }

  const resetFilters = () => {
    selectedFilter.value = 'all'
    searchQuery.value = ''
  }
</script>


<template>
  <v-container class="py-6">
    <featured-guests-slider/>
  
    <!-- =============================================
         SECTION 4: ALL GUESTS GRID
    ============================================= -->
    <section id="all_guest">
    <!-- =============================================
         CARD SEARCH + FILTERS
    ============================================= -->
      <v-card class="rounded-xl border-thin mb-8" elevation="0">
        <v-card-text class="pa-4 pa-md-6">
          <v-row align="center" dense>
            <!-- Search Field -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                placeholder="Rechercher par nom, spécialité..."
                variant="outlined"
                density="comfortable"
                hide-details
                clearable
                rounded="lg"
              />
            </v-col>

            <!-- Filter based on categories -->
            <v-col cols="12" md="6">
              <div class="d-flex flex-wrap ga-2 justify-md-end">
                <v-chip
                  v-for="category in filterCategories"
                  :key="category.value"
                  :color="selectedFilter === category.value ? 'primary' : 'default'"
                  :variant="selectedFilter === category.value ? 'flat' : 'outlined'"
                  @click="selectedFilter = category.value"
                  class="cursor-pointer"
                  rounded="lg"
                >
                  {{ category.label }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- Title -->
      <div class="mb-6">
        <h2 class="text-h5 font-weight-bold mb-2">
          Tous les Invités
          <v-chip size="small" class="ms-4 rounded-lg">
            {{ filteredGuests.length }}
          </v-chip>
        </h2>
      </div>
      <!-- Introved Guest's notice -->
      <v-card
        v-if="filteredGuests.length === 0"
        class="rounded-xl text-center pa-12"
        elevation="0"
      >
        <v-icon size="64" color="grey-lighten-1" class="mb-4">
          mdi-account-search-outline
        </v-icon>
        <h3 class="text-h6 mb-2">Aucun invité trouvé</h3>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Essayez de modifier vos filtres ou votre recherche.
        </p>
        <v-btn color="primary" variant="outlined" @click="resetFilters">
          Réinitialiser
        </v-btn>
      </v-card>

      <v-row v-else dense>
        <v-col
          v-for="guest in filteredGuests"
          :key="guest.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="rounded-xl h-100 featured-card" elevation="1">
            <v-img
              :src="guest.image"
              height="220"
              cover
              gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%"
            >
              <div class="fill-height d-flex flex-column">
                <v-chip
                  :color="getRoleColor(guest.role)"
                  class="ma-2 align-self-start rounded-xl"
                  label
                >
                  {{ guest.role }}
                </v-chip>
                <div class="mt-auto pa-3 text-white">
                  <h4 class="text-subtitle-1 font-weight-bold mb-0">
                    {{ guest.name }}
                  </h4>
                  <p class="text-subtitle-2 text-primary">
                    {{ guest.specialty }}
                  </p>
                </div>
              </div>
            </v-img>
            <v-card-text class="pa-4 py-2">
              <p class="text-body-2 text-medium-emphasis line-clamp-3 mb-3 bio-3-lines">
                {{ guest.bio }}
              </p>

              <div v-if="guest.socialLinks" class="d-flex ga-2">
                <v-btn
                  v-if="guest.socialLinks.website"
                  icon="mdi-web"
                  rounded="lg"
                  size="small"
                  variant="tonal"
                  color="primary"
                />
                <v-btn
                  v-if="guest.socialLinks.twitter"
                  icon="mdi-twitter"
                  rounded="lg"
                  size="small"
                  variant="tonal"
                  color="info"
                />
                <v-btn
                  v-if="guest.socialLinks.instagram"
                  icon="mdi-instagram"
                  rounded="lg"
                  size="small"
                  variant="tonal"
                  color="pink"
                />
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <v-btn class="pa-4" variant="outlined" color="primary" size="small" block rounded="lg">
                En savoir plus
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- =============================================
         SECTION 5: CTA
    ============================================= -->
    <section class="mt-12">
      <v-card class="rounded-xl overflow-hidden" elevation="8">
        <v-card-text class="pa-8 pa-md-12 text-center">
          <v-icon size="48" class="mb-4">mdi-account-multiple-plus</v-icon>
          <h2 class="text-h5 text-md-h4 font-weight-bold mb-4">
            Vous êtes artiste ou intervenant ?
          </h2>
          <p class="text-body-1 mb-6 mx-auto" style="max-width: 600px;">
            Rejoignez notre événement et partagez votre passion avec notre communauté.
          </p>
          <nuxt-link :to="$localePath('/contactez-nous')" class="text-primary text-decoration-none opacity-70">
            <v-btn
              size="large"
              color="white"
              variant="flat"
              rounded="xl"
              prepend-icon="mdi-email-outline"
            >
              Proposer votre participation
            </v-btn>
          </nuxt-link>
        </v-card-text>
      </v-card>
    </section>
  </v-container>
</template>


<style scoped>
.cursor-pointer { cursor: pointer; }

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15) !important;
}
</style>


<style>
  /* 
    GLOBAL OVERRIDES FOR SLIDER POSITIONING 
    Note: This targets the Vuetify container slots for prev/next
  *//* --- BASE CONTAINER STYLES --- */
  #artists_slider .v-slide-group__prev,
  #artists_slider .v-slide-group__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 25;
    min-width: 48px;
    height: 48px;
    border-radius: 50%;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    
    /* Flex centering for the icon */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Position overrides */
  #artists_slider .v-slide-group__prev { left: 16px; }
  #artists_slider .v-slide-group__next { right: 16px; }

  /* --- LIGHT MODE (Default) --- */
  #artists_slider .v-slide-group__prev,
  #artists_slider .v-slide-group__next {
    background: rgba(255, 255, 255, 0.20);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    height: 60px;
    width: 30px;
    color: #1a1a1a;
  }

  #artists_slider .v-slide-group__prev:hover,
  #artists_slider .v-slide-group__next:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-50%) scale(1.1);
  }


  /* --- DARK MODE OVERRIDES --- */
  /* Target when inside a dark theme container */
  .v-theme--dark #artists_slider .v-slide-group__prev,
  .v-theme--dark #artists_slider .v-slide-group__next {
    background: rgba(30, 30, 30, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }

  .v-theme--dark #artists_slider .v-slide-group__prev:hover,
  .v-theme--dark #artists_slider .v-slide-group__next:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  /* --- DISABLED STATE (Hide at ends) --- */
  #artists_slider .v-slide-group__prev--disabled,
  #artists_slider .v-slide-group__next--disabled {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%) scale(0.8);
  }

/* Position Left Arrow */
#artists_slider .v-slide-group__prev {
  left: 5px;
}

/* Position Right Arrow */
#artists_slider .v-slide-group__next {
  right: 5px;
}

/* Hide disabled arrows completely if preferred */
.v-slide-group__prev--disabled,
.v-slide-group__next--disabled {
  opacity: 0;
  pointer-events: none;
}

.bio-3-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  /* IMPORTANT: reserve space for 3 lines */
  line-height: 1.5;
  min-height: calc(1.5em * 3);
}

.featured-card {
  outline: 2px solid transparent;
  transition: outline 0.2s ease-in-out;
}

.featured-card:hover {
  outline-color: rgb(var(--v-theme-primary));
}
</style>