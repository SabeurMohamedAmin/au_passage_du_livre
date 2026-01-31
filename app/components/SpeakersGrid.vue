<script lang="ts" setup>
  import { useDisplay } from 'vuetify'
  const { sm, md, lgAndUp } = useDisplay()
  
  const {authors} = useEventHeroContent().content;
  const MAX_VISIBLE_AUTHORS = 3;
  const visibleAuthors = computed(() =>{
    return authors.slice(0, MAX_VISIBLE_AUTHORS)
  });

  const hasMoreAuthors = computed(()=>true)

  const customDanse = computed(()=>{
    if(lgAndUp.value){return false}
    if(md.value){return true}
    if(sm.value){return false}
    else{return true}
  });
</script>

<template>
  <!-- Header (same UX as Articles) -->
  <v-row class="mb-6" justify="space-between">
    <!-- Title -->
    <v-col cols="12" md="8">
      <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
        Intervenants et artistes
      </h2>
      <p class="text-body-1 text-medium-emphasis">
        Découvrez les intervenants et artistes qui participent à nos événements culturels.
      </p>
    </v-col>
  
    <!-- Button -->
    <v-col
      cols="12"
      md="4"
      class="d-flex justify-start justify-md-end mt-4 mt-md-0"
    >
      <v-btn
        color="primary"
        variant="outlined"
        class="font-weight-bold text-body-1 rounded-xl"
        :to="$localePath('/artistes-et-intervenants')"
      >
        Voir tous les intervenants
        <v-icon end icon="mdi-arrow-right" />
      </v-btn>
    </v-col>
  </v-row>
  
  <v-row :dense="customDanse" class="w-100 min-width-340">
    <v-col
      v-for="(author, index) in visibleAuthors"
      :key="index" cols="6" md="3"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card 
          v-bind="props"
          class="rounded-xl overflow-hidden pb-4" 
          :elevation="isHovering ? 10 : 0"
          color="transparent"
        >
          <div class="overflow-hidden rounded-xl position-relative mb-4">
            <v-img 
              class="transition-transform duration-500"
              :src="author.image" 
              height="380" 
              cover 
            />
            <!-- Social Icons Overlay -->
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="position-absolute bottom-0 w-100 pa-4 d-flex justify-center gap-2 bg-gradient-to-t"
              >
  
                <nuxt-link 
                 :to="author.website"
                  target="_blank"
                >
                  <v-btn icon="mdi-twitter" variant="flat" color="white" density="comfortable"></v-btn>
                </nuxt-link>
  
                <nuxt-link 
                 :to="author.facebook"
                  target="_blank"
                >
                  <v-btn icon="mdi-facebook" variant="flat" color="white" density="comfortable"></v-btn>
                </nuxt-link>
  
                <nuxt-link 
                 :to="author.website"
                  target="_blank"
                >
                  <v-btn
                    icon="mdi-web" variant="flat" 
                    color="white" density="comfortable"
                  />
                </nuxt-link>
              </div>
            </v-expand-transition>
          </div>
          <div class="text-center">
            <nuxt-link 
              :to="$localePath({name: 'guest-profile', params: {slug: author.slug}})"
              class="text-decoration-none text-grey-darken-3 text-h6 font-weight-bold"
              >
              {{ author.name }}
            </nuxt-link>
            <div class="text-body-2 text-primary font-weight-bold">
              {{ author.role }}
            </div>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  
    <!-- 2️⃣ More authors indicator (⋯) -->
    <v-col cols="6" md="3">
      <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 10 : 0"
            v-if="hasMoreAuthors"
            class="h-100 rounded-xl d-flex align-center justify-center"
            flat
            >
            <nuxt-link :to="$localePath('/artistes-et-intervenants')">
              <v-icon
                class="rounded-lg pa-10 opacity-60"                                
                title="see all artistes and intervenants" 
                :class="{'border elevation-1': isHovering}" 
                size="72"
              >
                mdi-arrow-right-bottom
              </v-icon>
            </nuxt-link>
          </v-card>
      </v-hover>
    </v-col>
  </v-row>
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
  .card-place>*{
    flex-grow: 1;
  }

  .min-width-340{
    min-width: 340px;
  }
</style>