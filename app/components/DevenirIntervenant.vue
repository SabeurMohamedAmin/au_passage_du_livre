<script setup lang="ts">

</script>

<template>
  <!-- =============================================
       SECTION 5: CTA
  ============================================= -->
  <section class="mt-12">
    <v-card class="rounded-xl overflow-hidden" elevation="8">
      <v-card-text class="pa-8 pa-md-12 text-center">
        <v-icon size="48" class="mb-4">mdi-account-multiple-plus</v-icon>
        <h2 class="text-h5 text-md-h4 font-weight-bold mb-4">
          Vous êtes artiste ou intervenant ?
        </h2>
        <p class="text-body-1 mb-6 mx-auto" style="max-width: 600px;">
          Rejoignez notre événement et partagez votre passion avec notre communauté.
        </p>
        <nuxt-link :to="$localePath('/contactez-nous')" class="text-primary text-decoration-none opacity-70">
          <v-btn
            size="large"
            color="white"
            variant="flat"
            rounded="xl"
            prepend-icon="mdi-email-outline"
          >
            Proposer votre participation
          </v-btn>
        </nuxt-link>
      </v-card-text>
    </v-card>
  </section>
</template>