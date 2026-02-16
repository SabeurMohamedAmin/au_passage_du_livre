<script setup lang="ts">
  const pageContent = {
    header: {
      title: 'Artistes et Intervenants',
      subtitle:
        'Découvrez les talents qui feront vivre notre événement. Des auteurs renommés, des artistes passionnés et des intervenants inspirants vous attendent.'
    }
  }

  const description = computed(() => {
    const des = $t('artists_speakers_description').split('. ')[0] + '.<br>' + $t('artists_speakers_description').split('. ')[1]
    return des
  })
</script>

<template>
  <header class="mb-10">
    <!-- Title -->
    <div class="mb-4 text-left">
      <h1 class="text-h5 text-md-h4 font-weight-bold mb-2">
        {{ $t('artists_speakers_title') }}
      </h1>
      <p
        v-if="pageContent.header.subtitle"
        class="text-body-1 text-medium-emphasis"
        style="max-width: 720px;"
        v-html="description"
      >
      </p>
    </div>
  </header>
</template>