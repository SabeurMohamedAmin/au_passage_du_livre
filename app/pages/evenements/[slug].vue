<script setup lang="ts">
  definePageMeta({
    name: "event-details"
  });
  
  const {params} = useRoute()
</script>

<template>
  <h1 class="my-10">
    Event SLUG : {{ params.slug }}
  </h1>
</template>