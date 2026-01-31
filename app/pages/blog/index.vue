<script setup lang="ts">
  const { articles } = useArticles();
  const search = ref('');
  const activeCategory = ref('All');

  // Extract unique categories from articles
  const categories = computed(() => {
    const cats = new Set(articles.value.map(a => a.category));
    return ['All', ...Array.from(cats)];
  })

  // Filter Logic: Search + Category
  const filteredArticles = computed(() => {
    let temp = articles.value;

    // 1. Filter by Category
    if (activeCategory.value !== 'All') {
      temp = temp.filter(a => a.category === activeCategory.value);
    }

    // 2. Filter by Search
    if (search.value) {
      const q = search.value.toLowerCase();
      temp = temp.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.summary.toLowerCase().includes(q)
      );
    }

    return temp;
  })

  // The most recent article to show as "Hero" (if searching, hide hero to avoid confusion)
  const heroArticle = computed(() => {
    return (!search.value && activeCategory.value === 'All') ? articles.value[0] : null;
  })

  // The list excluding the hero (if hero exists)
  const listArticles = computed(() => {
    if (heroArticle.value) {
      return filteredArticles.value.filter(a => a.id !== heroArticle.value?.id);
    }
    return filteredArticles.value;
  })

  useHead({ title: 'News & Stories - Our Association' });
</script>

<template>
  <v-container class="py-6">
    <header class="mb-10">
      <div class="d-flex mb-4">
        <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
          Association Journal
        </h2>
      </div>
      <p class="text-subtitle-1 text-medium-emphasis max-w-lg">
        Discover the latest updates from the field,
        volunteer stories, and upcoming charity events.
      </p>
    </header>

    <v-row class="mb-8 align-center">
      <v-col cols="12" md="8">
        <v-tabs v-model="activeCategory" color="primary" align-tabs="start">
          <v-tab
            v-for="cat in categories" 
            :key="cat" 
            :value="cat" 
            class="text-capitalize"
          >
            {{ cat }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          hide-details
          rounded="lg"
          variant="outlined"
          label="Search articles..."
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>

    <section v-if="heroArticle" class="mb-12">
      <v-card 
        class="rounded-xl overflow-hidden" 
        elevation="4"
      >
        <v-row no-gutters>
          <v-col cols="12" md="7">
            <v-img 
              :src="heroArticle.image"
              min-height="400"
              height="100%"
              cover
            />
          </v-col>
          <v-col
            cols="12"
            md="5"
            class=" d-flex flex-column justify-center pa-8"
          >
            <v-chip
              class="mb-4 align-self-start font-weight-bold"
              color="secondary"
            >
              FEATURED STORY
            </v-chip>
            <h2 class="text-h4 font-weight-bold mb-4">
              {{ heroArticle.title }}
            </h2>
            <p class="text-body-1 mb-6">
              {{ heroArticle.summary }}
            </p>
            <section class="d-flex align-center mt-auto">
              <v-avatar size="40" class="mr-3 border">
                <v-img :src="heroArticle.authorImage" />
              </v-avatar>
              <div>
                <p class="font-weight-bold">
                  {{ heroArticle.author }}
                </p>
                <p class="text-caption">
                  Posted on {{ new Date(heroArticle.date).toLocaleDateString() }}
                </p>
              </div>
              <nuxt-link
                class="ms-auto align-self-end text-decoration-none text-primary text-button text-capitalize font-weight-bold"
                :to="$localePath(`/blog/${heroArticle.slug}`)"
              >
                Read
                <v-icon 
                  icon="mdi-arrow-right"
                  size="small" class="ml-1"
                />
              </nuxt-link>
            </section>
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
      <v-icon icon="mdi-newspaper-variant-outline" size="64" class="mb-4" />
      <h3 class="text-h6 ">
        No articles found
      </h3>
      <p class="text-caption">
        Try adjusting your search or category.
      </p>
    </div>
  </v-container>
</template>