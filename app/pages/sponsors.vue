<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSponsorsStore } from '@/stores/sponsors'

const { locale } = useI18n()  // ← get locale

const sponsorsStore = useSponsorsStore()
const { pageContent, isLoading, publishedSponsors } = storeToRefs(sponsorsStore)

// ✅ pass locale on initial fetch
await useAsyncData('sponsors', () => sponsorsStore.fetchPublicSponsors(locale.value))

// ✅ refetch when user switches language
watch(locale, (newLocale) => {
  sponsorsStore.fetchPublicSponsors(newLocale)
})
</script>

<template>
  <v-container class="py-6 container-with-90">

    <div class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{ pageContent.title }}
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg mx-auto">
        {{ pageContent.subtitle }}
      </p>
    </div>

    <div v-if="isLoading" class="d-flex justify-center py-16">
      <v-progress-circular indeterminate color="primary" size="50" />
    </div>

    <v-row v-else>
      <v-col
        v-for="sponsor in publishedSponsors"
        :key="sponsor.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            flat
            rounded="0"
            variant="outlined"
            class="h-100 rounded-xl d-flex flex-column sponsor-card overflow-hidden border-opacity-50"
            :class="{ 'border-black elevation-0': isHovering }"
            :style="`border-color: ${isHovering ? sponsor.color : '#e0e0e0'} !important; transition: all 0.2s ease-out;`"
          >
            <div class="position-relative overflow-hidden" style="height: 200px;">
              <v-img
                v-if="sponsor.logoUrl"
                :src="sponsor.logoUrl"
                class="transition-all image-sponsor w-100"
                :class="isHovering ? 'grayscale-0 scale-104' : 'grayscale-100'"
                cover
                height="200"
              >
                <div class="d-flex justify-end pa-4">
                  <v-chip
                    rounded="0"
                    size="small"
                    variant="flat"
                    class="rounded-lg font-weight-bold text-uppercase tracking-wider backdrop-blur"
                    :color="isHovering ? 'white' : 'black'"
                    :class="isHovering ? 'text-black' : 'text-white'"
                  >
                    {{ sponsor.category }}
                  </v-chip>
                </div>
              </v-img>
            </div>

            <v-card-item class="pt-5 pb-2">
              <v-card-title class="text-h6 font-weight-bold text-uppercase mb-1">
                {{ sponsor.name }}
              </v-card-title>
              <!-- ✅ tagline (new field from your DB) -->
              <v-card-subtitle v-if="sponsor.tagline" class="text-body-2 opacity-50 mb-1">
                {{ sponsor.tagline }}
              </v-card-subtitle>
              <v-card-subtitle class="text-body-2 opacity-70 mb-3">
                {{ sponsor.description }}
              </v-card-subtitle>
            </v-card-item>

            <v-spacer />

            <v-card-actions class="px-4 pb-4">
              <v-row density="comfortable" align="center" justify="space-between">
                <v-col cols="9">
                  <!-- ✅ fixed: addressText not address -->
                  <div v-if="sponsor.addressText" class="d-flex align-start text-caption opacity-60">
                    <v-icon icon="mdi-map-marker-outline" size="small" class="mr-1 mt-1" />
                    <span style="line-height: 1.2;">{{ sponsor.addressText }}</span>
                  </div>
                </v-col>

                <v-col cols="2" class="text-end">
                  <v-btn
                    v-if="sponsor.website"
                    :href="sponsor.website"
                    size="large"
                    target="_blank"
                    variant="outlined"
                    rounded="lg"
                    density="compact"
                    :color="isHovering ? sponsor.color : 'medium-emphasis'"
                    icon="mdi-arrow-top-right-thin"
                    aria-label="Visit website"
                  />
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <section class="sponsors-thanks mt-16">
      <v-divider class="mb-6" />
      <p class="thanks-text">
        {{ pageContent.footerText }}
      </p>
    </section>
  </v-container>
</template>

<style scoped>
.grayscale-100 {
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}
.grayscale-0 {
  filter: grayscale(0%);
}
.scale-104 {
  transform: scale(1.04);
}
.transition-all {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.tracking-wide {
  letter-spacing: 0.1em !important;
}
.tracking-wider {
  letter-spacing: 0.15em !important;
}
.backdrop-blur {
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.sponsor-card {
  min-width: 220px;
}
.sponsors-thanks {
  text-align: center;
}
.thanks-text {
  max-width: 720px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.65);
}
</style>