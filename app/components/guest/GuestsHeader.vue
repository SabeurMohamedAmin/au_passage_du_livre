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
    <div class="mb-4 text-left">
      <h1 class="text-h5 text-md-h4 font-weight-bold mb-2">
        Artistes et Intervenants
      </h1>

      <p v-if="pageContent.header.subtitle"
        class="text-body-1 text-medium-emphasis"
        style="max-width: 720px;"
      >
        Découvrez les talents qui feront vivre notre événement. 
        <br>
        Des auteurs renommés, des artistes passionnés et des intervenants inspirants vous attendent.
      </p>
    </div>
  </header>
</template>