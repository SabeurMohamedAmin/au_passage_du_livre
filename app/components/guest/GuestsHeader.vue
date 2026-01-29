<script setup lang="ts">
  const pageContent = {
    header: {
      title: 'Artistes et Intervenants',
      subtitle:
        'Découvrez les talents qui feront vivre notre événement. Des auteurs renommés, des artistes passionnés et des intervenants inspirants vous attendent.'
    }
  }
</script>

<template>
  <header class="mb-10">
    <!-- Title -->
    <div class="mb-4 text-center text-md-left">
      <h1 class="text-h5 text-md-h4 font-weight-bold mb-2">
        {{ pageContent.header.title }}
      </h1>

      <p
        v-if="pageContent.header.subtitle"
        class="text-body-1 text-medium-emphasis mx-auto mx-md-0"
        style="max-width: 720px;"
      >
        {{ pageContent.header.subtitle }}
      </p>
    </div>
  </header>
</template>