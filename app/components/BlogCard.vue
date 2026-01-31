<script setup lang="ts">
const props = defineProps<{
  article: Article
  loading?: boolean
}>();

// Calculate reading time (approx 200 words per minute)
const readingTime = computed(() => {
  const words = props.article.content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  })
};
</script>

<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      v-bind="hoverProps"
      :elevation="isHovering ? 8 : 2"
      class="h-100 d-flex flex-column transition-swing rounded-lg cursor-pointer"
    >
      <v-img
        :src="article.image"
        height="220"
        cover
        class="align-end"
        gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary"/>
          </div>
        </template>
        
        <v-chip
          color="primary"
          class="ma-2 font-weight-bold text-uppercase"
          size="small"
          style="position: absolute; top: 0; right: 0;"
        >
          {{ article.category }}
        </v-chip>
      </v-img>

      <v-card-item class="pt-4">
        <div class="d-flex align-center text-caption mb-2">
          <v-icon icon="mdi-calendar" size="small" class="mr-1"/>
          {{ formatDate(article.date) }}
          <span class="mx-2">•</span>
          <v-icon icon="mdi-clock-outline" size="small" class="mr-1"/>
          {{ readingTime }}
        </div>
        
        <div class="text-h6 font-weight-bold leading-tight mb-2">
          {{ article.title }}
        </div>
      </v-card-item>

      <v-card-text class="text-body-2 text-medium-emphasis">
        {{ article.summary }}
      </v-card-text>
      <v-spacer />
      <v-divider/>
      <v-card-actions class="px-4 py-3">
        <v-avatar size="32" class="mr-2">
          <v-img :src="article.authorImage || '/default-avatar.png'" />
        </v-avatar>
        <span class="text-caption font-weight-medium">
          {{ article.author }}
        </span>
        <v-spacer/>        
        <nuxt-link
          :to="$localePath(`/blog/${article.slug}`)"
          class="px-2 text-decoration-none text-primary text-button text-capitalize font-weight-bold"
        >
          Read
          <v-icon icon="mdi-arrow-right" size="small" class="ml-1"/>
        </nuxt-link>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<style scoped>
.leading-tight {
  line-height: 1.25;
}
</style>