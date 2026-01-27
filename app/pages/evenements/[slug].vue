<script setup lang="ts">
import { useEventSchedule } from '@/composables/useEventSchedule'

const { scheduleDays, features } = useEventSchedule()

// Filter unique guests from all days
const uniqueGuests = computed(() => {
  const map = new Map()
  scheduleDays.value.forEach(day =>
    day.schedules.forEach(s =>
      s.guests.forEach(g => map.set(g.id, g))
    )
  )
  return Array.from(map.values())
})

// Mock data for the Archive section
const archives = [
  { title: 'Affiche Officielle 2026', src: '/img/home/affiche-officielle-2026.jpg', flex: 6 },
  { title: 'Plan du Salon', src: '/img/home/plan-du-salon.jpg', flex: 6 },
  { title: 'Brochure Programme PDF', src: 'https://picsum.photos/400/300', flex: 4 },
  { title: 'Revue de Presse', src: 'https://picsum.photos/400/500', flex: 8 },
]
</script>

<template>    
  <section class="hero-section">
    <v-img
      src="/img/home/diffrents-directions.png"
      gradient="to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%"
      class="align-end"
      height="70vh"
      cover
    >
      <v-container>
        <div class="mb-10">
          <h1 class="text-h2 text-md-h1 font-weight-black serif mb-2">Rencontres & Ateliers</h1>
          <p class="text-h5 font-weight-light mb-6">Livre, illustration et création en Alsace</p>
          
          <div class="d-flex flex-wrap ga-6 text-subtitle-1">
            <span class="d-flex align-center"><v-icon start>mdi-map-marker</v-icon> Strasbourg</span>
            <span class="d-flex align-center"><v-icon start>mdi-calendar</v-icon> 4 → 13 septembre 2026</span>
            <span class="d-flex align-center"><v-icon start>mdi-ticket-confirmation</v-icon> Entrée libre</span>
          </div>
        </div>
      </v-container>
    </v-img>
  </section>

  <v-container>
    <section class="py-16">
      <v-row juseify="space-between">
        <v-col cols="12" md="7">
          <h2 class="text-h4 serif mb-6">À propos de l’événement</h2>
          <div class="text-body-1 text-justify editorial-text">
            <p class="mb-4">
              Au Passage du Livre est une invitation à ralentir et à s'immerger dans l'univers de la création littéraire. 
              Né d'une volonté de partager la richesse du patrimoine écrit alsacien, cet événement transforme 
              Strasbourg en un carrefour vivant pour les auteurs et leurs lecteurs.
            </p>
            <p>
              Plus qu'un simple salon, c'est un espace de dialogue où l'illustration rencontre la narration. 
              Nous croyons en la culture accessible, d'où notre engagement pour une entrée libre et des ateliers 
              ouverts à tous, des plus jeunes curieux aux bibliophiles avertis.
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="4" offset-md="1">
          <div class="logistic-info pt-md-12">
            <div class="mb-4">
              <div class="text-caption text-uppercase font-weight-bold text-grey">Organisé par</div>
              <div class="text-body-1">Au Passage du Livre</div>
            </div>
            <div class="mb-4">
              <div class="text-caption text-uppercase font-weight-bold text-grey">Lieu</div>
              <div class="text-body-1">Parc des Expositions, Strasbourg</div>
            </div>
            <div class="mb-4">
              <div class="text-caption text-uppercase font-weight-bold text-grey">Horaires</div>
              <div class="text-body-1">Tous les jours : 10h – 20h</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-16"></v-divider>

    <section class="mb-16">
      <h2 class="text-h4 serif mb-8">Au programme du salon</h2>
      <v-row>
        <v-col v-for="feat in features" :key="feat.title" cols="12" sm="6" md="4">
          <h3 class="text-h6 font-weight-bold mb-2">
            • {{ feat.title }}
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            {{ feat.description }}
          </p>
        </v-col>
      </v-row>
    </section>

    <section class="mb-16">
      <h2 class="text-h3 serif mb-12 text-center">
        Programme détaillé
      </h2>
      
      <div v-for="day in scheduleDays" :key="day.day" class="mb-16">
        <div class="d-flex align-center mb-8">
          <div class="text-h4 font-weight-black mr-4">
            {{ day.day }}
          </div>
          <div>
            <div class="text-h6 text-uppercase font-weight-bold">
              {{ day.month }} {{ day.year }}
            </div>
            <div class="text-subtitle-2">
              Journée {{ day.title }}
            </div>
          </div>
          <v-divider class="ml-6"></v-divider>
        </div>

        <v-row
          v-for="(item, idx) in day.schedules"
          :key="idx" class="mb-8 border-bottom-soft pb-6"
        >
          <v-col cols="12" md="2" class="text-md-right">
            <span class="text-h6 font-weight-bold">
              {{ item.startTime }}
            </span>
            <div class="text-caption text-grey">
              {{ item.startPeriod }}
            </div>
          </v-col>
          <v-col cols="12" md="7">
            <h4 class="text-h5 font-weight-bold mb-2">
              {{ item.title }}
            </h4>
            <p class="text-body-2 text-medium-emphasis mb-4">
              {{ item.description }}
            </p>
            <div class="text-caption text-primary">
              📍 {{ item.location }}
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="d-flex ga-2 flex-wrap">
              <v-avatar v-for="g in item.guests" :key="g.id" size="36" class="border">
                <v-img :src="g.image"/>
                <v-tooltip activator="parent" location="top">
                  {{ g.name }}
                </v-tooltip>
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <section class="mb-16 py-12 bg-white rounded-lg px-6 border">
      <h2 class="text-h4 serif mb-10">
        Les Intervenants
      </h2>
      <v-row>
        <v-col
          v-for="guest in uniqueGuests"
          :key="guest.id" cols="6" sm="4" md="2" 
          class="text-center mb-6"
        >
          <v-avatar size="100" class="mb-3 grayscale-hover">
            <v-img :src="guest.image" cover/>
          </v-avatar>
          <div class="text-subtitle-2 font-weight-bold">
            {{ guest.name }}
          </div>
          <div class="text-caption text-grey">
            {{ guest.role }}
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="mb-16">
      <h2 class="text-h4 serif mb-8">
        Documents & archives
      </h2>
      <v-row class="masonry-grid">
        <v-col
          v-for="doc in archives"
          :key="doc.title" :cols="doc.flex"
        >
          <v-card flat border rounded="lg">
            <v-img :src="doc.src" cover height="250"/>
            <v-card-subtitle class="py-3">
              {{ doc.title }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-16"/>
    <section class="pb-16">
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="text-h5 serif mb-4">
            Accès & Transport
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            Tram B - Arrêt Wacken<br>
            Parking P+R disponible à proximité.<br>
            Accessible PMR.
          </p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h5 serif mb-4">
            Contact
          </h3>
          <p class="text-body-2 text-medium-emphasis">
            Pour toute question : contact@aupassagedulivre.fr<br>
            Presse : presse@aupassagedulivre.fr
          </p>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="text-h5 serif mb-4">
            Partenaires
          </h3>
          <div class="d-flex ga-4 flex-wrap grayscale">
            <div
              v-for="num in 4" 
              :key="num" 
              class="rounded px-4 py-2 text-caption"
            >
              LOGO
            </div>
          </div>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Libre+Baskerville&display=swap');

  .serif {
    font-family: 'Playfair Display', serif;
  }

  .editorial-text {
    font-family: 'Libre Baskerville', serif;
    line-height: 1.8;
    color: #2c2c2c;
  }

  .border-bottom-soft {
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .grayscale-hover {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }
  .grayscale-hover:hover {
    filter: grayscale(0%);
  }

  .grayscale {
    filter: grayscale(100%);
    opacity: 0.6;
  }

  .logistic-info {
    border-left: 1px solid #e0e0e0;
    padding-left: 24px;
  }

  @media (max-width: 960px) {
    .logistic-info {
      border-left: none;
      padding-left: 0;
      border-top: 1px solid #e0e0e0;
      padding-top: 24px;
    }
  }
</style>  