<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

/* =====================
  CONFIGURATION
===================== */
const { HERO_IMAGE_URL, content } = useEventHeroContent()

/* ================
  REACTIVE STATE
================ */
const featuredAuthors = ref<GuestAuthor[]>(content.authors)
const { sm, md, mdAndUp, lgAndUp } = useDisplay()

/* =================
  COMPUTED STYLES
================= */
const heroStyle = computed(() => {
  // Positions calculées selon l'analyse pixel de chaque image :
  // Le personnage est à ~77% x / ~55% y sur landscape, et ~47% x / 40% y sur mobile portrait
  let imageUrl = HERO_IMAGE_URL.mobile
  let position = '47% 40%'   // mobile portrait : personnage centré, cadrer haut

  if (lgAndUp.value) {
    imageUrl = HERO_IMAGE_URL.desktop
    position = '77% 55%'     // desktop  1604×800  – sujet à 77.4% / 55.1%
  } else if (md.value) {
    imageUrl = HERO_IMAGE_URL.laptop
    position = '77% 55%'     // laptop    885×573  – sujet à 77.2% / 54.8%
  } else if (sm.value) {
    imageUrl = HERO_IMAGE_URL.tablet
    position = '77% 54%'     // tablet  1536×1024  – sujet à 76.6% / 53.5%
  }

  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: position,
    backgroundRepeat: 'no-repeat',
  }
})

const heroHeight = computed(() => {
  if (lgAndUp.value) return 500
  if (md.value) return 450
  if (sm.value) return 500
  return 600
})

const responsiveSize = computed(() => {
  if (mdAndUp.value) return { icon: 30, avatar: 60 }
  if (sm.value)      return { icon: 25, avatar: 50 }
  return                    { icon: 20, avatar: 40 }
})

/* ==============================
  CAROUSEL DISPLAY LOGIC
============================== */
const MAX_VISIBLE_AUTHORS = 4

const visibleAuthors = computed(() =>
  featuredAuthors.value.slice(0, MAX_VISIBLE_AUTHORS)
)

const hasMoreAuthors = computed(() =>
  featuredAuthors.value.length > MAX_VISIBLE_AUTHORS
)
</script>

