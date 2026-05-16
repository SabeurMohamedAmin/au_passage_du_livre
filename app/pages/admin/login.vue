<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const { fetch: refreshSession } = useUserSession()

const form    = reactive({ email: '', password: '' })
const loading = ref(false)
const error   = ref('')
const showPw  = ref(false)

async function submit() {
  error.value   = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: form })
    await refreshSession()
    await navigateTo('/admin')
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
    <v-card
      width="420"
      rounded="xl"
      border
      flat
      class="px-8 py-10"
    >
      <!-- En-tête -->
      <div class="text-center mb-8">
        <v-icon icon="mdi-book-open-page-variant" size="52" color="primary" class="mb-4" />
        <h1 class="text-h5 font-weight-black">Au Passage du Livre</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Espace administrateur</p>
      </div>

      <!-- Erreur -->
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        rounded="lg"
        density="compact"
        closable
        class="mb-5"
        @click:close="error = ''"
      >
        {{ error }}
      </v-alert>

      <!-- Formulaire -->
      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="Adresse email"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email-outline"
          autocomplete="email"
          :disabled="loading"
          class="mb-3"
        />

        <v-text-field
          v-model="form.password"
          label="Mot de passe"
          :type="showPw ? 'text' : 'password'"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPw ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          autocomplete="current-password"
          :disabled="loading"
          @click:append-inner="showPw = !showPw"
        />

        <div class="d-flex justify-end mt-1 mb-6">
          <v-btn
            variant="text"
            size="small"
            color="primary"
            to="/admin/forgot-password"
          >
            Mot de passe oublié ?
          </v-btn>
        </div>

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
          Se connecter
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<style scoped>
.auth-screen {
  min-height: 100dvh;
}
</style>