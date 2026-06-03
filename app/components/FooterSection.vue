<script setup lang="ts">
  import { useTheme } from 'vuetify'

  const theme = useTheme();
  const logoSrc = computed(() =>
    theme.global.current.value.dark
      ? '/img/logos/main/logo-1.svg'
      : '/img/logos/main/logo-1.svg'
  );
</script>        

<template>
  <v-container fluid class="footer-modern pa-0">
    <div class="footer-content-wrapper">
      <v-container>
        <v-row align="center" class="flex-nowrap flex-md-nowrap">
          <!-- Left Section - Navigation & Info -->
          <v-col cols="12" md="7" lg="6" class="pe-md-8">
            <v-row>
              <v-col cols="12" class="pb-2">
                <div class="text-left text-h4 font-weight-black mb-2 text-gradient">
                  Au passage du livre
                </div>
                <p class="text-left text-body-2 opacity-80 mb-6" style="max-width: 400px;">
                  {{$t('hero_events')}} {{$t('hero_support_artists')}} {{$t('hero_transmit_culture')}}
                </p>
              </v-col>
              
              <v-col cols="6" md="5">
                <div class="ml-4 text-left text-subtitle-1 font-weight-bold mb-4 text-uppercase tracking-wider">
                  {{$t('footer_explore')}}
                </div>
                <div class="d-flex flex-column gap-3">
                  <nuxt-link :to="$localePath('/about-us')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_about')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/evenements#future_events')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_schedule')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/artistes-et-intervenants')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_speakers')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/blog')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_blog')}}
                  </nuxt-link>
                </div>
              </v-col>

              <v-col cols="6" md="5">
                <div class="ml-4 text-left text-subtitle-1 font-weight-bold mb-4 text-uppercase tracking-wider">
                  {{$t('footer_support')}}
                </div>
                <div class="d-flex flex-column gap-3">
                  <nuxt-link :to="$localePath('/contactez-nous')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('contact us')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/about-us')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_faq')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/about-us')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_privacy')}}
                  </nuxt-link>
                  <nuxt-link :to="$localePath('/about-us')" class="footer-link text-decoration-none">
                    <v-icon icon="mdi-chevron-right" size="small" class="me-2" />
                    {{$t('footer_terms')}}
                  </nuxt-link>
                </div>
              </v-col>

              <v-col cols="12" class="pt-4">
                <div class="d-flex gap-3 align-center">
                  <nuxt-link to="#" class="text-primary text-decoration-none">
                    <v-btn
                      icon="mdi-twitter"
                      variant="outlined"
                      density="comfortable"
                      size="large"
                      class="social-btn"
                      rounded="lg"
                    />
                  </nuxt-link>
                  <nuxt-link rel="noopener noreferrer" target="_blank" to="https://www.facebook.com/profile.php?id=61577974919681" class="text-primary text-decoration-none">
                    <v-btn
                      icon="mdi-facebook"
                      variant="outlined"
                      density="comfortable"
                      size="large"
                      class="social-btn"
                      rounded="lg"
                    />
                  </nuxt-link>
                  <nuxt-link to="" class="text-primary text-decoration-none">
                    <v-btn
                      icon="mdi-instagram"
                      variant="outlined"
                      density="comfortable"
                      size="large"
                      class="social-btn"
                      rounded="lg"
                    />
                  </nuxt-link>
                </div>
              </v-col>
            </v-row>
          </v-col>
          
          <!-- Right Section - Large Logo -->
          <v-col cols="12" md="5" lg="6" class="d-flex align-center justify-center justify-md-end">
            <div class="logo-wrapper position-relative">
              <div class="logo-glow-effect"></div>
              <nuxt-img
                :src="logoSrc" 
                alt="Au passage du livre - Festival Culturel" 
                class="footer-logo-main"
                width="400"
                height="auto"
                sizes="300px 400px"
              />
              <div class="logo-badge">
                <v-icon icon="mdi-book-open-page-variant" size="large" />
              </div>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-12 border-opacity-25"/>
                  
        <div class="text-center text-caption opacity-60 pb-4">
          &copy; {{new Date().getFullYear()}} {{ $t('copyright') }}
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
.footer-modern {
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  position: relative;
  overflow: hidden;
}

.footer-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(var(--v-theme-primary), 0.6) 50%, 
    transparent 100%
  );
}

.footer-content-wrapper {
  position: relative;
  z-index: 1;
}

.text-gradient {
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 1) 0%, rgba(var(--v-theme-secondary), 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tracking-wider {
  letter-spacing: 2px;
}

.gap-3 {
  gap: 12px;
}

.footer-link {
  color: rgba(var(--v-theme-on-surface), 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.footer-link:hover {
  color: rgba(var(--v-theme-primary), 1);
  transform: translateX(4px);
}

.footer-link .v-icon {
  transition: transform 0.3s ease;
  opacity: 0;
  transform: translateX(-8px);
}

.footer-link:hover .v-icon {
  transform: translateX(0);
  opacity: 1;
}

.social-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-width: 2px;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(var(--v-theme-primary), 0.3);
}

/* Logo Section */
.logo-wrapper {
  position: relative;
  padding: 2rem;
  animation: logoFloat 6s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.logo-glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.15) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

.footer-logo-main {
  max-width: 400px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-logo-main:hover {
  filter: drop-shadow(0 30px 60px rgba(var(--v-theme-primary), 0.3));
  transform: scale(1.05);
}

.logo-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(var(--v-theme-primary), 1);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(var(--v-theme-primary), 0.4);
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Responsive */
@media (max-width: 960px) {
  .footer-logo-main {
    max-width: 280px;
  }
  
  .logo-wrapper {
    padding: 1rem;
  }
  
  .text-gradient {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 600px) {
  .footer-logo-main {
    max-width: 220px;
  }
  
  .logo-badge {
    width: 40px;
    height: 40px;
    bottom: 10px;
    right: 10px;
  }
}

/* Dark mode adjustments */
.v-theme--dark .footer-modern {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%);
}

.v-theme--dark .logo-glow-effect {
  background: radial-gradient(circle, rgba(var(--v-theme-primary), 0.2) 0%, transparent 70%);
}
</style>