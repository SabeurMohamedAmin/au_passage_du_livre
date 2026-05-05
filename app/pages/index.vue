<script setup lang="ts">
import { useLocale } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'

const { isRtl } = useLocale()
const { locale } = useI18n()

const homeStore = useHomeStore()
const { page } = storeToRefs(homeStore)

await useAsyncData('home-page', () => homeStore.fetchHomePage())

const content = computed(() => homeStore.getTranslation(locale.value))

// ✅ safe — returns undefined instead of crashing when page not loaded yet
const img = (slot: 'hero_top_left' | 'hero_bottom_left' | 'hero_top_right' | 'hero_bottom_right') =>
  page.value?.images?.find(i => i.slot === slot)

// ✅ true only when page + images are loaded
const isReady = computed(() => !!page.value?.images)

watch(locale, () => homeStore.fetchHomePage())
</script>

<template>
  <section
    class="hero-section position-relative overflow-hidden mb-5 mb-md-10 pt-2 pt-md-4 pb-md-24"
    :class="{ 'rtl-mode': isRtl }"
  >
    <div class="hero-bg-shape d-none d-md-block" />

    <v-container class="container-with-90 scroll-mt-5">
      <v-row align="start" justify="space-between">

        <v-col
          cols="12" md="7" lg="6"
          class="z-index-99 d-flex flex-column justify-space-around text-column text-start"
        >
          <h1 class="d-flex flex-column text-lg-h3 text-md-h4 text-sm-h5 text-h6 font-weight-black text-transparent-4 lh-1 mb-6">
            <span class="mb-4 mb-sm-8">{{ content?.heroTitle1 ?? $t('cultural events') }}</span>
            <span class="mb-4 mb-sm-8">{{ content?.heroTitle2 ?? $t('support artists') }}</span>
            <span class="text-primary">{{ content?.heroTitle3 ?? $t('passing on culture') }}</span>
          </h1>

          <p class="flex-grow-1 text-h6 text-medium-emphasis font-weight-regular mb-10 line-height-lg pe-md-12 pe-lg-0">
            {{ content?.heroDescription ?? $t('association tagline') }}
          </p>

          <div class="d-flex align-start flex-column flex-sm-row flex-grow-1 align-md-center gap-md-2">
            <v-btn
              size="large" color="primary" rounded="pill"
              class="text-body-1 text-sm-button font-weight-bold elevation-6 h-auto me-2 py-4 mb-4 mb-md-0"
              :to="$localePath(content?.heroCta1Link ?? '/evenements')"
            >
              {{ content?.heroCta1Label ?? $t('see our events') }}
            </v-btn>
            <v-btn
              size="large" color="primary" rounded="pill" variant="outlined"
              class="text-body-1 text-sm-button font-weight-bold elevation-6 h-auto py-4"
              :to="$localePath(content?.heroCta2Link ?? '/about-us')"
            >
              {{ content?.heroCta2Label ?? $t('discover the association') }}
            </v-btn>
          </div>
        </v-col>

        <v-col
          cols="12" md="5" lg="6"
          class="event-img-right-section position-relative pa-md-5 mt-md-12 mt-md-0 rounded-lg"
        >
          <!-- ✅ skeleton while loading -->
          <v-row v-if="!isReady" density="comfortable" justify="space-between">
            <v-col cols="6" class="mt-2 mt-md-12">
              <v-skeleton-loader type="image" class="rounded-xl mb-4" style="aspect-ratio: 2/3" />
              <v-skeleton-loader type="image" class="rounded-xl mb-4" style="aspect-ratio: 1/1" />
            </v-col>
            <v-col cols="6">
              <v-skeleton-loader type="image" class="rounded-xl mb-4" style="aspect-ratio: 1/1" />
              <v-skeleton-loader type="image" class="rounded-xl mb-4" style="aspect-ratio: 2/3" />
            </v-col>
          </v-row>

          <!-- ✅ real images once loaded -->
          <v-row v-else density="comfortable" justify="space-between">
            <v-col cols="6" class="mt-2 mt-md-12">

              <!-- hero_top_left -->
              <nuxt-img
                v-if="img('hero_top_left')?.url"
                :src="img('hero_top_left')!.url!"
                :alt="img('hero_top_left')?.alt ?? ''"
                class="hero-img-top-left w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <div v-else class="img-placeholder rounded-xl mb-4 elevation-5" style="aspect-ratio: 2/3">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.4"/>
                  <path d="M10 34L20 18L28 28L33 22L38 34H10Z" fill="currentColor" opacity="0.2"/>
                  <circle cx="34" cy="16" r="4" fill="currentColor" opacity="0.25"/>
                </svg>
              </div>

              <!-- hero_bottom_left -->
              <nuxt-img
                v-if="img('hero_bottom_left')?.url"
                :src="img('hero_bottom_left')!.url!"
                :alt="img('hero_bottom_left')?.alt ?? ''"
                class="hero-img-bottom-left w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <div v-else class="img-placeholder rounded-xl mb-4 elevation-5" style="aspect-ratio: 1/1">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.4"/>
                  <path d="M10 34L20 18L28 28L33 22L38 34H10Z" fill="currentColor" opacity="0.2"/>
                  <circle cx="34" cy="16" r="4" fill="currentColor" opacity="0.25"/>
                </svg>
              </div>

            </v-col>
            <v-col cols="6">

              <!-- hero_top_right -->
              <nuxt-img
                v-if="img('hero_top_right')?.url"
                :src="img('hero_top_right')!.url!"
                :alt="img('hero_top_right')?.alt ?? ''"
                class="hero-img-top-right w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <div v-else class="img-placeholder rounded-xl mb-4 elevation-5" style="aspect-ratio: 1/1">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.4"/>
                  <path d="M10 34L20 18L28 28L33 22L38 34H10Z" fill="currentColor" opacity="0.2"/>
                  <circle cx="34" cy="16" r="4" fill="currentColor" opacity="0.25"/>
                </svg>
              </div>

              <!-- hero_bottom_right -->
              <nuxt-img
                v-if="img('hero_bottom_right')?.url"
                :src="img('hero_bottom_right')!.url!"
                :alt="img('hero_bottom_right')?.alt ?? ''"
                class="hero-img-bottom-right w-100 rounded-xl mb-4 elevation-5 hover-up"
                fit="cover"
              />
              <div v-else class="img-placeholder rounded-xl mb-4 elevation-5" style="aspect-ratio: 2/3">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <rect x="4" y="4" width="40" height="40" rx="6" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" opacity="0.4"/>
                  <path d="M10 34L20 18L28 28L33 22L38 34H10Z" fill="currentColor" opacity="0.2"/>
                  <circle cx="34" cy="16" r="4" fill="currentColor" opacity="0.25"/>
                </svg>
              </div>

            </v-col>
          </v-row>
        </v-col>

      </v-row>
    </v-container>
  </section>

  <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
    <v-container class="py-10">
      <notre-mission
        :title="content?.missionsTitle"
        :description="content?.missionsDescription"
        :see-all-label="content?.missionsSeeAllLabel"
        :see-all-link="content?.missionsSeeAllLink"
      />
    </v-container>
  </section>

  <section class="py-5 my-md-10 scroll-mt-6">
    <v-container>
      <speakers-grid
        :title="content?.speakersTitle"
        :description="content?.speakersDescription"
        :see-all-label="content?.speakersSeeAllLabel"
        :see-all-link="content?.speakersSeeAllLink"
      />
    </v-container>
  </section>

  <section class="py-5 py-md-10 scroll-mt-6 bg_surface_variant">
    <v-container>
      <articles-slider
        :title="content?.articlesTitle"
        :description="content?.articlesDescription"
        :see-all-label="content?.articlesSeeAllLabel"
        :see-all-link="content?.articlesSeeAllLink"
      />
    </v-container>
  </section>

  <section id="schedule" class="my-5 my-md-10 scroll-mt-6">
    <EventScheduleDownload
      :title="content?.eventsTitle"
      :description="content?.eventsDescription"
      :download-label="content?.eventsDownloadLabel"
      :download-link="content?.eventsDownloadLink"
    />
  </section>
