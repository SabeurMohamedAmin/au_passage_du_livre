<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
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
  <v-app class="theme-transition">
    <AppLoading v-model="loading" />

    <NuxtLayout v-show="!loading">
      <NuxtLoadingIndicator color="primary" />
      <v-main>
        <NuxtPage />
        <BackToTop />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<style>

  .scroll-mt-1 { scroll-margin-top: .5rem; }
  .scroll-mt-2 { scroll-margin-top: 1rem; }
  .scroll-mt-3 { scroll-margin-top: 2rem; }
  .scroll-mt-4 { scroll-margin-top: 3rem; }
  .scroll-mt-5 { scroll-margin-top: 4rem; }
  .scroll-mt-6 { scroll-margin-top: 5rem; }
  .scroll-mt-7 { scroll-margin-top: 6rem; }
</style>