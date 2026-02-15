<script setup>
import { useLocale } from 'vuetify'

const { isRtl } = useLocale()
</script>

<template>
  <section 
    class="hero-section position-relative overflow-hidden mb-5 mb-md-10 pt-2 pt-md-4 pb-md-24"
    :class="{ 'rtl-mode': isRtl }"
  >
    <div class="hero-bg-shape d-none d-md-block"></div>

    <v-container class="hero-container scroll-mt-5">
      <v-row align="start" justify="space-between">

        <v-col
          cols="12"
          md="7"
          lg="6"
          class="d-flex flex-column justify-space-around text-column text-start"
        >
          <h1 class="d-flex flex-column text-lg-h3 text-md-h4 text-sm-h5 text-h6 font-weight-black text-transparent-4 lh-1 mb-6">
            <span class="mb-4 mb-sm-8">{{ $t("cultural events") }}</span>
            <span class="mb-4 mb-sm-8">{{ $t("support artists") }}</span>
            <span class="text-primary">{{ $t("passing on culture") }}</span>
          </h1>

          <p class="flex-grow-1 text-h6 text-medium-emphasis font-weight-regular mb-10 line-height-lg pe-md-12 pe-lg-0">
            {{ $t("association tagline") }}
          </p>

          <div class="d-flex align-start flex-column flex-sm-row flex-grow-1 align-md-center gap-md-2">
            <v-btn
              size="large"
              color="primary"
              rounded="pill"
              class="text-body-1 text-sm-button font-weight-bold elevation-6 h-auto me-2 py-4 mb-4 mb-md-0"
              :to="$localePath('/evenements')"
            >
              {{ $t("see our events") }}
            </v-btn>

            <v-btn
              size="large"
              color="primary"
              rounded="pill"
              variant="outlined"
              class="text-body-1 text-sm-button font-weight-bold elevation-6 h-auto py-4"
              :to="$localePath('/about-us')"
            >
              {{ $t("discover the association") }}
            </v-btn>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="5"
          lg="6"
          class="event-img-right-section position-relative pa-md-5 mt-md-12 mt-md-0 rounded-lg"
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

  <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
    <v-container class="py-10">
      <notre-mission />
    </v-container>
  </section>

  <section class="py-5 my-md-10 scroll-mt-6">
    <v-container>
      <speakers-grid />
    </v-container>
  </section>

  <section class="py-5 py-md-10 scroll-mt-6 bg_surface_variant">
    <v-container>
      <articles-slider />
    </v-container>
  </section>

  <section id="schedule" class="my-5 my-md-10 scroll-mt-6">
    <EventScheduleDownload />
  </section>
</template>

<style scoped>
  .hero-section {
    overflow-x: hidden;
  }

  /* * BACKGROUND SHAPE LOGIC
   * Default (LTR): Placed on Right, curved towards left.
   */
  .hero-bg-shape {
    position: absolute;
    top: 0;
    right: 0; /* Default LTR position */
    left: auto;
    width: 50%;
    max-width: 600px;
    height: 100%;
    opacity: 0.7;
    pointer-events: none;
    background-color: rgb(var(--v-theme-primary));
    border-radius: 50% 0 0 50%; /* Curve points Left */
    transition: all 0.3s ease-in-out;
  }

  /* * RTL OVERRIDE
   * triggered by the JS class .rtl-mode
   * 1. Move to Left
   * 2. Flip the curve using scaleX(-1) - simpler and more robust than border-radius
   */
  .hero-section.rtl-mode .hero-bg-shape {
    right: auto;
    left: 0;
    transform: scaleX(-1); /* Flips the shape horizontally */
  }

  .hero-container {
    max-width: 1400px;
    margin-inline: auto;
  }

  .text-column {
    height: calc(100lvh - 80px);
  }

  /* IMAGE SAFETY */
  .hero-img-top-left,
  .hero-img-top-right,
  .hero-img-bottom-left,
  .hero-img-bottom-right {
    max-width: 100%;
  }

  /* SURFACE */
  .bg_surface_variant {
    backdrop-filter: contrast(90%);
  }

  .event-img-right-section {
    backdrop-filter: blur(12px);
    border: 1px solid #46444420;
  }

  /* TEXT */
  .text-transparent-4 {
    opacity: 0.8;
    letter-spacing: -0.02em;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .lh-1 {
    line-height: 1.1;
  }

  /* INTERACTIONS */
  .hover-up {
    transition: transform 0.3s ease;
  }
  .hover-up:hover {
    transform: translateY(-10px);
  }

  /* ASPECT RATIOS */
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