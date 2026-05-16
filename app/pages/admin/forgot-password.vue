<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const email   = ref('')
const loading = ref(false)
const sent    = ref(false)
const error   = ref('')

async function submit() {
  error.value   = ''
  loading.value = true
  try {
    await $fetch('/api/auth/forgot-password', { method: 'POST', body: { email: email.value } })
    sent.value = true
  }
  catch (e: any) {
    error.value = e.data?.message ?? 'Une erreur est survenue.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-screen d-flex align-center justify-center">
    <v-card width="420" rounded="xl" border flat class="px-8 py-10">

      <!-- Nav retour -->
      <div class="d-flex align-center gap-2 mb-6">
        <v-btn icon="mdi-arrow-left" variant="text" size="small" to="/admin/login" />
        <div>
          <h1 class="text-h6 font-weight-black">Mot de passe oublié</h1>
          <p class="text-body-2 text-medium-emphasis">Un lien vous sera envoyé par email</p>
        </div>
      </div>

      <!-- Succès -->
      <template v-if="sent">
        <v-alert
          type="success"
          variant="tonal"
          rounded="lg"
          icon="mdi-email-check-outline"
          class="mb-6"
        >
          <p class="mb-0">
            <strong>Email envoyé !</strong><br>
            Vérifiez votre boîte de réception (et les spams).
          </p>
        </v-alert>
        <v-btn variant="tonal" rounded="lg" block to="/admin/login">
          Retour à la connexion
        </v-btn>
      </template>

      <!-- Formulaire -->
      <template v-else>
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          rounded="lg"
          density="compact"
          closable
          class="mb-4"
          @click:close="error = ''"
        >
          {{ error }}
        </v-alert>

        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="email"
            label="Adresse email"
            type="email"
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
            autocomplete="email"
            :disabled="loading"
            class="mb-6"
          />
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            rounded="lg"
            block
            size="large"
            :loading="loading"
            class="font-weight-bold"
          >
            Envoyer le lien
          </v-btn>
        </v-form>
      </template>
    </v-card>
  </div>
</template>

<style scoped>
.auth-screen { min-height: 100dvh; }
</style>