</template>

<style scoped>
.z-index-99 { z-index: 99; }
.hero-section { overflow-x: hidden; }

.hero-bg-shape {
  position: absolute;
  top: 0; right: 0; left: auto;
  width: 50%;
  max-width: 600px;
  height: 100%;
  opacity: 0.7;
  pointer-events: none;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 50% 0 0 50%;
  transition: all 0.3s ease-in-out;
}
.hero-section.rtl-mode .hero-bg-shape {
  right: auto; left: 0;
  transform: scaleX(-1);
}

.hero-container { max-width: 1400px; margin-inline: auto; }
.text-column { height: calc(100lvh - 80px); }

.hero-img-top-left,
.hero-img-top-right,
.hero-img-bottom-left,
.hero-img-bottom-right { max-width: 100%; }

.bg_surface_variant { backdrop-filter: contrast(90%); }

.event-img-right-section {
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

.lh-1 { line-height: 1.1; }

.hover-up { transition: transform 0.3s ease; }
.hover-up:hover { transform: translateY(-10px); }

.hero-img-top-right,
.hero-img-bottom-left { aspect-ratio: 1/1; object-fit: fill; }

.hero-img-bottom-right,
.hero-img-top-left { aspect-ratio: 2/3; object-fit: fill; }

.img-placeholder {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(128, 128, 128, 0.1);
  border: 1px dashed rgba(128, 128, 128, 0.3);
  color: rgba(128, 128, 128, 0.5);
}
</style>