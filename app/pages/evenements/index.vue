<script setup lang="ts">
/* ==========================================================================
   1. INTERFACES
   Define data shapes for type safety and clarity.
   ========================================================================== */

interface StatMetric {
  value: string
  label: string
}

interface GuestAuthor {
  id: number
  name: string
  role: string
  image: string
}

/* ==========================================================================
   2. CONFIGURATION (MINI-CMS)
   Centralized content. Edit here without breaking the HTML structure.
   ========================================================================== */

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop'

const pageContent = {
  header: {
    title: 'Our Next Event',
    subtitle: 'We invite you all to visit us on our next event — if you are interested please check for more details.'
  },
  hero: {
    badge: 'Foire Européenne 2026',
    title: 'Au Passage du Livre',
    subtitle: 'Goes European',
    description: 'Join our association for three unforgettable days of literature, culture, and exchange at the heart of Europe.',
    slug: 'foire-europeenne-2026',
    cta: 'Learn More',
  },
  logistics: {
    when: { title: 'When?', desc: 'September 4-14, 2026', sub: '10:00 AM - 8:00 PM' },
    where: { title: 'Where?', desc: 'Parc des Expositions', sub: 'Hall 5, Stand B-24' },
    what: { title: 'What?', desc: 'Book Signings, Panels &', sub: 'Exclusive Workshops' }
  },
  authors: [
    { id: 1, name: 'Sarah Chen', role: 'Sci-Fi Novelist', image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: 2, name: 'Marc Dubois', role: 'Historian', image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 3, name: 'Elena Silva', role: 'Poet', image: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
    { id: 4, name: 'David Okafor', role: 'Journalist', image: 'https://i.pravatar.cc/150?u=a04258114e29026708c' }
  ] as GuestAuthor[]
}

/* ==========================================================================
   3. REACTIVE STATE
   ========================================================================== */

const featuredAuthors = ref<GuestAuthor[]>(pageContent.authors)

/* ==========================================================================
   4. COMPUTED STYLES
   ========================================================================== */

// Moves the background image out of CSS class to allow dynamic changes
const heroStyle = computed(() => ({
  backgroundImage: `url(${HERO_IMAGE_URL})`
}))
</script>

<template>
  <v-container class="py-6">
    <!-- ==========================================
      SECTION 1: PAGE HEADER
    =============================================== -->
    <EventHeroSection />

    <v-divider class="mb-15"/>

    <!-- ============================================
      SECTION 5: SCHEDULE (External Component)
    ================================================= -->
    <div class="mb-16">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{$t("events heading")}}
        </h2>
      </div>
      <p class="text-h6 text-medium-emphasis max-w-lg">
        {{ $t("events description") }}
      </p>
    </div>
    
    <!-- Assuming this component handles its own data fetching/props -->
    <EventSchedule />

    <v-divider class="mb-15 mt-15"/>

    <!-- =========================================
      SECTION 6: ARCHIVES
    ============================================== -->
    <v-row justify="start" class="gap-0 mb-15">
      <v-col cols="12" lg="11" xl="10">
        <h3 class="w-100 text-h5 font-weight-black opacity-70">
          Archives events
        </h3>
      </v-col>

      <v-col cols="12" lg="11" xl="10">
        <p class="text-h6 text-medium-emphasis">
          {{ $t("upcoming events description") }}
        </p>
      </v-col>
    </v-row>

    <!-- Archives Events -->
     <archives-events />
  </v-container>
</template>

<style scoped>
  /**
  * CSS Variables for Glassmorphism
  * Controls the hover "reveal" effect
  */
  .hero-card {
    --overlay-opacity-start: 0.2; /* Slightly visible by default for text contrast */
    --overlay-opacity-hover: 0.85; /* Darken/Lighten significantly on hover */
    --glass-blur: 8px;
    
    background-size: cover;
    background-position: center;
    position: relative;
    color: white; /* Text color inside Hero */
  }

  /* --- Utilities --- */
  .max-w-lg { max-width: 800px; }
  .line-height-tight { line-height: 1.2; }
  .content-layer { position: relative; z-index: 2; }
  .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

  /* --- Animations --- */
  .hover-lift { transition: transform 0.25s ease; }
  .hover-lift:hover { transform: translateY(-4px); }

  .hover-effect { transition: box-shadow 0.3s ease; }
  .hover-effect:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important; }

  /* --- Glassmorphism Overlay Logic --- */
  .glass-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: var(--overlay-opacity-start);
    transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
    
    /* Fallback gradient */
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  }

  .hero-card:hover .glass-overlay {
    opacity: var(--overlay-opacity-hover);
  }

  /* Blur Support */
  @supports (backdrop-filter: blur(var(--glass-blur))) {
    .hero-card:hover .glass-overlay {
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
    }
  }

  /* 
  * Theme Specifics 
  * Light Mode: White overlay on hover (creates a "frosted glass" look)
  * Dark Mode: Black overlay on hover (creates a "dimmed theater" look)
  */
  .v-theme--light .glass-overlay {
    background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.9));
  }
  /* Ensure text stays readable on light overlay by forcing dark text on hover ONLY if you want that. 
    Currently, .hero-card sets 'color: white'. If using a white overlay, you might want to invert text color.
    However, usually for Heros with images, a dark overlay is safer for text contrast. 
    
    *Adjustment*: I will stick to a dark overlay for BOTH modes to ensure the white text 
    remains readable regardless of the underlying image brightness. 
  */
  .glass-overlay {
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)) !important;
  }

</style>