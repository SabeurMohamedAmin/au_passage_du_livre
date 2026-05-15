<script setup lang="ts">
import { useIntervenantsStore } from '~/stores/intervenants'
import GuestCard from '@/components/guest/GuestCard.vue'

const store = useIntervenantsStore()

// Prefetch if empty; works with SSR
const { pending, error , refresh} = useAsyncData('intervenants', async () => {
  if (store.items.length === 0) {
    await store.fetchPublic()
  }
  return store.items // always return the data for SSR hydration
})
</script>

<template>
  <section class="mt-16 mb-12">
    <div class="mb-8 text-center">
      <h2 class="text-h4 font-weight-bold mb-2">Intervenants</h2>
      <p class="text-body-1 text-medium-emphasis">Base de données dynamique</p>
    </div>    
    <!-- RETRY OR REFRESH LOADING -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-6"
      closable
    >
      <div class="d-flex align-center justify-space-between">
        Impossible de charger les intervenants.
        <v-btn size="small" variant="text" @click="refresh()">Réessayer</v-btn>
      </div>
    </v-alert>
    <v-container v-if="pending || store.loading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-container>

    <v-sheet
      v-else-if="store.items.length === 0"
      border
      rounded="lg"
      class="d-flex flex-column align-center py-12 border-dashed bg-transparent"
    >
      <v-icon icon="mdi-account-off-outline" size="48" class="mb-4 text-disabled" />
      <p class="text-h6 text-disabled">Aucun intervenant trouvé</p>
    </v-sheet>

    <v-row v-else>
      <v-col
        v-for="guest in store.items"
        :key="guest.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <GuestCard :guest="guest" />
      </v-col>
    </v-row>
  </section>
</template>