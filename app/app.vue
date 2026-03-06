<script setup lang="ts">
const INITIAL_LOADING_DELAY_MS = 500

const loading = ref(true)
let loadingTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  loadingTimer = setTimeout(() => {
    loading.value = false
  }, INITIAL_LOADING_DELAY_MS)
})

onBeforeUnmount(() => {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
  }
})

useHead({
  title: 'Au Passage du Livre',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon-svg.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon-svg-dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
})
</script>

<template>
  <v-app class="theme-transition min-width-app">
    <AppLoading v-model="loading" />

    <NuxtLayout v-if="!loading">
      <NuxtLoadingIndicator color="primary" />
      <v-main>
        <NuxtPage />
        <BackToTop />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<style>
  .min-width-app {
    min-width: 350px !important;
  }

  .scroll-mt-1 {
    scroll-margin-top: 0.5rem;
  }

  .scroll-mt-2 {
    scroll-margin-top: 1rem;
  }

  .scroll-mt-3 {
    scroll-margin-top: 2rem;
  }

  .scroll-mt-4 {
    scroll-margin-top: 3rem;
  }

  .scroll-mt-5 {
    scroll-margin-top: 4rem;
  }

  .scroll-mt-6 {
    scroll-margin-top: 5rem;
  }

  .scroll-mt-7 {
    scroll-margin-top: 6rem;
  }
</style>