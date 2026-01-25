<script setup lang="ts">
  definePageMeta({
    name: 'article-details'
  })

  const {slug} = useRoute().params;
</script>

<template>
<h1>
  This Page dedicated to {{slug}}
</h1>
</template>

<style lang="css" scoped>

</style>