<script setup lang="ts">
  import { useTheme } from 'vuetify'

  const theme = useTheme();
  const logoSrc = computed(() =>
    theme.global.current.value.dark
      ? '/img/logos/main/logo_aupassagedulivre-dark.svg'
      : '/img/logos/main/logo_aupassagedulivre.svg'
  );
</script>        

<template>
  
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="pe-md-12">
        <div class="d-flex align-center justify-center justify-md-start mb-6">
          <nuxt-img
            :src="logoSrc" alt="Au passage du livre" 
            class="me-4"
            width="48"
            height="48"
          />
          <span class="text-h5 font-weight-black">
            Au passage du livre
          </span>
        </div>
        <p class="text-start text-grey-lighten-1 mb-6 text-body-2">
          {{$t('hero_events')}} {{$t('hero_support_artists')}} {{$t('hero_transmit_culture')}}
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
          {{$t('footer_explore')}}
        </div>
        <div class="d-flex flex-column gap-2 text-body-2">
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('footer_about')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/evenements#future_events')" class="rounded-lg py-1 hover-btn text-decoration-none text-surface-intervan opacity-70">
            {{$t('footer_schedule')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/artistes-et-intervenants')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('footer_speakers')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/blog')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('footer_blog')}}
          </nuxt-link>
        </div>
      </v-col>

      <v-col cols="6" md="2">
        <div class="text-subtitle-1 font-weight-bold mb-6">{{$t('footer_support')}}</div>
        <div class="d-flex flex-column gap-2 text-body-2">
          <nuxt-link :to="$localePath('/contactez-nous')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('contact us')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('footer_faq')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none opacity-70">
            {{$t('footer_privacy')}}
          </nuxt-link>
          <nuxt-link :to="$localePath('/about-us')" class="rounded-lg py-1 hover-btn text-decoration-none  opacity-70">
            {{$t('footer_terms')}}
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
      &copy; {{new Date().getFullYear()}} {{ $t('copyright') }}
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