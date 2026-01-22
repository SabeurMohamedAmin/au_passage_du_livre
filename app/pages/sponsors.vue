<script setup lang="ts">
import { ref } from 'vue'

interface Sponsor {
  id: number
  name: string
  description: string
  category: string
  address?: string
  website?: string
  // New field for images
  logoUrl: string 
  color: string
}

// Helper to generate modern placeholder images
const getPlaceholder = (text: string, color: string) => 
  `https://placehold.co/600x350/${color.replace('#', '')}/FFFFFF?text=${text}`

const sponsors = ref<Sponsor[]>([
    {
    id: 1,
    name: 'Foire Européenne',
    category: 'Event Partner',
    website:"https://www.foireurop.com",
    description: 'Parc Expo Strasbourg',
    address: ' 6 Rue de Soultzmatt, Strasbourg',
    logoUrl: './img/logos/sponsors/foire.png',
    color: '#455A64' // Blue Grey
  },
  {
    id: 2,
    name: 'Transports Chalot',
    category: 'Logistics',
    website: "https://www.chalot.fr/",
    description: 'France Location & Logistique',
    address: "7 Rue du Bass. de l'Industrie, Strasbourg",
    logoUrl: './img/logos/sponsors/chalot.png',
    color: '#C62828' // Red
  },
  {
    id: 3,
    name: 'Immo M',
    category: 'Real Estate',
    website:"https://www.immom.fr",
    description: 'Agence Immobilière FNAIM',
    address: ' 6 Rue de Soultzmatt, Strasbourg',
    logoUrl: './img/logos/sponsors/immo-m.png',
    color: '#EF6C00' // Orange
  },
  {
    id: 4,
    name: 'Muensterstuewel',
    category: 'Gastronomy',
    description: 'Cuisine Traditionnelle Alsacienne',
    website: 'https://muensterstuewel.fr',
    address: '8 Pl. du Marché-aux-Cochons-de-Lait, Strasbourg',
    logoUrl: './img/logos/sponsors/muensterstuewel.png',
    color: '#5D4037' // Brown
  },
  {
    id: 6,
    name: 'Hôtel Cathédrale',
    category: 'Hospitality',
    website:"https://www.hotel-cathedrale.fr",
    description: 'Chambre avec vue',
    address: '12- 13 Pl. de la Cathédrale, Strasbourg',
    logoUrl: './img/logos/sponsors/hotel-cathedrale.png',
    color: '#6A1B9A' // Purple
  },
  {
    id: 7,
    name: 'ASGE',
    category: 'Tech Partner',
    website:"https://www.geant-beaux-arts.fr/",
    description: 'Sonorisation Grand Est',
    address: "91 route des Romains, Strasbourg",
    logoUrl: './img/logos/sponsors/geant-des-beaux-arts.png',
    color: '#283593' // Indigo
  },
  {
    id: 8,
    name: 'Cafés Reck',
    category: 'Gastronomy',
    website:"https://www.reck.fr",
    description: 'Torréfacteur depuis 1884',
    address: '8 Rue de la Mésange, Strasbourg',
    logoUrl: './img/logos/sponsors/cafe-reck.png',
    color: '#3E2723' // Coffee
  },
  {
    id: 9,
    name: 'SONETMO',
    category: 'Services',
    description: 'Propreté & Services',
    website: "https://www.sonetmo.fr",
    address: '8 Rue Ettore Bugatti, Eckbolsheim',
    logoUrl: './img/logos/sponsors/sonetmo.png', // Example real URL structure
    color: '#1565C0' // Blue
  }
])
</script>

<template>
  <v-container class="py-6">
    <!-- Sharp Modern Header -->
    <div class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          Nos Sponsors
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg mx-auto">
        Soutiens essentiels du festival "Au Passage du Livre"
      </p>
    </div>

    <!-- Bento-style Grid -->
    <v-row >
      <v-col
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            flat
            rounded="0"
            variant="outlined"
            class="h-100 rounded-xl d-flex flex-column sponsor-card overflow-hidden border-opacity-50"
            :class="{ 'border-black elevation-0': isHovering }"
            :style="`border-color: ${isHovering ? sponsor.color : '#e0e0e0'} !important; transition: all 0.2s ease-out;`"
          >
            <!-- Image Area with Grayscale Effect -->
            <div class="position-relative" style="height: 200px; overflow: hidden;">
              <v-img
                :class="isHovering?'grayscale-0 scale-104':'grayscale-100'"
                class="transition-all image-sponsor"
                :src="sponsor.logoUrl"
                height="100%"
                width="100%"
                aspect-ratio="1/6"
                cover
              >
                <!-- Modern 'Glass' Category Tag -->
                <div class="d-flex justify-end pa-4">
                  <v-chip
                    rounded="0"
                    size="small"
                    variant="flat"
                    class="rounded-lg font-weight-bold text-uppercase tracking-wider backdrop-blur"
                    :color="isHovering ? 'white' : 'black'"
                    :class="isHovering ? 'text-black' : 'text-white'"
                  >
                    {{ sponsor.category }}
                  </v-chip>
                </div>
              </v-img>
            </div>

            <!-- Content Area -->
            <v-card-item class="pt-5 pb-2">
              <v-card-title class="text-h6 font-weight-bold text-uppercase mb-1">
                {{ sponsor.name }}
              </v-card-title>
              <v-card-subtitle class="text-body-2 opacity-70 mb-3">
                {{ sponsor.description }}
              </v-card-subtitle>
            </v-card-item>

            <v-spacer></v-spacer>

            <!-- Sharp Action Bar -->
            <v-card-actions class="px-4 pb-4">
              <v-row dense align="center" justify="space-between">
                <v-col cols="9">
                  <div v-if="sponsor.address" class="d-flex align-start text-caption opacity-60">
                    <v-icon icon="mdi-map-marker-outline" size="small" class="mr-1"/>
                      {{ sponsor.address }}
                  </div>
                </v-col>
                <v-col cols="2" class="text-end">
                  <v-btn
                    
                    v-if="sponsor.website"
                    :href="sponsor.website"
                    size="large"
                    target="_blank"
                    variant="outlined"
                    rounded="lg"
                    density="compact"
                    :color="isHovering ? sponsor.color : 'medium-emphasis'"
                    icon="mdi-arrow-top-right-thin"
                    text="viste website"
                  />
                </v-col>                
  
              </v-row>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- THANK YOU TO SPONSORS -->
    <section class="sponsors-thanks mt-16">
      <v-divider class="mb-6" />

      <p class="thanks-text">
        Nous remercions chaleureusement nos partenaires pour leur confiance et leur soutien.<br />
        Leur engagement rend possibles nos actions culturelles et littéraires.
      </p>
    </section>
  </v-container>
</template>

<style scoped>
/* Modern CSS Utility Classes */
.grayscale-100 {
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.grayscale-0 {
  filter: grayscale(0%);
}

.scale-104 {
  transform: scale(1.04);
}

.transition-all {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.tracking-wide {
  letter-spacing: 0.1em !important;
}

.tracking-wider {
  letter-spacing: 0.15em !important;
}

/* Glass effect for the chip */
.backdrop-blur {
  backdrop-filter: blur(4px);
  background-color: rgba(0,0,0,0.3) !important;
}
.sponsor-card{
  min-width: 280px;
}
.sponsors-thanks {
  text-align: center;
}

.thanks-text {
  max-width: 720px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.65);
}
</style>
