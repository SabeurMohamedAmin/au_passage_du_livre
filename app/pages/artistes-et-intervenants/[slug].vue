<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

definePageMeta({
  name: 'guest-profile'
})

/* ==========================================================================
   1. TYPES & INTERFACES
   ========================================================================== */
interface EventDetails {
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  description: string
  longDescription: string
  image: string
}

interface Author {
  name: string
  role: string
  bio: string
  image: string
}

interface RelatedEvent {
  id: number
  title: string
  image: string
  link: string
}

/* ==========================================================================
   2. DATA (MOCKED CONTENT)
   ========================================================================== */
const { mdAndUp } = useDisplay()

const event = ref<EventDetails>({
  title: 'Rencontre littéraire avec Sarah Chen',
  subtitle: 'Une immersion dans la science-fiction moderne',
  date: '25 Octobre 2024',
  time: '18h00',
  location: 'Bibliothèque de Strasbourg',
  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop', // Woman writing/reading vibe
  description: `L'association "Au Passage du Livre" est fière d'accueillir l'auteure de renom Sarah Chen pour une soirée exclusive. Venez découvrir les coulisses de son dernier roman et échanger sur l'avenir de la littérature de science-fiction en Alsace.`,
  longDescription: `Cette rencontre s'inscrit dans notre cycle de conférences 2024. Nous aborderons les thèmes de l'intelligence artificielle dans la fiction, la construction des mondes utopiques, et le processus créatif de l'écrivain. Une séance de dédicace suivra la conférence.`
})

const author = ref<Author>({
  name: 'Sarah Chen',
  role: 'Romancière & Scénariste',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop', // Portrait
  bio: `Sarah Chen est une figure montante de la littérature spéculative. Après des études d'histoire à Strasbourg, elle se lance dans l'écriture avec son premier succès "Les Chroniques de l'Aube". Son style unique mêle précision historique et imagination débordante.`
})

