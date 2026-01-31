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
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="logo-wrapper">
          <img src="/favicon-svg.svg" class="book position-absolute ma-auto pointer-events-none" alt="Au Passage du Livre" />
        </div>
      </div>
    </Transition>
      
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
/* --- Loading Overlay & Transitions --- */
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgb(var(--v-theme-background));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}

/* --- Logo Animation --- */
.logo-wrapper {
  width: 400px;
  height: 400px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book {
  inset: 0;
  width: 220px;
  transform: scale(0) translateY(0);
  animation: book-enter 1.6s ease-out forwards;
}

@keyframes book-enter {
  0% { transform: scale(0) translateY(0); opacity: 0; }
  40% { transform: scale(1.1) translateY(0); opacity: 1; }
  100% { transform: scale(1) translateY(0); }
}

/* --- Global Utilities --- */
.theme-transition {
  transition: background-color 0.7s ease, color 0.5s ease, border 0.5s ease;
}

.scroll-mt-1 { scroll-margin-top: .5rem; }
.scroll-mt-2 { scroll-margin-top: 1rem; }
.scroll-mt-3 { scroll-margin-top: 2rem; }
.scroll-mt-4 { scroll-margin-top: 3rem; }
.scroll-mt-5 { scroll-margin-top: 4rem; }
.scroll-mt-6 { scroll-margin-top: 5rem; }
.scroll-mt-7 { scroll-margin-top: 6rem; }
</style>