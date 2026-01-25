<script setup lang="ts">
  const route = useRoute()
  const slug = route.params.slug

  definePageMeta({
    name: 'mission-details'
  })
</script>

<template>

  <h1>
    page About Us : {{ slug }}
  </h1>
</template>