<template>
  <div>
    <!-- ===========================
      SECTION 1: PAGE HEADER
    ================================ -->
    <header class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{ $t('next_event_title') }}
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg">
        {{ $t('next_event_description') }}
      </p>
    </header>

    <!-- ========================
      SECTION 2: HERO CARD
    ============================= -->
    <v-row>
      <v-col cols="12" class="mx-0">
        <v-card
          class="hero-card hover-effect rounded-xl overflow-hidden elevation-10"
          min-width="340"
          :height="heroHeight"
          :style="heroStyle"
        >
          <!-- Layer 1: Glass Overlay -->
          <div class="glass-overlay"></div>

          <!-- Layer 2: Content -->
          <div class="content-layer pa-6 h-100 d-flex flex-column">
            <v-row dense>
              <v-col cols="12">
                <v-chip
                  color="primary"
                  class="font-weight-bold mb-4"
                  size="x-large"
                  rounded="xl"
                  label
                >
                  {{ content.hero.title }}
                </v-chip>
              </v-col>

              <v-col cols="12">
                <h1 class="text-h5 text-md-h4 font-weight-black line-height-tight mb-2">
                  {{ content.hero.subtitle }} <br />
                  <span class="text-primary">
                    {{ content.hero.tagline }}
                  </span>
                </h1>
              </v-col>

              <v-col cols="11" sm="7" md="8">
                <p class="text-h6 opacity-90 font-weight-light mb-4 text-shadow-sm">
                  {{ content.hero.description }}
                </p>
              </v-col>

              <v-col cols="12" class="mt-auto mb-4">
                <nuxt-link :to="$localePath({ name: 'event-details', params: { slug: content.hero.slug } })">
                  <v-btn
                    variant="outlined"
                    color="white"
                    size="large"
                    rounded="xl"
                    prepend-icon="mdi-information-outline"
                  >
                    {{ content.hero.cta }}
                  </v-btn>
                </nuxt-link>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- ======================
      SECTION 3: KEY INFO GRID
    ======================= -->
    <v-row class="mb-10 mt-2 min-w-250" dense>
      <!-- When -->
      <v-col cols="6" sm="4">
        <v-sheet class="rounded-xl pa-4 border-thin px-5 h-100">
          <v-row dense align="center" justify="center">
            <v-col cols="4" lg="3">
              <v-avatar color="primary" variant="tonal" :size="responsiveSize.avatar" class="mb-4 rounded-lg">
                <v-icon :size="responsiveSize.icon" icon="mdi-calendar-clock" />
              </v-avatar>
            </v-col>
            <v-col cols="8" lg="9">
              <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
                {{ content.logistics.when.title }}
              </h3>
            </v-col>
            <p class="w-100 text-body-2 text-sm-body-1 font-weight-medium mt-1">
              {{ content.logistics.when.desc }}<br />
              <span class="text-caption text-medium-emphasis">{{ content.logistics.when.sub }}</span>
            </p>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- Where -->
      <v-col cols="6" sm="4">
        <v-sheet class="rounded-xl pa-4 border-thin px-5 h-100">
          <v-row dense align="center" justify="center">
            <v-col cols="4" lg="3">
              <v-avatar color="secondary" variant="tonal" :size="responsiveSize.avatar" class="mb-4 rounded-lg">
                <v-icon :size="responsiveSize.icon" icon="mdi-map-marker-radius" />
              </v-avatar>
            </v-col>
            <v-col cols="8" lg="9">
              <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
                {{ content.logistics.where.title }}
              </h3>
            </v-col>
            <p class="w-100 text-body-2 text-sm-body-1 font-weight-medium mt-1">
              {{ content.logistics.where.desc }}<br />
              <span class="text-caption text-medium-emphasis">{{ content.logistics.where.sub }}</span>
            </p>
          </v-row>
        </v-sheet>
      </v-col>

      <!-- What -->
      <v-col cols="6" sm="4">
        <v-sheet class="rounded-xl pa-4 border-thin px-5 h-100">
          <v-row dense align="center" justify="center">
            <v-col cols="4" lg="3">
              <v-avatar color="success" variant="tonal" :size="responsiveSize.avatar" class="mb-4 rounded-lg">
                <v-icon :size="responsiveSize.icon" icon="mdi-book-open-page-variant" />
              </v-avatar>
            </v-col>
            <v-col cols="8" lg="9">
              <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
                {{ content.logistics.what.title }}
              </h3>
            </v-col>
            <p class="w-100 text-body-2 text-sm-body-1 font-weight-medium mt-1">
              {{ content.logistics.what.desc }}<br />
              <span class="text-caption text-medium-emphasis">{{ content.logistics.what.sub }}</span>
            </p>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- =============================
      SECTION 4: GUESTS CAROUSEL
    ============================== -->
    <div class="mb-15">
      <div class="flex-column flex-sm-row d-flex align-start justify-space-between mb-6">
        <h3 class="text-h5 font-weight-bold mb-2 mb-sm-0">
          {{ $t('event_guests') }}
        </h3>
      </div>

      <v-slide-group show-arrows>
        <v-slide-group-item v-for="author in visibleAuthors" :key="author.id">
          <v-card class="ma-2 rounded-xl border-thin hover-lift" width="180" flat>
            <v-responsive
              class="position-relative d-flex"
              style="width: 100%; aspect-ratio: 2/3;"
            >
              <nuxt-img :src="author.image" fit="cover" class="guest-image" alt="" />

              <div
                class="w-100 h-100 d-flex align-end pa-3 position-relative"
                style="background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%); z-index: 1;"
              >
                <div class="text-white">
                  <nuxt-link
                    class="font-weight-bold text-subtitle-2 guest-profil-link"
                    :to="$localePath({ name: 'guest-profile', params: { slug: author.slug } })"
                  >
                    {{ author.name }}
                  </nuxt-link>
                  <div class="text-caption opacity-80">{{ author.role }}</div>
                </div>
              </div>
            </v-responsive>
          </v-card>
        </v-slide-group-item>

        <v-slide-group-item v-if="hasMoreAuthors">
          <v-card
            class="ma-2 rounded-xl border-thin hover-lift d-flex align-center justify-center"
            width="180"
            height="95%"
            flat
          >
            <nuxt-link
              :to="$localePath({ name: 'event-details', hash: '#guests', params: { slug: content.hero.slug } })"
              class="text-decoration-none text-h5 text-center"
            >
              {{ $t('event_guests') }}
            </nuxt-link>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<style scoped>
/* --- Utilities --- */
.max-w-lg        { max-width: 800px; }
.line-height-tight { line-height: 1.2; }
.content-layer   { z-index: 2; position: relative; }
.text-shadow-sm  { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
.min-w-250       { min-width: 340px; }

/* --- Hero card --- */
.hero-card {
  --overlay-opacity-start: 0.2;
  --overlay-opacity-hover: 0.85;
  --glass-blur: 8px;

  color: white;
  position: relative;
  /* backgroundImage/Position/Size viennent du :style inline */
}

/* --- Glassmorphism overlay (une seule déclaration propre) --- */
.glass-overlay {
  inset: 0;
  z-index: 1;
  position: absolute;
  opacity: var(--overlay-opacity-start);
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.9)
  );
}
.hero-card:hover .glass-overlay {
  opacity: var(--overlay-opacity-hover);
}
@supports (backdrop-filter: blur(var(--glass-blur))) {
  .hero-card:hover .glass-overlay {
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
  }
}

/* --- Animations --- */
.hover-lift { transition: transform 0.25s ease-in-out; }
.hover-lift:hover { transform: translateY(-2px); }
.hover-effect { transition: box-shadow 0.3s ease-in-out; }
.hover-effect:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important; }

/* --- Guests --- */
.guest-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}
.guest-profil-link,
.guest-profil-link:visited {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s ease-in-out;
}
.guest-profil-link:hover { text-decoration: underline; }
</style>
