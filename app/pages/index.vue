<script setup lang="ts">

</script>

<template>
  <!-- HERO SECTION -->
  <section class="hero-section position-relative overflow-hidden mb-5 mb-md-10 pt-2 pt-md-4 pb-md-24">
    <!-- Background Shape (FIXED) -->
    <div class="hero-bg-shape d-none d-md-block"></div>

    <v-container class="hero-container scroll-mt-5">
      <v-row align="start" justify="space-between">

        <!-- LEFT TEXT -->
        <v-col cols="12" md="7" lg="6" class="d-flex flex-column justify-space-evenly align-baseline text-column">
          <h1 class="d-flex flex-column text-lg-h3 text-md-h4 text-sm-h5 text-h6  font-weight-black text-transparent-4 lh-1 mb-6">
            <span class="mb-4 mb-sm-8">
              Évènements culturels
            </span>
            <span class="mb-4 mb-sm-8">
              Soutien aux artistes
            </span>
            <span class="text-primary ">
              Transmettre la culture
            </span>
          </h1>
    
          <p class="text-h6 text-medium-emphasis font-weight-regular mb-10 line-height-lg pe-md-12 pe-lg-0">
            Une association strasbourgeoise engagée pour le livre et les arts narratifs —
            5ᵉ art (littérature), 7ᵉ art (cinéma) et 9ᵉ art (bande dessinée) —
            dans le Grand Est.
          </p>
    
          <div class="d-flex align-start flex-column flex-sm-row align-md-center gap-md-2 ">
            <v-btn
              size="large"
              color="primary"
              rounded="pill"
              class="font-weight-bold elevation-6 h-auto me-2 py-4 mb-4 mb-md-0"
              :to="$localePath('/evenements')"
            >
              See our events
            </v-btn>
    
            <v-btn
              size="large"
              color="primary"
              rounded="pill"
              variant="outlined"
              class="font-weight-bold elevation-6 h-auto py-4"
              :to="$localePath('/about-us')"
            >
              Découvrir l'association
            </v-btn>
          </div>
        </v-col>

        <!-- RIGHT IMAGES -->
        <v-col
          cols="12"
          md="5"
          lg="6"
          class="event-img-reight-section position-relative pa-5 mt-12 mt-md-0 rounded-lg"
        >
          <v-row dense justify="space-between">
            <v-col cols="6" class="mt-2 mt-md-12">
              <nuxt-img
                src="/img/home/des-dedicaces.png"
                class="hero-img-top-left w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <nuxt-img
                src="/img/home/diffrents-directions.png"
                class="hero-img-bottom-left w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
            </v-col>

            <v-col cols="6">
              <nuxt-img
                src="/img/home/assemblage-de-livre.png"
                class="hero-img-top-right w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <nuxt-img
                src="/img/home/comic.png"
                class="hero-img-bottom-right w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- MISSIONS -->
  <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
    <v-container class="py-10">
      <we-do-best />
    </v-container>
  </section>

  <!-- SPEAKERS -->
  <section class="py-5 my-md-10 scroll-mt-6">
    <v-container >
      <speakers-grid />
    </v-container>
  </section>

  <!-- ARTICLES -->
  <section class="py-5 py-md-10 scroll-mt-6 bg_surface_variant">
    <v-container >
      <articles-slider/>
    </v-container>
  </section>

  <!-- 6. SCHEDULE SECTION -->
  <section id="schedule" class="my-5 my-md-10 scroll-mt-6 ">
    <v-container>
      <v-row class="mb-12 align-start">
        <v-col cols="12" md="8">
          <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
            Event Schedule
          </h2>
          <p>
            To download the full 2025 events catalog please click on download PDF.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <nuxt-link
            to="/documents/events/aupassagedulivre-catalogue-2025.pdf"
            target="_blank"
            download="aupassagedulivre-event-2025.pdf"
          >
            <v-btn
              append-icon="mdi-download" 
              variant="outlined" rounded="pill" 
              class="font-weight-bold px-6 border-opacity-25"
            >
              Download PDF
            </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>

      <v-col cols="12" class="px-0">
         <!-- TABBED COMPONENT -->
         <v-card class="elevation-0 rounded-xl border bg-white">
         </v-card>
      </v-col>
    </v-container>
  </section>
  
  <!-- 5. ARTICLES et ACTUALITIES -->
  <!--
    <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
      <small-slider/>
    </section>
  -->
</template>

<style scoped>

  .hero-section { overflow-x: hidden }

  .hero-bg-shape {
    top: 0;
    right: 0;
    width: 50%;
    opacity: 0.7;
    height: 100%;
    max-width: 600px;
    position: absolute;
    pointer-events: none;
    border-radius: 50% 0 0 50%;
    background-color: rgb(var(--v-theme-primary));
  }

  .hero-container {
    max-width: 1400px;
    margin-inline: auto;
  }

  .text-column {
    height: calc(100lvh - 80px);
  }

  /* --------------------------------
    IMAGE SAFETY
  -------------------------------- */
  .hero-img-top-left,
  .hero-img-top-right,
  .hero-img-bottom-left,
  .hero-img-bottom-right {
    max-width: 100%;
  }

  /* --------------------------------
    ORIGINAL STYLES (UNCHANGED)
  -------------------------------- */
  .bg_surface_variant {
    backdrop-filter: contrast(90%);
  }

  .event-img-reight-section {
    backdrop-filter: blur(12px);
    border: 1px solid #46444420;
  }

  .text-transparent-4 {
    opacity: 0.8;
    letter-spacing: -0.02em;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .lh-1 { line-height: 1.1 }
  .hover-up { transition: transform 0.3s ease }
  .hover-up:hover { transform: translateY(-10px) }

  .hero-img-top-right,
  .hero-img-bottom-left {
    aspect-ratio: 1 / 1;
    object-fit: fill;
  }

  .hero-img-bottom-right,
  .hero-img-top-left {
    aspect-ratio: 2 / 3;
    object-fit: fill;
  }
</style>
