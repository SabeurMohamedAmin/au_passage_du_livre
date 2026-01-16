<script lang="ts" setup>
  const speakers = Array.from({ length: 4 }, (_, i) => ({
    name: ['Sarah Connor', 'John Doe', 'Emily Smith', 'Michael Brown'][i],
    role: ['Product Lead', 'Tech Lead', 'Designer', 'Developer'][i],
    company: ['Google', 'Netflix', 'Airbnb', 'Spotify'][i],
  }))
</script>

<template>
  <v-container id="speakers_grid" class="my-5 my-md-10 scroll-mt-6">
    <div class="mb-16">
      <h2 class="text-h3 font-weight-black opacity-70">World Class Speakers</h2>
      <p class="text-h6 text-medium-emphasis mt-4 font-weight-regular">Learn from the experts behind your favorite technologies.</p>
    </div>

    <v-row>
      <v-col v-for="(speaker, i) in speakers" :key="i" cols="12" sm="6" md="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card 
            v-bind="props"
            class="rounded-xl overflow-hidden cursor-pointer" 
            :elevation="isHovering ? 10 : 0"
            color="transparent"
          >
            <div class="overflow-hidden rounded-xl position-relative mb-4">
              <v-img 
                :src="`https://picsum.photos/200/300/?blur=2&random=${i+10}`" 
                height="350" 
                cover 
                class="transition-transform duration-500"
                :class="{'scale-110': isHovering}"
              ></v-img>
              
              <!-- Social Icons Overlay -->
              <v-expand-transition>
                <div v-if="isHovering" class="position-absolute bottom-0 w-100 pa-4 d-flex justify-center gap-2 bg-gradient-to-t">
                    <v-btn icon="mdi-twitter" variant="flat" color="white" size="small" density="comfortable"></v-btn>
                    <v-btn icon="mdi-linkedin" variant="flat" color="white" size="small" density="comfortable"></v-btn>
                    <v-btn icon="mdi-web" variant="flat" color="white" size="small" density="comfortable"></v-btn>
                </div>
              </v-expand-transition>
            </div>
            <div class="text-center">
              <h3 class="text-h6 font-weight-bold text-grey-darken-3">{{ speaker.name }}</h3>
              <div class="text-body-2 text-primary font-weight-bold">{{ speaker.company }}</div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    
    <div class="text-center mt-12">
      <v-btn
        size="large"
        variant="outlined"
        rounded="pill"
        class="px-8 border-grey-darken-1 text-grey-darken-3"
        :to="$localePath('/artistes-et-intervenants')"
      >
        View All Speakers
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

.lh-1 { line-height: 1.1; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-8 { gap: 32px; }
.tracking-tighter { letter-spacing: -1px; }
.tracking-widest { letter-spacing: 2px; }
.rounded-l-circle { border-radius: 50% 0 0 50%; }

/* ANIMATIONS */
.hover-btn, .hover-bg-light { transition: transform 0.3s ease; }
.hover-btn:hover { backdrop-filter: contrast(90%);}


.hover-bg-light:hover {
  transform: scale(1.1);
}

</style>