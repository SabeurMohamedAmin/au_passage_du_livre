<script setup lang="ts">
// Aucun état requis pour l’instant
// Le composant reste prêt pour évoluer (tabs, async data, etc.)
</script>

<template>
  <section id="schedule" class="my-5 my-md-10 scroll-mt-6">
    <v-container>

      <!-- HEADER -->
      <v-row class="mb-12 align-start">
        <v-col cols="12" md="8">
          <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
            Programme des événements
          </h2>
          <p class="text-medium-emphasis">
            Pour télécharger le catalogue complet des événements 2025, veuillez cliquer sur « Télécharger PDF ».
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-md-right">
          <NuxtLink
            to="/documents/events/aupassagedulivre-catalogue-2025.pdf"
            target="_blank"
            download="aupassagedulivre-event-2025.pdf"
          >
            <v-btn
              append-icon="mdi-download"
              variant="outlined"
              rounded="pill"
              class="font-weight-bold px-6 border-opacity-25"
            >
              Télécharger PDF
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
