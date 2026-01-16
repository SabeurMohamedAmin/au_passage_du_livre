<script setup lang="ts">
</script>

<template>
  <v-app class="page-height">
    <NuxtLayout>
      <v-main>
        <NuxtPage />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<style>
  .page-height{
    min-height: 160vh;
  }
  .scroll-mt-1{
    scroll-margin-top: .5rem;
  }
  .scroll-mt-2{
    scroll-margin-top: 1rem;
  }
  .scroll-mt-3{
    scroll-margin-top: 2rem;
  }
  .scroll-mt-4{
    scroll-margin-top: 3rem;
  }
  .scroll-mt-5{
    scroll-margin-top: 4rem;
  }
  .scroll-mt-6{
    scroll-margin-top: 5rem;
  }
  .scroll-mt-7{
    scroll-margin-top: 6rem;
  }

</style>