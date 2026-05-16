<!-- app/pages/admin/setup.vue -->
<script setup lang="ts">
definePageMeta({ layout: false }) // Pas de layout admin (pas encore connecté)

/* ── Vérifier si le setup est disponible ── */
const { data } = await useFetch('/api/admin/setup')

if (!data.value?.available) {
  await navigateTo('/admin/login')
}

/* ── Form state ── */
const form = reactive({
  password:        '',
  confirmPassword: '',
})

const ui = reactive({
  loading:         false,
  showPassword:    false,
  showConfirm:     false,
  success:         false,
  error:           '',
})

const rules = {
  required:  (v: string) => !!v || 'Ce champ est requis.',
  minLength: (v: string) => v.length >= 10 || '10 caractères minimum.',
  match:     (v: string) => v === form.password || 'Les mots de passe ne correspondent pas.',
}

const formRef = ref()

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  ui.loading = true
  ui.error   = ''

  try {
    await $fetch('/api/admin/setup', {
      method: 'POST',
      body:   { password: form.password, confirmPassword: form.confirmPassword },
    })
    ui.success = true
    setTimeout(() => navigateTo('/admin/login'), 2500)
  } catch (err: any) {
    ui.error = err.data?.message ?? 'Une erreur est survenue.'
  } finally {
    ui.loading = false
  }
}

/* ── Indicateur de force du mot de passe ── */
const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return { score: 0, label: '', color: '' }
  let score = 0
  if (p.length >= 10)              score++
  if (p.length >= 14)              score++
  if (/[A-Z]/.test(p))            score++
  if (/[0-9]/.test(p))            score++
  if (/[^a-zA-Z0-9]/.test(p))     score++

  if (score <= 1) return { score, label: 'Très faible', color: 'error'   }
  if (score === 2) return { score, label: 'Faible',     color: 'warning'  }
  if (score === 3) return { score, label: 'Moyen',      color: 'warning'  }
  if (score === 4) return { score, label: 'Fort',       color: 'success'  }
  return               { score, label: 'Très fort',   color: 'success'  }
})
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center justify-center setup-bg">
      <v-container style="max-width: 460px">

        <!-- ══ CARTE SETUP ══ -->
        <v-card rounded="xl" border elevation="0" class="pa-2">

          <!-- En-tête -->
          <v-card-item class="pt-6 pb-2 px-6">
            <template #prepend>
              <v-avatar color="primary" variant="tonal" size="48" class="me-3">
                <v-icon icon="mdi-shield-account" size="26" />
              </v-avatar>
            </template>
            <v-card-title class="text-h5 font-weight-black">
              Initialisation admin
            </v-card-title>
            <v-card-subtitle>
              Créez le compte administrateur
            </v-card-subtitle>
          </v-card-item>

          <v-divider class="mx-4 mt-2 mb-4" />

          <!-- ══ SUCCÈS ══ -->
          <template v-if="ui.success">
            <v-card-text class="px-6 pb-6 text-center">
              <v-icon
                icon="mdi-check-circle"
                color="success"
                size="64"
                class="mb-4"
              />
              <div class="text-h6 font-weight-bold mb-2">Compte créé !</div>
              <div class="text-body-2 text-medium-emphasis">
                Redirection vers la page de connexion…
              </div>
              <v-progress-linear
                color="success"
                indeterminate
                rounded
                class="mt-6"
              />
            </v-card-text>
          </template>

          <!-- ══ FORMULAIRE ══ -->
          <template v-else>
            <v-card-text class="px-6 pb-2">

              <!-- Alerte email fixé -->
              <v-alert
                type="info"
                variant="tonal"
                rounded="lg"
                density="compact"
                class="mb-5"
                icon="mdi-email-lock"
              >
                Compte lié à
                <strong>aminsab@outlook.fr</strong>
              </v-alert>

              <!-- Erreur serveur -->
              <v-alert
                v-if="ui.error"
                type="error"
                variant="tonal"
                rounded="lg"
                density="compact"
                class="mb-5"
                :text="ui.error"
              />

              <v-form ref="formRef" @submit.prevent="submit">

                <!-- Mot de passe -->
                <v-text-field
                  v-model="form.password"
                  label="Mot de passe"
                  :type="ui.showPassword ? 'text' : 'password'"
                  :append-inner-icon="ui.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  rounded="lg"
                  class="mb-1"
                  :rules="[rules.required, rules.minLength]"
                  @click:append-inner="ui.showPassword = !ui.showPassword"
                />

                <!-- Indicateur de force -->
                <div v-if="form.password" class="mb-4 px-1">
                  <div class="d-flex align-center gap-2 mb-1">
                    <v-progress-linear
                      :model-value="(passwordStrength.score / 5) * 100"
                      :color="passwordStrength.color"
                      rounded
                      height="4"
                      class="flex-grow-1"
                    />
                    <span
                      class="text-caption font-weight-bold"
                      :class="`text-${passwordStrength.color}`"
                    >
                      {{ passwordStrength.label }}
                    </span>
                  </div>
                </div>

                <!-- Confirmation -->
                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirmer le mot de passe"
                  :type="ui.showConfirm ? 'text' : 'password'"
                  :append-inner-icon="ui.showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-check-outline"
                  variant="outlined"
                  rounded="lg"
                  class="mb-6"
                  :rules="[rules.required, rules.match]"
                  @click:append-inner="ui.showConfirm = !ui.showConfirm"
                />

                <!-- Submit -->
                <v-btn
                  type="submit"
                  color="primary"
                  variant="flat"
                  rounded="lg"
                  size="large"
                  block
                  :loading="ui.loading"
                  prepend-icon="mdi-shield-check"
                >
                  Créer le compte admin
                </v-btn>

              </v-form>
            </v-card-text>

            <!-- Lien retour login -->
            <v-card-actions class="justify-center pb-5 pt-2">
              <v-btn
                variant="text"
                size="small"
                :to="'/admin/login'"
                prepend-icon="mdi-arrow-left"
                color="medium-emphasis"
              >
                Retour à la connexion
              </v-btn>
            </v-card-actions>
          </template>

        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.setup-bg {
  min-height: 100dvh;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-surface)) 0%,
    rgb(var(--v-theme-surface-variant, var(--v-theme-surface))) 100%
  );
}
</style>