<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div v-if="modelValue" class="loading-overlay">
      <div class="logo-wrapper">
        <img 
          src="/favicon-svg.svg" 
          class="book position-absolute ma-auto pointer-events-none" 
          alt="Au Passage du Livre" 
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
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
</style>