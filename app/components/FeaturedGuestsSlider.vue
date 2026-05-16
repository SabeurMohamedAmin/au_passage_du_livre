<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { computed, ref } from 'vue';
  import { useIntervenantsStore } from '~/stores/intervenants';

  const store = useIntervenantsStore();

  // Prefetch if empty; works with SSR
  if (store.items.length === 0) {
    await store.fetchPublic()
  }

  /* ==========================================================================
    STATE
    ========================================================================== */
  const guests = computed(() => store.items);

  /* ==========================================================================
    DISPLAY
    ========================================================================== */
  const { xs, sm } = useDisplay();

  /* ==========================================================================
    COMPUTED
    ========================================================================== */
  const featuredGuests = computed(() =>
    guests.value.filter((guest) => guest.featured)
  );

  const slideCardWidth = computed(() => {
    if (xs.value) return 240;
    if (sm.value) return 260;
    return 280;
  });

  const getRoleColor = (role: Guest['role']) => {
    const map: Record<Guest['role'], string> = {
      Auteur: 'primary',
      Artiste: 'secondary',
      Conférencier: 'success',
      Historien: 'info',
      Artisan: 'warning'
    }
    return map[role]
  };

  const activeSlide = ref(0);
</script>

<template>
  <section>
    <!-- ==========================================
         SECTION 1: PAGE HEADER
    =========================================== -->
    <header class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{ $t('event_speakers_title') }}
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg mx-auto">
        {{ $t('event_speakers_description') }}
      </p>
    </header>
    <!-- ===========================
      SECTION 2: FEATURED SLIDER
    ============================ -->
    <section class="mb-12">
      <div class="d-flex align-center justify-space-between mb-6">
        <h2 class="text-h5 text-md-h4 font-weight-bold">
          {{$t('upcoming_event_guests')}}
        </h2>
        <v-btn :to="{ hash: '#all_guest' }" variant="text" color="primary" append-icon="mdi-arrow-right">
          {{$t('see_all')}}
        </v-btn>
      </div>

      <!-- 
           Key Fixes for Mobile Centering:
           1. Added `snap-mandatory` class (defined in styles)
           2. `center-active`: Centers the selected item
           3. `mandatory`: Ensures one item is always selected
      -->
      <v-slide-group
        v-model="activeSlide"
        id="artists_slider"
        class="featured-slider mx-0 px-0 snap-mandatory"
        show-arrows
        center-active
        mandatory
      >
        <template #prev>
          <v-icon
             class="slider-arrow slider-arrow--prev"
             icon="mdi-chevron-left"
             elevation="2"
          />
        </template>

        <template #next>
          <v-icon
             class="slider-arrow slider-arrow--next"
             icon="mdi-chevron-right"
             elevation="2"
          />
        </template>

        <v-slide-group-item
          :key="guest.id"
          :value="index"
          v-slot="{ isSelected, toggle }"
          v-for="(guest, index) in featuredGuests"
        >
          <v-card
            class="my-4 rounded-xl overflow-hidden featured-card mx-2 cursor-auto"
            :class="{ 'card-active': isSelected }"
            :width="slideCardWidth"
            elevation="2"
            @click="toggle"
            :ripple="false"
          >
            <v-img
              cover
              height="300"
              :src="guest.image"
              gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%"
            >
              <div class="fill-height d-flex flex-column">
                <v-chip
                  :color="getRoleColor(guest.role)"
                  size="small"
                  class="ma-3 align-self-start"
                  label
                >
                  {{ guest.role }}
                </v-chip>

                <div class="mt-auto pa-4 text-white">
                  <h3 class="text-h6 font-weight-bold mb-1">
                    {{ guest.name }}
                  </h3>
                  <p class="text-subtitle-2 text-primary mb-2">
                    {{ guest.specialty }}
                  </p>
                  <p class="text-caption opacity-90 line-clamp-2">
                    {{ guest.bio }}
                  </p>
                </div>
              </div>
            </v-img>

            <v-card-actions class="pa-4 pt-2">
              <nuxt-link 
                :to="$localePath({name: 'guest-profile', params: {slug: guest.slug}})"
                class="text-decoration-none w-100"
              >
                <v-btn
                  variant="tonal" color="primary" 
                  rounded="lg" block
                  text="Voir le profil"  
                />
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </section>
  </section>
</template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }


  .featured-card {
    outline: 2px solid transparent;
    transition: outline 0.2s ease-in-out;
  }

  .featured-card:hover {
    outline-color: rgb(var(--v-theme-primary));
  }

  .featured-slider {
    position: relative;
  }

  .slider-arrow {
    z-index: 100;
  }
</style>