<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const route  = useRoute()
const token  = computed(() => route.query.token as string | undefined)

const form    = reactive({ password: '', confirm: '' })
const loading = ref(false)
const done    = ref(false)
const error   = ref('')
const showPw  = ref(false)

const mismatch = computed(() => !!form.confirm && form.password !== form.confirm)

async function submit() {
  if (mismatch.value) return
  error.value   = ''
  loading.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: form.password },
    })
    done.value = true
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

      <div class="text-center mb-6">
        <v-icon icon="mdi-lock-reset" size="52" color="primary" class="mb-3" />
        <h1 class="text-h6 font-weight-black">Nouveau mot de passe</h1>
      </div>

      <!-- Token manquant -->
      <v-alert
        v-if="!token"
        type="error"
        variant="tonal"
        rounded="lg"
        class="mb-4"
      >
        Lien invalide.
        <v-btn variant="text" size="small" color="error" to="/admin/forgot-password" class="ml-1">
          Refaire une demande
        </v-btn>
      </v-alert>

      <!-- Succès -->
      <template v-else-if="done">
        <v-alert type="success" variant="tonal" rounded="lg" icon="mdi-check-circle" class="mb-6">
          Mot de passe mis à jour avec succès !
        </v-alert>
        <v-btn color="primary" variant="flat" rounded="lg" block to="/admin/login">
          Se connecter
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
            v-model="form.password"
            label="Nouveau mot de passe"
            :type="showPw ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPw ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            hint="8 caractères minimum"
            persistent-hint
            :disabled="loading"
            class="mb-3"
            @click:append-inner="showPw = !showPw"
          />

          <v-text-field
            v-model="form.confirm"
            label="Confirmer le mot de passe"
            :type="showPw ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock-check-outline"
            :error="mismatch"
            :error-messages="mismatch ? 'Les mots de passe ne correspondent pas.' : ''"
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
            :disabled="!form.password || !form.confirm || mismatch || form.password.length < 8"
            class="font-weight-bold"
          >
            Mettre à jour
          </v-btn>
        </v-form>
      </template>
    </v-card>
  </div>
</template>

<style scoped>
.auth-screen { min-height: 100dvh; }
</style>