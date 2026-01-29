<script setup lang="ts">
  defineProps<{
    title?: string
    description?: string
    buttonLabel?: string
    to?: string
    icon?: string
  }>()
</script>

<template>
  <section class="mt-12">
    <v-card
      class="rounded-xl overflow-hidden"
      elevation="8"
    >
      <v-card-text class="pa-8 pa-md-12 text-center">
        <v-icon
          size="48"
          class="mb-4"
        >
          {{ icon || 'mdi-account-multiple-plus' }}
        </v-icon>

        <h2 class="text-h5 text-md-h4 font-weight-bold mb-4">
          {{ title || 'Vous êtes artiste ou intervenant ?' }}
        </h2>

        <p
          class="text-body-1 mb-6 mx-auto"
          style="max-width: 600px;"
        >
          {{ description || 'Rejoignez notre événement et partagez votre passion avec notre communauté.' }}
        </p>

        <nuxt-link
          :to="to || $localePath('/contactez-nous')"
          class="text-decoration-none"
        >
          <v-btn
            size="large"
            color="primary"
            variant="outlined"
            rounded="xl"
            prepend-icon="mdi-email-outline"
          >
            {{ buttonLabel || 'Proposer votre participation' }}
          </v-btn>
        </nuxt-link>
      </v-card-text>
    </v-card>
  </section>
</template>
