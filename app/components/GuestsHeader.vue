<script setup lang="ts">
  /**
   * Pure presentational component
   * No logic, no side effects
   */
  defineProps<{
    title: string
    subtitle: string
  }>();
</script>

<template>
  <header class="mb-10">
    <div class="d-flex mb-4">
      <h2 class="w-100 text-h5 text-sm-h4 font-weight-black opacity-70">
        {{ title }}
      </h2>
    </div>

    <p class="text-subtitle-1 text-medium-emphasis max-w-lg mx-auto">
      {{ subtitle }}
    </p>
  </header>
</template>
