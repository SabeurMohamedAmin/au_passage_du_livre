<script setup lang="ts">
const { articles } = useArticles();
const search = ref('')
const activeCategory = ref('All')

// Extract unique categories from articles
const categories = computed(() => {
  const cats = new Set(articles.value.map(a => a.category))
  return ['All', ...Array.from(cats)]
})

// Filter Logic: Search + Category
const filteredArticles = computed(() => {
  let temp = articles.value

  // 1. Filter by Category
  if (activeCategory.value !== 'All') {
    temp = temp.filter(a => a.category === activeCategory.value)
  }

  // 2. Filter by Search
  if (search.value) {
    const q = search.value.toLowerCase()
    temp = temp.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.summary.toLowerCase().includes(q)
    )
  }

  return temp
})

// The most recent article to show as "Hero" (if searching, hide hero to avoid confusion)
const heroArticle = computed(() => {
  return (!search.value && activeCategory.value === 'All') ? articles.value[0] : null
})

// The list excluding the hero (if hero exists)
const listArticles = computed(() => {
  if (heroArticle.value) {
    return filteredArticles.value.filter(a => a.id !== heroArticle.value?.id)
  }
  return filteredArticles.value
})

useHead({ title: 'News & Stories - Our Association' })
</script>

<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h3 font-weight-bold text-primary mb-3">Association Journal</h1>
      <p class="text-subtitle-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
        Discover the latest updates from the field, volunteer stories, and upcoming charity events.
      </p>
    </div>

    <v-row class="mb-8 align-center">
      <v-col cols="12" md="8">
        <v-tabs v-model="activeCategory" color="primary" align-tabs="start">
          <v-tab v-for="cat in categories" :key="cat" :value="cat" class="text-capitalize">
            {{ cat }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          variant="outlined"
          label="Search articles..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          rounded="lg"
        />
      </v-col>
    </v-row>

    <section v-if="heroArticle" class="mb-12">
      <v-card 
        :to="$localePath(`/blog/${heroArticle.slug}`)"
        class="rounded-xl overflow-hidden" 
        elevation="4"
      >
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-img :src="heroArticle.image" height="100%" min-height="400" cover />
          </v-col>
          <v-col cols="12" md="5" class="bg-primary-darken-1 d-flex flex-column justify-center pa-8">
            <v-chip color="secondary" class="mb-4 align-self-start font-weight-bold">
              FEATURED STORY
            </v-chip>
            <h2 class="text-h4 font-weight-bold mb-4">
              {{ heroArticle.title }}
            </h2>
            <p class="text-body-1 mb-6 text-grey-lighten-4">
              {{ heroArticle.summary }}
            </p>
            <div class="d-flex align-center mt-auto">
              <v-avatar size="40" class="mr-3 border">
                <v-img :src="heroArticle.authorImage" />
              </v-avatar>
              <div>
                <div class="font-weight-bold">
                  {{ heroArticle.author }}
                </div>
                <div class="text-caption text-grey-lighten-2">
                  Posted on {{ new Date(heroArticle.date).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </section>

    <v-row>
      <v-col 
        v-for="article in listArticles" 
        :key="article.id" 
        cols="12" 
        sm="6" 
        md="4"
      >
        <BlogCard :article="article" />
      </v-col>
    </v-row>

    <div v-if="filteredArticles.length === 0" class="text-center py-16">
      <v-icon icon="mdi-newspaper-variant-outline" size="64" color="grey-lighten-2" class="mb-4" />
      <h3 class="text-h6 text-grey">No articles found</h3>
      <p class="text-caption text-grey">Try adjusting your search or category.</p>
    </div>
  </v-container>
</template>