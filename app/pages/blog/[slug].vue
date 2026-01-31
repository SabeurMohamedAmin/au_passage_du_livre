<script setup lang="ts">
const route = useRoute()
const { getArticleBySlug, articles } = useArticles()
const { slug } = route.params as { slug: string }

// 1. Fetch current article
const article = computed(() => getArticleBySlug(slug))

// 2. Fetch "Related" articles (Same category, excluding current)
const relatedArticles = computed(() => {
  if (!article.value) return []
  return articles.value
    .filter(a => a.category === article.value?.category && a.id !== article.value.id)
    .slice(0, 3) // Limit to 3
})

// 3. Social Share Mockup
const shareLinks = [
  { icon: 'mdi-facebook', color: 'blue-darken-4' },
  { icon: 'mdi-twitter', color: 'blue-lighten-1' },
  { icon: 'mdi-linkedin', color: 'blue-darken-3' },
  { icon: 'mdi-email', color: 'grey-darken-1' },
]

useHead({
  title: article.value ? `${article.value.title}` : 'Article not found',
  meta: [
    { name: 'description', content: article.value?.summary }
  ]
})
</script>

<template>
  <div v-if="article">
    <v-img
      :src="article.image"
      height="450"
      cover
      gradient="to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)"
      class="align-end px-1"
    >
      <v-container class="mb-4 bg-glassy border-md rounded-xl">
        <v-chip color="secondary" class="mb-4 font-weight-bold">
          {{ article.category }}
        </v-chip>
        <h1 class="w-100 text-h6 text-sm-h5 text-md-h4 font-weight-black opacity-70 text-transparent-inverse-70">
          {{ article.title }}
        </h1>
        <div class="text-transparent-inverse-70 d-flex align-center mt-4">
          <v-avatar size="32" class="mr-3 border">
             <v-img :src="article.authorImage" />
          </v-avatar>
          <span class="font-weight-medium mr-4">
            {{ article.author }}
          </span>
          <v-icon icon="mdi-circle-small" class="mr-2"/>
          <span>
            {{ new Date(article.date).toLocaleDateString() }}
          </span>
        </div>
      </v-container>
    </v-img>

    <v-container class="py-10">
      <v-row>
        <v-col cols="12" md="8" lg="8">
          <NuxtLink 
            :to="$localePath('/blog')"
            class="text-decoration-none d-inline-flex align-center text-primary font-weight-bold mb-6 border-lg border-primary rounded-xl pa-1 px-2"
          >
            <v-icon icon="mdi-arrow-left" class="mr-1"/>
            Retour au Blog
          </NuxtLink>

          <div class="article-body text-body-1 text-transparent-70">
             <div v-html="article.content" ></div>
          </div>

          <v-sheet rounded="lg" color="primary-lighten-5" class="pa-8 mt-12 d-flex flex-column flex-md-row align-center text-center text-md-left border-dashed">
            <v-icon icon="mdi-hand-heart" size="48" color="primary" class="mr-md-6 mb-4 mb-md-0"></v-icon>
            <div>
              <h3 class="text-h6 font-weight-bold text-primary mb-1">Support Our Mission</h3>
              <p class="text-body-2 mb-0">Your contributions help us create more stories like this.</p>
            </div>
            <v-spacer/>
            <v-btn color="primary" class="mt-4 mt-md-0 ml-md-4" elevation="2">
              Donate Now
            </v-btn>
          </v-sheet>
        </v-col>

        <v-col cols="12" md="4" lg="3" offset-lg="1">
          <div class="sticky-sidebar">
            <h4 class="text-overline font-weight-bold text-transparent-70 mb-4">
              Share this article
            </h4>
            <div class="d-flex gap-2 mb-10">
              <v-btn
                v-for="(link, i) in shareLinks"
                :key="i"
                :icon="link.icon"
                :color="link.color"
                variant="tonal"
                size="small"
                class="mr-2"
              ></v-btn>
            </div>

            <v-divider class="mb-6"></v-divider>

            <h4 class="text-overline font-weight-bold text-grey mb-4">Related News</h4>
            <div v-for="related in relatedArticles" :key="related.id" class="mb-6">
               <NuxtLink :to="$localePath(`/blog/${related.slug}`)" class="text-decoration-none text-high-emphasis">
                 <v-img :src="related.image" height="120" cover class="rounded mb-2"></v-img>
                 <div class="text-subtitle-2 font-weight-bold line-clamp-2 hover-underline">
                   {{ related.title }}
                 </div>
                 <div class="text-caption text-grey mt-1">
                   {{ new Date(related.date).toLocaleDateString() }}
                 </div>
               </NuxtLink>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .bg-glassy {
    background-color: rgba(100, 100, 100, 0.05);
    backdrop-filter: blur(12px);
  }
/* Typography for the injected HTML */
.article-body :deep(h2) { font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111; }
.article-body :deep(h3) { font-size: 1.4rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 1rem; }
.article-body :deep(p) { margin-bottom: 1.5rem; line-height: 1.8; font-size: 1.1rem; }
.article-body :deep(ul), .article-body :deep(ol) { margin-bottom: 1.5rem; padding-left: 1.5rem; }
.article-body :deep(blockquote) { border-left: 4px solid var(--v-theme-primary); padding-left: 1rem; font-style: italic; color: #555; background: #f9f9f9; padding: 1rem; border-radius: 0 8px 8px 0; }

.shadow-text {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
.sticky-sidebar { 
  position: sticky;
  top: 100px;
}
.line-clamp-2 { 
  display: -webkit-box; 
  line-clamp: 2; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical; 
  overflow: hidden;
}
.hover-underline:hover { text-decoration: underline; color: rgb(var(--v-theme-primary)); }

.text-transparent-inverse-70 {
  color: rgba(255, 255, 255, 0.5);
}
.text-transparent-70 {
  color: rgba(var(--v-theme-on-surface), 0.70);
  
}
</style>