const relatedEvents = ref<RelatedEvent[]>([
  { id: 1, title: 'Atelier d\'écriture : Le Polar', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop', link: '#' },
  { id: 2, title: 'Conférence : L\'histoire du papier', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1000&auto=format&fit=crop', link: '#' }
])

const newsletterEmail = ref('')

/* ==========================================================================
   3. STYLES HELPER
   ========================================================================== */
// Matches the "Terra Cotta" orange from your image
const brandColor = '#DE8642' 
</script>

<template>
  <div class="artiste-details-page bg-surface-variant-light">
    
    <v-img
      :src="event.image"
      cover
      height="550"
      class="align-center position-relative"
    >
      <div class="hero-overlay"></div>

      <v-container class="position-relative z-10">
        <v-row>
          <v-col cols="12" md="8" lg="7">
            <h1 class="text-h3 text-md-h2 font-serif font-weight-bold text-white mb-2">
              {{ event.title }}
            </h1>
            <p class="text-h6 text-white opacity-90 font-weight-regular mb-6">
              {{ event.subtitle }}
            </p>

            <div class="d-flex flex-wrap align-center gap-4 text-white mb-8">
              <div class="d-flex align-center mr-6">
                <v-icon icon="mdi-calendar-range" class="mr-2" color="orange-lighten-2"/>
                <span class="text-body-1">{{ event.date }}</span>
              </div>
              <div class="d-flex align-center mr-6">
                <v-icon icon="mdi-clock-outline" class="mr-2" color="orange-lighten-2"/>
                <span class="text-body-1">{{ event.time }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon icon="mdi-map-marker-outline" class="mr-2" color="orange-lighten-2"/>
                <span class="text-body-1">{{ event.location }}</span>
              </div>
            </div>

            <v-btn
              :color="brandColor"
              size="x-large"
              rounded="pill"
              class="text-white text-none px-8 font-weight-bold elevation-4"
              append-icon="mdi-arrow-right"
            >
              S'inscrire
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <v-container class="py-12 py-md-16">
      <v-row>
        
        <v-col cols="12" md="8" lg="8" class="pr-md-8">
          
          <section class="mb-12">
            <h2 class="text-h4 font-serif font-weight-bold text-brown-darken-4 mb-6">
              À propos de l'événement
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-4 line-height-relaxed">
              {{ event.description }}
            </p>
            <p class="text-body-1 text-medium-emphasis line-height-relaxed">
              {{ event.longDescription }}
            </p>
          </section>

          <v-divider class="mb-12 opacity-20"></v-divider>

          <section class="mb-12">
            <h2 class="text-h4 font-serif font-weight-bold text-brown-darken-4 mb-8">
              L'Auteure : {{ author.name }}
            </h2>
            
            <v-card flat class="bg-transparent">
              <v-row>
                <v-col cols="12" sm="5">
                  <v-img
                    :src="author.image"
                    cover
                    aspect-ratio="1"
                    class="rounded-xl elevation-3"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="7" class="pl-sm-6 d-flex flex-column justify-center">
                  <h3 class="text-h5 font-weight-bold text-brown-darken-3 mb-2">
                    {{ author.name }}
                  </h3>
                  <div class="text-caption text-uppercase font-weight-bold text-orange-darken-2 mb-4">
                    {{ author.role }}
                  </div>
                  <p class="text-body-1 text-medium-emphasis">
                    {{ author.bio }}
                  </p>
                </v-col>
              </v-row>
            </v-card>
          </section>

          <section>
            <h2 class="text-h4 font-serif font-weight-bold text-brown-darken-4 mb-6">
              Informations pratiques
            </h2>
            <v-list lines="two" class="bg-transparent px-0">
              <v-list-item class="px-0 mb-2">
                <template v-slot:prepend>
                  <v-avatar color="orange-lighten-5" rounded="lg">
                    <v-icon color="orange-darken-3">mdi-calendar</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-brown-darken-4">Date</v-list-item-title>
                <v-list-item-subtitle class="text-body-1 opacity-100">{{ event.date }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="px-0 mb-2">
                <template v-slot:prepend>
                  <v-avatar color="orange-lighten-5" rounded="lg">
                    <v-icon color="orange-darken-3">mdi-clock-outline</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-brown-darken-4">Heure</v-list-item-title>
                <v-list-item-subtitle class="text-body-1 opacity-100">{{ event.time }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="px-0">
                <template v-slot:prepend>
                  <v-avatar color="orange-lighten-5" rounded="lg">
                    <v-icon color="orange-darken-3">mdi-map-marker</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold text-brown-darken-4">Lieu</v-list-item-title>
                <v-list-item-subtitle class="text-body-1 opacity-100">{{ event.location }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
           </section>
        </v-col>

        <v-col cols="12" md="4" lg="4">
          
          <div class="mb-10">
            <h3 class="text-h5 font-serif font-weight-bold text-brown-darken-4 mb-6">
              Autres événements
            </h3>
            
            <v-card 
              v-for="relEvent in relatedEvents" 
              :key="relEvent.id"
              class="mb-4 rounded-xl border cursor-pointer hover-card"
              flat
              elevation="0"
            >
              <v-img :src="relEvent.image" height="140" cover gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.6)">
                <div class="d-flex flex-column fill-height justify-end p-4">
                  <div class="pa-4 text-white">
                    <div class="text-subtitle-1 font-weight-bold line-clamp-2">
                      {{ relEvent.title }}
                    </div>
                    <div class="d-flex align-center mt-1 text-caption">
                      <span>En savoir plus</span>
                      <v-icon size="small" class="ml-1">mdi-arrow-right</v-icon>
                    </div>
                  </div>
                </div>
              </v-img>
            </v-card>
          </div>

          <v-card class="bg-orange-lighten-5 rounded-xl pa-6 pa-lg-8" flat>
            <h3 class="text-h5 font-serif font-weight-bold text-brown-darken-4 mb-2">
              Newsletter
            </h3>
            <p class="text-body-2 text-brown-darken-1 mb-6">
              Nous vous invitons à participer et soutenir la culture en Alsace.
            </p>

            <v-text-field
              v-model="newsletterEmail"
              placeholder="Entrez votre email"
              variant="solo"
              density="comfortable"
              bg-color="surface"
              class="mb-4"
              hide-details
              rounded="lg"
            ></v-text-field>

            <v-btn
              :color="brandColor"
              block
              size="large"
              rounded="pill"
              class="text-white text-none font-weight-bold"
              elevation="2"
            >
              S'inscrire
            </v-btn>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
/* 1. Typography Overrides 
   Matching the specific "Book/Serif" feel of the image 
*/
.font-serif {
  font-family: "Playfair Display", "Merriweather", Georgia, serif !important;
}

/* 2. Background Colors 
   Soft beige background for the page body 
*/
.bg-surface-variant-light {
  background-color: #FDFBF7;
}

/* 3. Hero Overlay
   Creates a cinematic darkening effect for text readability
*/
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

/* 4. Text Helpers
   For comfortable reading on desktop 
*/
.line-height-relaxed {
  line-height: 1.8 !important;
}

.text-medium-emphasis {
  color: rgba(60, 40, 30, 0.8) !important;
}

.text-brown-darken-4 {
  color: #3e2723 !important;
}
</style>