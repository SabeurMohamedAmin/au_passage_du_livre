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
    category: 'Article' | 'Interview' | 'Review' | 'Culture'
    image: string
    alt?: string
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
      title: $t('press_article_title'),
      excerpt: $t('press_article_excerpt'),
      publisher: 'DNA',
      publisherLogo: 'https://ui-avatars.com/api/?name=DNA&background=e60000&color=fff&size=64',
      date: '07 Sept 2025',
      category: $t('culture'),
      image: 'https://cdn-s-www.dna.fr/images/125FCFE5-9691-406A-BAD5-0085D74BCED6/NW_raw/pour-que-le-salon-du-livre-devienne-village-culturel-des-figurines-sont-exposees-le-collectionneur-tintinophile-remy-waeldin-transporte-en-syldavie-photo-thomas-toussaint-1757270458.jpg',
      alt: $t('press_article_title'),
      url: 'https://www.dna.fr/culture-loisirs/2025/09/07/livres-jeux-et-figurines-pour-un-vrai-village-culturel'
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
              :href="content.featured.url"
              target="_blank"
              variant="outlined"
              color="white"
              size="large"
              rounded="xl"
              prepend-icon="mdi-information-outline"
            >
              {{$t('read_article')}}
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