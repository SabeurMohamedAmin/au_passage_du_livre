<script setup lang="ts">
</script>

<template>
  <v-container class="py-6">
    <EventHeroSection />
    <v-divider class="mb-15"/>

    <!-- SECTION 6: ARCHIVES -->
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
    color: white;
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