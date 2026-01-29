<script setup lang="ts">
/* ============================================================================
   EMITS
============================================================================ */
const emit = defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <v-card
    class="rounded-xl text-center pa-12"
    elevation="0"
  >
    <v-icon
      size="64"
      color="grey-lighten-1"
      class="mb-4"
    >
      mdi-account-search-outline
    </v-icon>

    <h3 class="text-h6 mb-2">
      Aucun invité trouvé
    </h3>

    <p class="text-body-2 text-medium-emphasis mb-4">
      Essayez de modifier vos filtres ou votre recherche.
    </p>

    <v-btn
      color="primary"
      variant="outlined"
      rounded="lg"
      @click="emit('reset')"
    >
      Réinitialiser
    </v-btn>
  </v-card>
</template>
