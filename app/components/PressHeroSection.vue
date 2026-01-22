<script setup lang="ts">
  /* ============================================================
     PRESSE & ACTUALITÉS - REFACTORED HERO
     - Implements "EventHeroSection" style overlay
     - Full height visibility without scrolling
     ============================================================ */

  // Press articles data definition
  interface PressArticle {
    id: number
    title: string
    excerpt: string
    publisher: string
    publisherLogo: string
    date: string
    category: 'Article' | 'Interview' | 'Review' | 'Event Coverage'
    image: string
    url: string
  }

  // Content Configuration
  const content = {
    hero: {
      title: 'Presse & Actualités',
      subtitle: 'Articles, interviews et mentions médiatiques consacrés à Au Passage du Livre et à ses actions culturelles.'
    },
    featured: <PressArticle>{
      id: 0,
      title: 'Au Passage du Livre, un acteur culturel qui rassemble',
      publisher: 'Dernières Nouvelles d’Alsace',
      publisherLogo: "mdi-newspaper-variant-outline",
      excerpt: 'À Strasbourg, l’association développe des événements littéraires et artistiques ouverts à tous, favorisant le dialogue et la création.',
      date: 'Avril 2026',
      image: 'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?q=80&w=2400&auto=format&fit=crop',
      url: '#'
    }
  }

  // Sample Data for Grid
  const pressArticles: PressArticle[] = [
    {
      id: 1,
      title: 'Au Passage du Livre transforme la Place Kléber en bibliothèque',
      excerpt: 'Retour sur cet événement majeur qui a rassemblé des milliers de lecteurs au cœur de Strasbourg...',
      publisher: 'DNA',
      publisherLogo: 'https://ui-avatars.com/api/?name=DNA&background=e60000&color=fff&size=64',
      date: '15 Jan 2026',
      category: 'Event Coverage',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 2,
      title: 'Quand la littérature crée du lien social : Interview',
      excerpt: 'Rencontre avec Michel Amiet qui nous explique la vision solidaire de l\'association.',
      publisher: 'France Bleu',
      publisherLogo: 'https://ui-avatars.com/api/?name=FB&background=0055ff&color=fff&size=64',
      date: '28 Déc 2025',
      category: 'Interview',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 3,
      title: 'Une vision moderne de l’engagement culturel',
      excerpt: 'Analyse des nouvelles méthodes de promotion de la lecture en région Grand Est.',
      publisher: 'Culture Mag',
      publisherLogo: 'https://ui-avatars.com/api/?name=CM&background=143c28&color=fff&size=64',
      date: '10 Nov 2025',
      category: 'Article',
      image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 4,
      title: 'Les bienfaits de la lecture pour les jeunes',
      excerpt: 'L\'association intervient dans les écoles pour sensibiliser les plus petits.',
      publisher: 'Le Figaro',
      publisherLogo: 'https://ui-avatars.com/api/?name=LF&background=000&color=fff&size=64',
      date: '05 Oct 2025',
      category: 'Article',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 5,
      title: 'L\'association lance son nouveau site web',
      excerpt: 'Une plateforme numérique repensée pour mieux servir les adhérents et le public.',
      publisher: 'Web News',
      publisherLogo: 'https://ui-avatars.com/api/?name=WN&background=666&color=fff&size=64',
      date: '28 Sep 2025',
      category: 'Review',
      image: 'https://images.unsplash.com/photo-1507842217159-a28f26809398?q=80&w=600&auto=format&fit=crop',
      url: '#'
    },
    {
      id: 6,
      title: 'Agenda : Les sorties culturelles de la rentrée',
      excerpt: 'Ne manquez pas les prochains marchés aux livres organisés par l\'équipe.',
      publisher: 'Strasbourg.eu',
      publisherLogo: 'https://ui-avatars.com/api/?name=SX&background=9c27b0&color=fff&size=64',
      date: '01 Sep 2025',
      category: 'Event Coverage',
      image: 'https://images.unsplash.com/photo-1544928147-79a2af1f3a94?q=80&w=600&auto=format&fit=crop',
      url: '#'
    }
  ]

  // Helper for chip colors in grid
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Article': return 'blue-darken-1'
      case 'Interview': return 'orange-darken-1'
      case 'Review': return 'green-darken-1'
      case 'Event Coverage': return 'purple-darken-1'
      default: return 'grey'
    }
  }

  // COMPUTED: Featured Hero Style (Dynamic Background)
  const featuredHeroStyle = computed(() => ({
    backgroundImage: `url(${content.featured.image})`
  }))
</script>

<template>
  <!-- FEATURED PRESS ARTICLE (Hero Style) -->
  <section class="mb-14">
    <v-card
      class="hero-card rounded-xl overflow-hidden elevation-10"
      height="460"
      :style="featuredHeroStyle"
    >
      <!-- Layer 1: Glass Overlay -->
      <div class="glass-overlay"></div>

      <!-- Layer 2: Content -->
      <div class="content-layer pa-6 h-100 d-flex flex-column">
        <v-row dense>
          <v-col cols="12">

            <!-- Publisher Badge -->
            <v-chip
              class="mb-4 font-weight-bold"
              size="large"
              rounded="pill"
              elevation="2"
            >
              <v-icon :icon="content.featured.publisherLogo" start class="mr-2" />
              {{ content.featured.publisher }} — {{ content.featured.date }}
            </v-chip>
          </v-col>
          <v-col cols="12">

            <!-- Title & Excerpt -->
            <div class="max-w-xl">
              <h1 class="text-h5 text-md-h4 font-weight-black line-height-tight mb-2">
                {{ content.featured.title }}
              </h1>
              
              <p class="text-h6 opacity-90 font-weight-light mb-4 text-shadow-sm">
                {{ content.featured.excerpt }}
              </p>
            </div>
          </v-col>

          <v-col>
            <!-- CTA Button -->
            <v-btn
              variant="outlined"
              color="white"
              size="large"
              rounded="xl"
              prepend-icon="mdi-information-outline"
            >
              Lire l’article
              <v-icon end icon="mdi-arrow-right" />
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </section>
</template>

<style scoped>
/**
 * CSS Variables for Glassmorphism
 * Controls the hover "reveal" effect
 */
.hero-card {
  --overlay-opacity-start: 0.3; /* Darker start for text readability */
  --overlay-opacity-hover: 0.85; /* Darken significantly on hover */
  --glass-blur: 8px;

  background-size: cover;
  background-position: center;
  position: relative;
  color: white; /* Text color inside Hero */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.25) !important;
}

/* --- Utilities --- */
.max-w-lg { max-width: 800px; }
.max-w-xl { max-width: 650px; }
.line-height-tight { line-height: 1.1; }
.content-layer { position: relative; z-index: 2; }
.text-shadow-sm { text-shadow: 0 2px 8px rgba(0,0,0,0.6); }

/* --- Glassmorphism Overlay Logic --- */
.glass-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: var(--overlay-opacity-start);
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
  
  /* Gradient for text contrast */
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8));
}

.hero-card:hover .glass-overlay {
  opacity: var(--overlay-opacity-hover);
  /* Darker overlay on hover for dramatic effect */
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.95));
}

/* Blur Support */
@supports (backdrop-filter: blur(var(--glass-blur))) {
  .hero-card:hover .glass-overlay {
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
  }
}
</style>
