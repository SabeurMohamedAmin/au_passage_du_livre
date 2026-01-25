<script setup lang="ts">

  const features = [
    { 
      title: 'Rencontres', 
      subtitle: 'Échangez avec des auteurs', 
      cols: 12, md: 8, 
      color: 'primary', 
      img: '/img/hero-author.jpg' // Use your illustrator photo here
    },
    { 
      title: 'Prochain Event', 
      subtitle: '12-14 Sept. 2026', 
      cols: 12, md: 4, 
      color: 'secondary',
      variant: 'outlined'
    },
    { 
      title: 'Ateliers', 
      subtitle: 'Création & BD', 
      cols: 6, md: 4, 
      color: 'surface-light',
      img: '/img/workshop.jpg' 
    },
    { 
      title: 'Bénévolat', 
      subtitle: 'Rejoignez l\'équipe', 
      cols: 6, md: 4, 
      color: 'info',
      icon: 'mdi-account-group'
    },
    { 
      title: 'Dédicaces', 
      subtitle: 'Moments uniques', 
      cols: 12, md: 4, 
      color: 'surface-variant',
      img: '/img/signing.jpg'
    },
  ]
</script>

<template>
  <v-container class="py-16">
    <!-- Header with "Literary" Serif Font -->
    <div class="text-center mb-12">
      <h1 class="text-h2 text-md-h1 font-weight-black mb-2 font-serif text-white">
        Cultiver l'Imaginaire
      </h1>
      <p class="text-h6 text-medium-emphasis font-weight-light">
        Événements culturels • Soutien aux artistes • Transmission
      </p>
      
      <div class="d-flex justify-center gap-4 mt-6">
        <v-btn size="x-large" color="primary" rounded="pill" elevation="4">
          Voir l'agenda
        </v-btn>
        <v-btn size="x-large" variant="outlined" rounded="pill" class="text-white">
          L'association
        </v-btn>
      </div>
    </div>

    <!-- Modern Bento Grid -->
    <v-row dense>
      <v-col
        v-for="(feat, i) in features"
        :key="i"
        :cols="feat.cols"
        :md="feat.md"
      >
        <v-card
          height="100%"
          min-height="240"
          :color="feat.color"
          :variant="feat.variant || 'elevated'"
          class="bento-card rounded-xl d-flex flex-column justify-end overflow-hidden position-relative"
          link
        >
          <!-- Background Image with Gradient Overlay -->
          <v-img
            v-if="feat.img"
            :src="feat.img"
            cover
            class="position-absolute w-100 h-100 top-0 left-0"
            gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%"
          />
          
          <!-- Content -->
          <div class="position-relative pa-6 z-10">
            <v-icon v-if="feat.icon" size="large" class="mb-3">{{ feat.icon }}</v-icon>
            <div class="text-overline mb-0 opacity-80 text-white">{{ feat.subtitle }}</div>
            <h3 class="text-h4 font-weight-bold text-white">{{ feat.title }}</h3>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Custom Font for the main title */
.font-serif {
  font-family: 'Playfair Display', serif; /* Or similar Google Font */
  letter-spacing: -0.02em;
}

/* Hover Effect for Bento Cards */
.bento-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bento-card:hover {
  transform: translateY(-6px) scale(1.01);
  z-index: 2;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
}

/* Add a subtle "Aurora" background behind the grid in your main layout */
</style>
