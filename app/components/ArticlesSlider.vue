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
  <v-container>
  <v-row class="mb-2" align="center" justify="space-between">
    <!-- Title -->
    <v-col class="text-left" cols="12" md="8">
      <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
        Articles & Actualités
      </h2>
    </v-col>
  
    <!-- Button -->
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
    <v-col>
      <p class="text-body-1 text-medium-emphasis">
        Découvrez nos réflexions, projets et temps forts culturels.
      </p>
    </v-col>
  </v-row>
  <v-carousel
    hide-delimiters
    show-arrows
    cycle
    height="420"
    class="rounded-xl"
  >
    <v-carousel-item v-for="(post, i) in props.blogPosts" :key="i">
      <v-card class="fill-height rounded-xl overflow-hidden elevation-6">
        <v-img cover :src="post.image" class="fill-height">
          <!-- Overlay -->
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
                :to="$localePath(post.slug)"
              >
                Lire l’article
              </v-btn>
            </div>
          </div>
        </v-img>
      </v-card>
    </v-carousel-item>
  </v-carousel>
  </v-container>
</template>

<style>
  .bg-transparent-gradient{
    width: 100%;
    background-color: rgba(166, 166, 166, 0.25);
    backdrop-filter: blur(4px);
  }
</style>