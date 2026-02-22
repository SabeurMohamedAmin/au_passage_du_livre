<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  definePageMeta({
    name: 'guest-profile'
  })

  interface RelatedEvent {
    id: number
    title: string
    image: string
    link: string
  }

  const { mdAndUp } = useDisplay();

  // Assuming these composables exist in your project
  const { guests } = useGuests();
  const { slug }  = useRoute().params;

  // useFetch uses top-level await by default in Nuxt setup
  const { data: author, error } = await useFetch(`/api/guest-profile`, {
    params:{
      slug: slug
    }
  });
  watchEffect(()=>{
    if(error.value){
      throw createError({
        statusCode: 404,
        statusMessage: 'Guest not found!!',
      });
    }
  })
  
  const relatedEvents = ref<RelatedEvent[]>([
    { id: 1, title: 'Atelier d\'écriture : Le Polar', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop', link: '#' },
    { id: 2, title: 'Conférence : L\'histoire du papier', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1000&auto=format&fit=crop', link: '#' }
  ]);
</script>

<template>
  <v-container class="py-12">
    <v-row v-if="author">
      <v-col cols="12" sm="5" md="4" lg="3" class="position-relative mb-8 mb-sm-0">
        <div class="image-container mx-auto mx-sm-0">
          <div class="offset-bg rounded-lg">
          </div>
          
          <v-card class="image-card rounded-lg elevation-4 hover-lift" color="white">
            <v-img 
              :src="author.image" 
              aspect-ratio="0.75" 
              cover
              class="bg-grey-lighten-2"
            >
              <v-chip 
                label
                color="error"
                class="position-absolute top-0 left-0 ma-2 font-weight-bold text-uppercase elevation-2"
                size="small"
              >
                Invité
              </v-chip>
            </v-img>
          </v-card>
        </div>
        </v-col>

      <v-col cols="12" sm="7" md="8" lg="9" class="pl-sm-8 pl-md-12">
        <div class="d-flex justify-space-between align-start mb-1">
          <span class="text-caption font-weight-bold text-uppercase text-grey-darken-1 tracking-wide">
            Auteur / Intervenant
          </span>
          <div class="d-flex gap-2">
            <ShareNav :title="author.name" />
          </div>
        </div>

        <h1 class="text-h5 text-md-h3 font-weight-black text-uppercase mb-2 text-grey-darken-2 line-height-tight">
          {{ author.name }}
        </h1>

        <div class="text-body-1 mb-6 d-flex align-center flex-wrap">
            <span class="text-decoration-underline cursor-pointer font-weight-bold text-primary">
                {{ author.role }}
            </span>
            <span class="text-grey-lighten-1 mx-3">
              |
            </span>
            <span class="text-grey-darken-1 font-italic">
              Invité d'Honneur
            </span>
        </div>

        <p class="text-body-1 text-grey-darken-2 mb-6 font-weight-regular" style="max-width: 800px; line-height: 1.7;">
          {{ author.bio }}
        </p>

        <div class="d-flex align-center mb-8 bg-green-lighten-5 d-inline-flex px-3 py-1 rounded-pill border-thin border-success">
            <v-icon
              icon="mdi-check-circle" color="success"
              size="small" class="me-2"
            />
            <span class="font-weight-bold text-caption text-success">
              Présence confirmée
            </span>
        </div>

        <v-card 
          flat
          class="pa-5 mb-10 border-s-xl border-warning"
          
        >
          <div class="d-flex flex-wrap align-center justify-space-between gap-4">
            <div>
              <div class="text-caption font-weight-bold text-uppercase text-amber-darken-4 mb-1">
                <v-icon icon="mdi-calendar-star" size="small" start />
                Prochain Événement
              </div>
              <div class="font-weight-bold text-h6 text-grey-darken-1 py-2">
                {{ author.details.title }}
              </div>
            </div>

            <!-- TODO: Add link to PROCHAINE event -->
            <v-btn 
              flat 
              color="#f6d7a8" 
              class="text-black font-weight-bold px-6"
              rounded="lg"
              elevation="0"
              :to="$localePath('/evenements')"
            >
              Plus d'infos
              <v-icon end icon="mdi-arrow-right"/>
            </v-btn>
          </div>
        </v-card>

        <div>
          <div class="d-flex mb-0">
            <div class="px-8 text-grey-darken-4 py-2 font-weight-bold text-body-2 rounded-t-lg elevation-1" style="z-index: 1; background-color: #f6d7a8;">
              DÉTAILS
            </div>
          </div>
          <div class="border-b-md mb-6" style="border-color: #f6d7a8 !important;"></div>

          <v-row dense class="text-body-2 row-hover-effect">
            <v-col cols="4" sm="3" md="2" class="font-weight-bold text-grey-darken-3 pt-2">
              Type
            </v-col>
            <v-col cols="8" sm="9" md="10" class="pt-2 text-grey-darken-2">
              Rencontre / Dédicace
            </v-col>
            <v-col cols="12">
              <v-divider class="my-3 border-dashed opacity-40"/>
            </v-col>                
            <v-col cols="4" sm="3" md="2" class="font-weight-bold text-grey-darken-3">
              Date
            </v-col>
            <v-col cols="8" sm="9" md="10" class="text-grey-darken-2">
              <v-icon icon="mdi-calendar-blank" size="x-small" class="me-1 mb-1"/>
              {{ author.details.date }} à {{ author.details.time }}
            </v-col>
            <v-col cols="12">
              <v-divider class="my-3 border-dashed opacity-40"/>
            </v-col>                
            <v-col cols="4" sm="3" md="2" class="font-weight-bold text-grey-darken-3">
              Lieu
            </v-col>
            <v-col cols="8" sm="9" md="10" class="text-grey-darken-2">
              <nuxt-link 
                class="text-decoration-none "
                rel="noopener noreferrer" 
                to="https://maps.app.goo.gl/DhSrMBgyJEEUiGdeA" 
                target="_blank"
              >
                <v-icon icon="mdi-map-marker-outline" size="small" class="me-1 mb-1"/>
                {{ author.details.location }}
                <v-icon icon="mdi-map" size="small" class="me-1 mb-1  line-height-tight"/>
              </nuxt-link>
            </v-col>
            <v-col cols="12">
              <v-divider class="my-3 border-dashed opacity-40"/>
            </v-col>       
            <v-col cols="4" sm="3" md="2" class="font-weight-bold text-grey-darken-3">
              Sujet
            </v-col>
            <v-col cols="8" sm="9" md="10" class="text-grey-darken-2">
              {{ author.details.description }}
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular
          indeterminate
          color="amber"
          size="64"
        />
      </v-col>
    </v-row>

    <v-divider class="my-16"/>
    
    <v-row>
        <v-col cols="12" class="mb-4">
            <h3 class="text-h5 font-weight-black text-uppercase text-grey-darken-3">
              Dans la même collection
            </h3>
            <div class="border-b-sm border-amber" style="width: 60px; height: 4px; background: #f6d7a8;">
            </div>
        </v-col>
        <v-col v-for="event in relatedEvents" :key="event.id" cols="12" sm="6" md="4">
            <v-card flat border class="d-flex align-center pa-3 rounded-lg hover-card cursor-pointer transition-swing">
              <v-avatar rounded size="80" class="me-4 elevation-1">
                <v-img :src="event.image" cover />
              </v-avatar>
              <div>
                <div class="text-subtitle-2 font-weight-bold line-clamp-2 text-grey-darken-3">
                  {{ event.title }}
                </div>
                <div class="text-caption text-primary mt-1 font-weight-bold">
                  Voir la fiche
                  <v-icon icon="mdi-chevron-right" size="x-small"/>
                </div>
              </div>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .image-container {
    position: sticky;
    max-width: 360px; 
    top: 72px;
    z-index: 1;
  }

  .offset-bg {
    position: absolute;
    top: 20px;    
    left: -20px;  
    width: 100%;   
    height: 100%;  
    background-color: #f6d7a8; 
    transition: transform 0.3s ease;
    z-index: -1;
  }

  .image-card {
    border: 1px solid rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
  }

  .hover-lift:hover + .offset-bg, 
  .image-container:hover .offset-bg {
    transform: translate(-5px, 5px);
  }

  .line-height-tight {
    line-height: 1.1 !important;
  }

  .tracking-wide {
    letter-spacing: 0.05em;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .hover-card {
    transition: all 0.2s ease;
  }

  .hover-card:hover {
    border-color: #DE8642 !important;
    background-color: #f6d7a8;
    transform: translateX(5px);
  }

  @media (max-width: 600px) {
    .offset-bg {
      left: -10px;
      top: 10px;
      width: 100%; 
    }
  }
</style>