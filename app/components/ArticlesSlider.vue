<script setup lang="ts">
type BlogPost = {
  title:string
  slug: string
  image: string
  excerpt: string
}

const props = defineProps<{
  blogPosts: BlogPost[]
}>()
</script>

<template>
  <v-row class="mb-2" align="center" justify="space-between">
      <v-col class="text-left" cols="12" md="8">
        <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
          Articles & Actualités
        </h2>
      </v-col>
      <v-col class="d-flex justify-start justify-md-end mt-0" cols="12" md="4">
        <v-btn
          class="font-weight-bold text-body-1"
          :to="$localePath('/blog')"
          color="primary"
          variant="outlined"
          rounded="pill"
        >
          Voir tous les articles
          <v-icon end icon="mdi-arrow-right" />
        </v-btn>
      </v-col>
    </v-row>

    <!-- 1️⃣ Added class "article-carousel" here -->
    <v-carousel
      height="420"
      class="rounded-xl article-carousel"
      hide-delimiters
      show-arrows="hover"
      crossfade
      cycle
    >
      <!-- 2️⃣ Removed the <template> slots for arrows -->
      <!-- We style the default buttons directly via CSS instead of replacing them -->
      
      <v-carousel-item v-for="(post, i) in props.blogPosts" :key="i">
        <v-card class="fill-height rounded-xl overflow-hidden elevation-6">
          <v-img cover :src="post.image" class="fill-height">
            <div class="bg-gradient-to-t fill-height d-flex align-end pa-8">
              <div class="bg-transparent-gradient pa-2 rounded-xl">
                <h3 class="text-h5 font-weight-black mb-2">
                  {{ post.title }}
                </h3>
                <p class="text-body-1 opacity-90 mb-6 max-w-600">
                  {{ post.excerpt }}
                </p>
                <v-btn
                  color="primary"
                  rounded="pill"
                  class="font-weight-bold"
                  :to="$localePath({name:'article-details' , slug:post.slug})"
                >
                  Lire l’article
                </v-btn>
              </div>
            </div>
          </v-img>
        </v-card>
      </v-carousel-item>
    </v-carousel>
</template>

<style>
  /* ==========================================================================
   CAROUSEL CONTROLS OVERRIDE
   Targeting .v-window__left and .v-window__right inside .article-carousel
   ========================================================================== */

/* --- Base Button Styles --- */
.article-carousel .v-window__left,
.article-carousel .v-window__right {
  width: 48px !important;
  height: 48px !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 !important; /* Reset default margins */
  /* Reset default v-btn styles */
  background: transparent; 
  box-shadow: none !important;
}

/* --- Positioning --- */
.article-carousel .v-window__left {
  left: -10px !important;
}

.article-carousel .v-window__right {
  right: -10px !important;
}

/* --- LIGHT MODE (Default) --- */
.article-carousel .v-window__left,
.article-carousel .v-window__right {
  background: rgba(255, 255, 255, 0.20) !important;
  border: 1px solid rgba(100, 100, 100, 0.5) !important; /* Slightly stronger border for visibility on images */
  border-radius: 16px;
  color: #ffffffae !important; /* Force white icon on images */
}

/* --- Hover State --- */
.article-carousel .v-window__left:hover,
.article-carousel .v-window__right:hover {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #1a1a1a !important; /* Dark icon on white background */
  transform: scale(1.1);
}

/* --- DARK MODE OVERRIDES --- */
.v-theme--dark .article-carousel .v-window__left,
.v-theme--dark .article-carousel .v-window__right {
  background: rgba(30, 30, 30, 0.65) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #ffffff !important;
}

.v-theme--dark .article-carousel .v-window__left:hover,
.v-theme--dark .article-carousel .v-window__right:hover {
  border-color: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.1);
}

/* --- Helper Classes --- */
.bg-transparent-gradient {
  width: 100%;
  background-color: rgba(166, 166, 166, 0.25);
  backdrop-filter: blur(4px);
}

</style>