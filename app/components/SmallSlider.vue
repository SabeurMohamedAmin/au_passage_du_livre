<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Autoplay, Navigation } from 'swiper/modules';

  // Swiper CSS
  import 'swiper/css'
  import 'swiper/css/pagination'
  import 'swiper/css/navigation'

  // --- MOCK DATA FOR BLOG ---
  const articles = [
    {
      id: 1,
      category: 'Development',
      title: 'What’s new in Nuxt 4?',
      excerpt: 'Explore the blazing fast features of the new server engine and how it improves cold starts.',
      date: 'Jan 10, 2026',
      author: 'Sebastien Chopin',
      image: 'https://picsum.photos/400/250?random=10',
      avatar: 'https://picsum.photos/100/100?random=101'
    },
    {
      id: 2,
      category: 'Design',
      title: 'Mastering Vuetify 3 Themes',
      excerpt: 'A deep dive into blueprints, SASS variables, and creating your own design system.',
      date: 'Jan 12, 2026',
      author: 'John Leider',
      image: 'https://picsum.photos/400/250?random=11',
      avatar: 'https://picsum.photos/100/100?random=102'
    },
    {
      id: 3,
      category: 'Community',
      title: 'The State of Vue 2026',
      excerpt: 'Key takeaways from this year’s survey. How the ecosystem is evolving.',
      date: 'Jan 15, 2026',
      author: 'Evan You',
      image: 'https://picsum.photos/400/250?random=12',
      avatar: 'https://picsum.photos/100/100?random=103'
    },
    {
      id: 4,
      category: 'Tutorial',
      title: 'TypeScript with Composition API',
      excerpt: 'Best practices for typing props, emits, and refs in your large scale applications.',
      date: 'Jan 16, 2026',
      author: 'Daniel Roe',
      image: 'https://picsum.photos/400/250?random=13',
      avatar: 'https://picsum.photos/100/100?random=104'
    }
  ];

  // Swiper Modules
  const modules = [Pagination, Autoplay, Navigation];

  // Responsive Breakpoints
  const swiperBreakpoints = {
    // Mobile
    320: {
      slidesPerView: 1.2, // Shows a peek of the next card
      spaceBetween: 16
    },
    // Tablet
    768: {
      slidesPerView: 2.2,
      spaceBetween: 24
    },
    // Desktop
    1024: {
      slidesPerView: 3,
      spaceBetween: 32
    }
  };
</script>

<template>
  <!-- 5. REPLACED: BLOG SLIDER SECTION -->
  <section class="my-5 my-md-10 scroll-mt-6 bg_surface_variant">
    <v-container class="my-5 my-md-10">
      
      <!-- Section Header -->
      <v-row justify="space-between" align="end" class="mb-8">
        <v-col cols="12" md="8">
          <span class="text-primary font-weight-bold text-overline text-h6">
            From the Blog
          </span>
          <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
            Latest News & Updates
          </h2>
        </v-col>
        <!-- Custom Navigation Buttons (Optional) -->
        <v-col cols="12" md="4" class="text-md-right d-none d-md-block">
           <div class="d-flex justify-end gap-2">
             <v-btn icon="mdi-arrow-left" variant="tonal" class="swiper-button-prev-custom rounded-circle" color="primary" />
             <v-btn icon="mdi-arrow-right" variant="flat" class="swiper-button-next-custom rounded-circle" color="primary" />
           </div>
        </v-col>
      </v-row>

      <!-- Swiper Slider -->
      <Swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="32"
        :breakpoints="swiperBreakpoints"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        class="pb-12 py-2 px-1"
      >
        <SwiperSlide v-for="article in articles" :key="article.id">
          <v-card
            class="rounded-xl h-100 border transition-swing elevation-2 hover-up"
            flat
            color="white"
          >
            <!-- Image Area -->
            <div class="position-relative">
              <v-img
                :src="article.image"
                height="200"
                cover
                class="rounded-t-xl align-end"
                gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%"
              >
                <v-chip
                  color="primary"
                  class="ma-4 font-weight-bold"
                  size="small"
                  variant="flat"
                >
                  {{ article.category }}
                </v-chip>
              </v-img>
            </div>

            <!-- Content Area -->
            <v-card-text class="pa-6 d-flex flex-column h-100">
              <div class="text-caption text-medium-emphasis mb-2 d-flex align-center">
                <v-icon icon="mdi-calendar" size="small" class="me-1" />
                {{ article.date }}
              </div>

              <h3 class="text-h5 font-weight-bold text-grey-darken-3 mb-3 line-clamp-2">
                {{ article.title }}
              </h3>

              <p class="text-body-2 text-medium-emphasis mb-6 line-clamp-3">
                {{ article.excerpt }}
              </p>

              <!-- Footer: Author & Read More -->
              <div class="mt-auto d-flex align-center justify-space-between pt-4 border-t border-dashed">
                <div class="d-flex align-center">
                  <v-avatar size="32" class="me-2 border">
                    <v-img :src="article.avatar" />
                  </v-avatar>
                  <span class="text-caption font-weight-bold text-grey-darken-2">
                    {{ article.author }}
                  </span>
                </div>
                
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  class="font-weight-bold px-0"
                  append-icon="mdi-arrow-right"
                >
                  Read
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </SwiperSlide>
      </Swiper>

    </v-container>
  </section>
</template>

<style scoped>
  /* Ensure the Swiper Pagination dots match your theme */
  :deep(.swiper-pagination-bullet-active) {
    background-color: rgb(var(--v-theme-primary)) !important;
    width: 24px;
    border-radius: 4px;
  }
  :deep(.swiper-pagination-bullet) {
    transition: all 0.3s ease;
  }

  /* Helper to truncate text */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Re-using your existing styles */
  .hover-up { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-up:hover { 
    outline: 2px solid blue;
    box-shadow: 0 12px 24px -4px rgba(0,0,0,0.15) !important;
  }
</style>