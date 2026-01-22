<script setup lang="ts">
  const {path} = useRoute();
    definePageMeta({
      name: 'guest-profile'
    })
</script>

<template>
  <h1>
    Artist ou Intervenant
  </h1>
  <h2> {{  path }}</h2>
</template>