<script setup lang="ts">
import { ref, reactive } from 'vue'

/* ─────────────────────────────────────────────
   FORM STATE
   ───────────────────────────────────────────── */
const valid = ref(false)
const loading = ref(false)
const submitted = ref(false)

/* ─────────────────────────────────────────────
   FORM DATA
   ───────────────────────────────────────────── */
const form = reactive({
  name: '',
  email: '',
  subject: 'Information Générale',
  message: '',
  consent: false,
  company:'',
  website:''
})

/* ─────────────────────────────────────────────
   VALIDATION RULES
   Simple & readable
   ───────────────────────────────────────────── */
const rules = {
  required: (v: any) => !!v || 'Champ requis',

  name: (v: string) =>
    (!!v && v.length >= 2) || 'Le nom doit comporter au moins 2 caractères',

  email: (v: string) =>
    /.+@.+\..+/.test(v) || 'E-mail non valide',

  consent: (v: boolean) =>
    v || 'Vous devez accepter pour continuer',
}

/* ─────────────────────────────────────────────
   SELECT OPTIONS
   ───────────────────────────────────────────── */
const subjects = [
  'Information Générale',
  'Devenir Sponsor',
  'Bénévolat',
  'Autre',
]

/* ─────────────────────────────────────────────
   SUBMIT HANDLER (mock)
   ───────────────────────────────────────────── */
const handleSubmit = async () => {
  if (!valid.value) return

  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
         // 1.
        company: '', 
        website: '', 
      },
    })

    submitted.value = true
  } catch (error) {
    console.error(error)
    alert('Erreur lors de l’envoi du message')
  } finally {
    loading.value = false
  }
}


/* ─────────────────────────────────────────────
   SOCIAL LINKS
   ───────────────────────────────────────────── */
const socials = {
  facebook: 'https://www.facebook.com/profile.php?id=61577974919681',
  instagram: 'https://www.facebook.com/profile.php?id=61577974919681',
  youtube: 'https://www.facebook.com/profile.php?id=61577974919681',
}

</script>

<template>
  <v-container fluid class="d-flex align-center">
    <v-card
      max-width="1200"
      width="100%"
      class="mx-auto overflow-hidden"
      elevation="2"
      rounded="lg"
    >
      <v-row no-gutters>
        <!-- LEFT COLUMN : INFO -->
        <v-col
          cols="12"
          md="5"
          class="py-4 px-8 d-flex flex-column justify-space-between position-relative"
        >
          <div class="background-overlay" />

          <div style="z-index: 1">
            <div class="mb-4">
              <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
                Au Passage<br />du Livre
              </h2>

              <v-divider
                length="40"
                thickness="3"
                color="primary"
                class="opacity-100"
              />
            </div>

            <p class="text-body-1 font-weight-light mb-8 opacity-90">
              Une question sur le festival ?  
              Envie de nous rejoindre ou de devenir partenaire ?  
              Notre équipe est à votre écoute.
            </p>

            <v-list lines="two" bg-color="transparent" class="pa-0">
              <v-list-item class="px-0 mb-4">
                <template #prepend>
                  <v-icon icon="mdi-map-marker-outline" color="primary" />
                </template>

                <v-list-item-title class="font-weight-bold">
                  Adresse
                </v-list-item-title>

                <v-list-item-subtitle class="opacity-80 mt-1">
                  18 A Rue des Foulons, 67200 Strasbourg, France
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="px-0 mb-4">
                <template #prepend>
                  <v-icon icon="mdi-email-outline" color="primary" />
                </template>

                <v-list-item-title class="font-weight-bold">
                  Email
                </v-list-item-title>

                <v-list-item-subtitle class="opacity-80 mt-1">
                  <Mailto
                    mail="contact@aupassagedulivre.fr"
                    title="Nous écrire"
                  />
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>

          <!-- SOCIALS -->
          <div class="d-flex ga-4 mt-8" style="z-index: 1">
            <v-btn
              v-for="(url, key) in socials"
              :key="key"
              :to="url"
              :icon="`mdi-${key}`"
              variant="outlined"
              rounded="lg"
              size="small"
            />
          </div>
        </v-col>

        <!-- RIGHT COLUMN : FORM -->
        <v-col cols="12" md="7" class="py-4 px-8">
          <!-- SUCCESS -->
          <div
            v-if="submitted"
            class="h-100 d-flex flex-column align-center justify-center text-center fade-transition"
          >
            <v-icon color="success" icon="mdi-check-circle-outline" size="80" class="mb-4"/>
            <h3 class="text-h4 font-weight-bold mb-2">
              Message envoyé !
            </h3>
            <p class="text-body-1 text-medium-emphasis mb-6">
              Merci de nous avoir contactés.  
              Nous reviendrons vers vous très prochainement.
            </p>

            <v-btn size="large" @click="submitted = false">
              Envoyer un autre message
            </v-btn>
          </div>

          <!-- FORM -->
          <div v-else>
            <h3 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70 text-uppercase">
              Contactez-nous
            </h3>

            <v-form v-model="valid" @submit.prevent="handleSubmit">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name"
                    label="Nom complet"
                    :rules="[rules.required, rules.name]"
                    variant="outlined"
                    rounded="lg"
                    color="primary"
                    density="comfortable"
                    prepend-inner-icon="mdi-account-outline"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="Adresse E-mail"
                    :rules="[rules.required, rules.email]"
                    variant="outlined"
                    rounded="lg"
                    color="primary"
                    density="comfortable"
                    prepend-inner-icon="mdi-email-outline"
                  />
                </v-col>
                
                <v-col cols="12"  style="opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1;">                    <label for="company_field">Compagnie (Ne pas remplir)</label>
                  <v-text-field
                    id="company_field"
                    v-model="form.company"
                    name="company"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </v-col>

                <v-col cols="12"  style="opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1;">                    <label for="company_field">Compagnie (Ne pas remplir)</label>
                  <v-text-field
                    id="company_field"
                    v-model="form.website"
                    name="website"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="form.subject"
                    :items="subjects"
                    label="Sujet de votre demande"
                    :rules="[rules.required]"
                    variant="outlined"
                    rounded="lg"
                    color="primary"
                    density="comfortable"
                    prepend-inner-icon="mdi-format-list-bulleted"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.message"
                    label="Votre message"
                    :rules="[rules.required]"
                    variant="outlined"
                    rounded="lg"
                    color="primary"
                    rows="4"
                    auto-grow
                    prepend-inner-icon="mdi-message-text-outline"
                  />
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="form.consent"
                    :rules="[rules.consent]"
                    color="primary"
                    density="compact"
                    hide-details="auto"
                    class="mb-4"
                  >
                    <template #label>
                      <span class="text-subtitle-2">
                        J'accepte que mes données soient traitées
                        pour répondre à ma demande.
                      </span>
                    </template>
                  </v-checkbox>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    block
                    color="black"
                    size="large"
                    rounded="lg"
                    elevation="0"
                    :loading="loading"
                    :disabled="!valid"
                  >
                    Envoyer le message
                    <v-icon end icon="mdi-arrow-right" class="ml-2" />
                  </v-btn>
                </v-col>

              </v-row>
            </v-form>
          </div>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
  .background-overlay {
    inset: 0;
    opacity: 0.1;
    position: absolute;
    pointer-events: none;
    background-size: 20px 20px;
    background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
  }

  .fade-transition {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>