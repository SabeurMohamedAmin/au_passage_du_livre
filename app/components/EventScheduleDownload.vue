<script setup lang="ts">
// Aucun état requis pour l’instant
// Le composant reste prêt pour évoluer (tabs, async data, etc.)
  defineProps<{
    title: string;
    description: string;
    downloadLabel: string;
    downloadLink: string;
  }>()
</script>

<template>
  <section id="schedule" class="my-5 my-md-10 scroll-mt-6">
    <v-container>

      <!-- HEADER -->
      <v-row class="mb-12 align-start">
        <v-col cols="12" md="8">
          <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
            {{ title }}
          </h2>
          <p class="text-medium-emphasis">
            {{ description }}
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-start text-md-end">
          <NuxtLink
            :to="downloadLink"
            target="_blank"
            :download="downloadLink"
          >
            <v-btn
              append-icon="mdi-download"
              variant="outlined"
              rounded="pill"
              class="font-weight-bold px-6 border-opacity-25"
            >
              {{ downloadLabel }}
            </v-btn>
          </NuxtLink>
        </v-col>
      </v-row>

      <!-- PLACEHOLDER / FUTURE TABS -->
      <v-col cols="12" class="px-0">
        <v-card
          class="elevation-0 rounded-xl border bg-white"
        >
          <!--
            🔜 Future content:
            - Tabs
            - Calendar
            - Timeline
            - Filters
          -->
        </v-card>
      </v-col>

    </v-container>
  </section>
</template>

<style scoped>
/* Pas de styles spécifiques nécessaires ici
   → tout est déjà géré par Vuetify & le layout parent */
</style>
