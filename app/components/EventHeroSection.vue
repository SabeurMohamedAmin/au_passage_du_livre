<script setup lang="ts">
  import { useDisplay } from 'vuetify'
  /* =====================
    CONFIGURATION
    =====================*/
  const { HERO_IMAGE_URL, content } = useEventHeroContent()

  /* ================
    REACTIVE STATE
    ================ */
  const featuredAuthors = ref<GuestAuthor[]>(content.authors)

  /* =================
    COMPUTED STYLES
    ================= */
  const heroStyle = computed(() => ({
    backgroundImage: `url(${HERO_IMAGE_URL})`
  }))

  const {sm, mdAndUp}= useDisplay()

  const responsiveSize= computed(()=>{
    if(sm.value){
        return {
          icon:25,
          avatar:50
        }
    }
    else if(mdAndUp.value){
      return {
        icon:30,
        avatar:60
    }
    }
    else {return {
      icon:20,
      avatar:40
    }}
  });

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
          {{ content.header.title }}
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg">
        {{ content.header.subtitle }}
      </p>
    </header>

    <!-- ========================
      SECTION 2: HERO CARD
    ============================= -->
    <v-row fluid>
      <v-col cols="12" class="mx-0">
        <v-card
          class="hero-card hover-effect rounded-xl overflow-hidden elevation-10"
          min-width="340"
          height="450"
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
                  {{ content.hero.badge }}
                </v-chip>
              </v-col>

              <v-col cols="12">
                <h1 class="text-h5 text-md-h4 font-weight-black line-height-tight mb-2" >
                  {{ content.hero.title }} <br />
                  <span class="text-primary">
                    {{ content.hero.subtitle }}
                  </span>
                </h1>
              </v-col>

              <v-col cols="11" sm="7" md="8">
                <p class="text-h6 opacity-90 font-weight-light mb-4 text-shadow-sm" >
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
      <v-col cols="6" sm="4" md="4">
        <v-sheet class="rounded-xl py-6 pa-ms-6 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center">
          <v-avatar
            color="primary"
            variant="tonal"
            :size="responsiveSize.avatar"
            class="mb-4 rounded-lg"
          >
            <v-icon
              :size="responsiveSize.icon"
              icon="mdi-calendar-clock"
            />
          </v-avatar>

          <!-- title -->
          <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
            {{ content.logistics.when.title }}
          </h3>

          <!-- main text -->
          <p class="text-body-2 text-sm-body-1 font-weight-medium mt-1">
            {{ content.logistics.when.desc }}<br />
            <span class="text-caption text-medium-emphasis">
              {{ content.logistics.when.sub }}
            </span>
          </p>
        </v-sheet>
      </v-col>

      <!-- Where -->
      <v-col cols="6" sm="4">
        <v-sheet class="rounded-xl py-6 pa-ms-6 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center">
          <v-avatar
            color="secondary"
            variant="tonal"
            :size="responsiveSize.avatar"
            class="mb-4 rounded-lg"
          >
            <v-icon :size="responsiveSize.icon" icon="mdi-map-marker-radius"/>
          </v-avatar>

          <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
            {{ content.logistics.where.title }}
          </h3>

          <p class="text-body-2 text-sm-body-1 font-weight-medium mt-1">
            {{ content.logistics.where.desc }}<br />
            <span class="text-caption text-medium-emphasis">
              {{ content.logistics.where.sub }}
            </span>
          </p>
        </v-sheet>
      </v-col>

      <!-- What -->
      <v-col cols="6" sm="4">
        <v-sheet class="rounded-xl py-6 pa-ms-6 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center" >
          <v-avatar
            color="success"
            variant="tonal"
            :size="responsiveSize.avatar"
            class="mb-4 rounded-lg"
          >
            <v-icon
              :size="responsiveSize.icon"
              icon="mdi-book-open-page-variant"
            />
          </v-avatar>

          <h3 class="text-subtitle-2 text-sm-h6 font-weight-bold">
            {{ content.logistics.what.title }}
          </h3>

          <p class="text-body-2 text-sm-body-1 font-weight-medium mt-1">
            {{ content.logistics.what.desc }}<br />
            <span class="text-caption text-medium-emphasis">
              {{ content.logistics.what.sub }}
            </span>
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- =============================
      SECTION 4: GUESTS CAROUSEL
    ============================== -->
    <div class="mb-15">
      <div class="flex-column flex-sm-row d-flex align-start justify-space-between mb-6">
        <h3 class="text-h5 font-weight-bold mb-2 mb-sm-0">
          Special Guests
        </h3>
        <nuxt-link 
          :to="$localePath({ name: 'event-details', hash: '#guests', params: { slug: content.hero.slug } })"
          class="decoration-none text-color-default"
        >
          <v-btn
            rounded="xl" variant="outlined"
            color="primary" 
            append-icon="mdi-arrow-right"
            class="px-2"
          >
            Guests of the Event
          </v-btn>
        </nuxt-link>
      </div>

      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="author in visibleAuthors"
          :key="author.id"
        >
          <v-card
            class="ma-2 rounded-xl border-thin hover-lift"
            width="180"
            flat
          >
            <v-responsive
              class="position-relative d-flex "
              style="height: 240px; width: 100%; height: 100%; aspect-ratio: 2/3; object-fit: cover;"
            >
              <!-- Image is absolutely positioned to fill the parent -->
              <nuxt-img
                :src="author.image"
                fit="cover"
                class="guest-image"
              />
              
              <!-- Gradient overlay is a separate sibling div -->
              <div class="w-100 h-100 d-flex align-end pa-3 position-relative"
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
        
        <!-- 2️⃣ More authors indicator (⋯) -->
        <v-slide-group-item v-if="hasMoreAuthors">
          <v-card
            class="ma-2 rounded-xl border-thin hover-lift d-flex align-center justify-center"
            width="180"
            height="95%"
            flat
          >
            <v-icon size="48" class="opacity-60">
              mdi-dots-horizontal
            </v-icon>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<style scoped>
  /**
  * CSS Variables for Glassmorphism
  */
  .guest-image {
    width: 100%;
    object-fit: cover;
    position: absolute;
  }

 .guest-profil-link, .guest-profil-link:visited{
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    transition: all .5s ease-in-out;
  }

  .guest-profil-link:hover{
    text-decoration: underline;
  }
  .hero-card {
    --overlay-opacity-start: 0.2;
    --overlay-opacity-hover: 0.85;
    --glass-blur: 8px;

    color: white;
    position: relative;
    background-size: cover;
    background-position: center;
  }
  
  /* --- Utilities --- */
  .max-w-lg {
    max-width: 800px;
  }
  .line-height-tight {
    line-height: 1.2;
  }
  .content-layer {
    z-index: 2;
    position: relative;
  }
  .text-shadow-sm {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  /* --- Animations --- */
  .hover-lift {
    transition: transform 0.25s ease-in-out;
  }
  .hover-lift:hover {
    transform: translateY(-2px);
  }
  .hover-effect {
    transition: box-shadow 0.3s ease-in-out;
  }
  .hover-effect:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
  }

  /* --- Glassmorphism Overlay Logic --- */
  .glass-overlay {
    inset: 0;
    z-index: 1;
    position: absolute;
    opacity: var(--overlay-opacity-start);
    transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.7)
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
  .glass-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.9)
    ) !important;
  }
  .min-w-250 {
    min-width: 340px;
  }
</style>