<script setup lang="ts">

</script>        

<template>
  
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="pe-md-12">
        <div class="d-flex align-center justify-center justify-md-start mb-6">
          <v-icon icon="mdi-atom" color="primary" size="32" class="me-2"/>
          <span class="text-h5 font-weight-black">
            EVENTE
          </span>
        </div>
        <p class="text-grey-lighten-1 mb-6 text-body-2">
          The premier conference for digital creators.
          Connecting minds, sparking innovation, and building the future.
        </p>
        <div class="d-flex gap-4 justify-center justify-md-start">
          <!-- Link to socials media -->

          <nuxt-link to="#" class="text-primary text-decoration-none opacity-70">
            <v-btn
              icon="mdi-twitter"
              variant="tonal"
              density="comfortable"
              class="hover-bg-light"
            />
          </nuxt-link>
          <nuxt-link to="https://www.facebook.com/profile.php?id=61577974919681é" class="text-primary text-decoration-none opacity-70">
            <v-btn
              icon="mdi-facebook"
              variant="tonal"
              density="comfortable"
              class="hover-bg-light"
            />
          </nuxt-link>

          <nuxt-link to="" class="text-primary text-decoration-none opacity-70">
            <v-btn
              icon="mdi-instagram"
              variant="tonal"
              density="comfortable"
              class="hover-bg-light"
            />
          </nuxt-link>
        </div>
      </v-col>
      
      <v-col cols="6" md="2">
        <div class="text-subtitle-1 font-weight-bold mb-6">
          Explore
        </div>
        <div class="d-flex flex-column gap-2 text-body-2">
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            About Us
          </nuxt-link>
          <nuxt-link :to="$localePath('/evenements#future_events')" class="rounded-lg py-1 hover-btn text-decoration-none text-surface-intervan opacity-70">
            Schedule
          </nuxt-link>
          <nuxt-link :to="$localePath('/artistes-et-intervenants')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            Speakers
          </nuxt-link>
          <nuxt-link :to="$localePath('/blog')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            Blog
          </nuxt-link>
        </div>
      </v-col>

      <v-col cols="6" md="2">
        <div class="text-subtitle-1 font-weight-bold mb-6">Support</div>
        <div class="d-flex flex-column gap-2 text-body-2">
          <nuxt-link :to="$localePath('/contactez-nous')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            Contact
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            FAQ
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            Privacy Policy
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none  opacity-70">
            Terms
          </nuxt-link>
        </div>
      </v-col>

      <!-- Newsletter  Will be disabled for now -->
      <!--
        <v-col cols="12" md="4">
          <div class="text-subtitle-1 font-weight-bold text-white mb-6">
            Stay Updated
          </div>
          <v-text-field 
            placeholder="Enter your email" 
            variant="outlined" 
            density="comfortable" 
            color="primary"
            rounded="pill"
            hide-details
          >
          <template v-slot:append-inner >
              <v-btn
                color="primary" size="small"
                icon="mdi-arrow-right" variant="flat"
                class="px-10 mx-0"
                rounded="pill"
              />
            </template>
          </v-text-field>
        </v-col>
      -->
    </v-row>
    <v-divider class="my-12 border-opacity-25"/>
          
    <div class="text-center text-caption text-grey">
      &copy; 2026 Evente Conference. All rights reserved.
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