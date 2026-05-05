<script setup lang="ts">
import type { Sponsor } from '~/stores/sponsors'

const props = defineProps<{
  modelValue: boolean
  editedSponsor?: Sponsor | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  saved: []
}>()

const store = useSponsorsStore()

const formRef = ref()
const saving = ref(false)
const logoFile = ref<any>(null)

const categories = [
  'Event Partner',
  'Logistics',
  'Real Estate',
  'Gastronomy',
  'Hospitality',
  'Tech Partner',
  'Services',
]

const availableLocales = ['fr', 'en', 'de']

const rules = {
  required: (v: string) => !!v || 'Required',
  url: (v: string) => !v || /^https?:\/\//.test(v) || 'Must be a valid URL',
}

// -------------------------------------------------------
// Form state
// -------------------------------------------------------

type TranslationRow = {
  locale: string
  name: string
  tagline: string
  description: string
}

type FormState = {
  slug: string
  category: string
  color: string
  logoUrl: string
  website: string
  addressText: string
  displayOrder: number
  isPublished: boolean
  description: string
  translations: TranslationRow[]
}

function emptyTranslation(locale = ''): TranslationRow {
  return { locale, name: '', tagline: '', description: '' }
}

function createEmptyForm(): FormState {
  return {
    slug: '',
    category: '',
    color: '#1565C0',
    logoUrl: '',
    website: '',
    addressText: '',
    displayOrder: 0,
    isPublished: true,
    description: '',
    translations: [emptyTranslation('fr'), emptyTranslation('en')],
  }
}

const form = ref<FormState>(createEmptyForm())

const isEditing = computed(() => !!props.editedSponsor)

// -------------------------------------------------------
// Populate form — shared between both watchers
// -------------------------------------------------------

function populateForm() {
  logoFile.value = null

  if (props.editedSponsor) {
    form.value = {
      slug: props.editedSponsor.slug ?? '',
      category: props.editedSponsor.category ?? '',
      color: props.editedSponsor.color ?? '#1565C0',
      logoUrl: props.editedSponsor.logoUrl ?? '',
      website: props.editedSponsor.website ?? '',
      addressText: props.editedSponsor.address ?? '',
      displayOrder: props.editedSponsor.displayOrder ?? 0,
      isPublished: props.editedSponsor.isPublished ?? true,
      description: props.editedSponsor.description ?? '',
      translations: props.editedSponsor.translations?.length
        ? props.editedSponsor.translations.map((t) => ({
            locale: t.locale,
            name: t.name ?? '',
            tagline: t.tagline ?? '',
            description: t.description ?? '',
          }))
        : [emptyTranslation('fr'), emptyTranslation('en')],
    }
  } else {
    form.value = createEmptyForm()
  }

  // ✅ Clear stale validation errors from previous dialog session
  nextTick(() => formRef.value?.resetValidation())
}

// ✅ Trigger populate when dialog opens
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    populateForm()
  },
)

// ✅ Also trigger if editedSponsor arrives after dialog is already open
watch(
  () => props.editedSponsor,
  () => {
    if (props.modelValue) populateForm()
  },
)

// -------------------------------------------------------
// Translation rows management
// -------------------------------------------------------

const usedLocales = computed(() => form.value.translations.map((t) => t.locale))

function addTranslation() {
  const next = availableLocales.find((l) => !usedLocales.value.includes(l))
  form.value.translations.push(emptyTranslation(next ?? ''))
}

function removeTranslation(index: number) {
  form.value.translations.splice(index, 1)
}

const canAddTranslation = computed(
  () => form.value.translations.length < availableLocales.length,
)

// -------------------------------------------------------
// Slug auto-generation from first translation name
// -------------------------------------------------------

const firstTranslationName = computed(() => form.value.translations[0]?.name ?? '')

watch(firstTranslationName, (val) => {
  if (isEditing.value) return
  form.value.slug = val
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
})

// -------------------------------------------------------
// Save
// -------------------------------------------------------

async function save() {
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  saving.value = true
  try {
    const fileToUpload = Array.isArray(logoFile.value) ? logoFile.value[0] : logoFile.value

    if (fileToUpload) {
      form.value.logoUrl = await store.uploadSponsorLogo(fileToUpload)
    }

    // ✅ Same explicit payload for both create and update
    const payload = {
      slug: form.value.slug,
      category: form.value.category,
      color: form.value.color || null,
      logoUrl: form.value.logoUrl || null,
      website: form.value.website || null,
      addressText: form.value.addressText || null,
      displayOrder: form.value.displayOrder,
      isPublished: form.value.isPublished,
      description: form.value.description || null,
      translations: form.value.translations.map((t) => ({
        locale: t.locale,
        name: t.name,
        tagline: t.tagline || null,
        description: t.description || null,
      })),
    }

    if (isEditing.value && props.editedSponsor) {
      await store.updateSponsor(props.editedSponsor.id, payload)
    } else {
      await store.createSponsor(payload)
    }

    emit('saved')
    emit('update:modelValue', false)
  } catch (e) {
    console.error('Failed to save sponsor:', e)
  } finally {
    saving.value = false
  }
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="680"
    persistent
    scrollable
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card rounded="xl">
      <v-card-title class="pt-5 px-6 font-weight-black text-h6">
        {{ isEditing ? 'Edit Sponsor' : 'New Sponsor' }}
      </v-card-title>

      <v-divider />

      <v-card-text class="px-6 py-4">
        <v-form ref="formRef" @submit.prevent="save">

          <p class="text-caption text-medium-emphasis font-weight-bold mb-3 text-uppercase">
            General
          </p>

          <v-row dense>
            <v-col cols="12" sm="6">
              <v-combobox
                v-model="form.category"
                label="Category *"
                :items="categories"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.slug"
                label="Slug *"
                variant="outlined"
                density="compact"
                :rules="[rules.required]"
                hint="Auto-generated from first translation name"
                persistent-hint
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.website"
                label="Website URL"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-web"
                :rules="[rules.url]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.addressText"
                label="Address"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-map-marker-outline"
              />
            </v-col>

            <v-col cols="12" sm="8">
              <v-file-input
                v-model="logoFile"
                label="Sponsor Logo"
                variant="outlined"
                density="compact"
                prepend-icon=""
                prepend-inner-icon="mdi-camera"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                show-size
                :hint="form.logoUrl ? 'Leave empty to keep current logo' : 'Upload a new logo'"
                persistent-hint
              >
                <template v-if="form.logoUrl && !logoFile" #append-inner>
                  <v-avatar size="24" rounded="sm" color="grey-lighten-3">
                    <v-img :src="form.logoUrl" cover />
                  </v-avatar>
                </template>
              </v-file-input>
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.color"
                label="Color"
                variant="outlined"
                density="compact"
              >
                <template #prepend-inner>
                  <v-icon icon="mdi-circle" :color="form.color" size="18" />
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="6" sm="4">
              <v-text-field
                v-model.number="form.displayOrder"
                label="Display Order"
                type="number"
                variant="outlined"
                density="compact"
              />
            </v-col>

            <v-col cols="6" sm="4" class="d-flex align-center">
              <v-switch
                v-model="form.isPublished"
                label="Published"
                color="success"
                density="compact"
                hide-details
                inset
              />
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <div class="d-flex align-center justify-space-between mb-3">
            <p class="text-caption text-medium-emphasis font-weight-bold text-uppercase ma-0">
              Translations
            </p>
            <v-btn
              v-if="canAddTranslation"
              size="small"
              variant="tonal"
              prepend-icon="mdi-plus"
              rounded="lg"
              @click="addTranslation"
            >
              Add locale
            </v-btn>
          </div>

          <v-card
            v-for="(translation, index) in form.translations"
            :key="index"
            flat
            border
            rounded="lg"
            class="mb-3 pa-4"
          >
            <div class="d-flex align-center justify-space-between mb-3">
              <v-select
                v-model="translation.locale"
                :items="availableLocales.filter(
                  (l) => l === translation.locale || !usedLocales.includes(l)
                )"
                label="Locale *"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 120px"
                :rules="[rules.required]"
              />
              <v-btn
                v-if="form.translations.length > 1"
                icon="mdi-trash-can-outline"
                size="small"
                variant="text"
                color="error"
                @click="removeTranslation(index)"
              />
            </div>

            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="translation.name"
                  label="Name *"
                  variant="outlined"
                  density="compact"
                  :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="translation.tagline"
                  label="Tagline"
                  variant="outlined"
                  density="compact"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="translation.description"
                  label="Description"
                  variant="outlined"
                  density="compact"
                  rows="2"
                  auto-grow
                />
              </v-col>
            </v-row>
          </v-card>

        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-6 py-4">
        <v-spacer />
        <v-btn variant="text" rounded="lg" @click="close">Cancel</v-btn>
        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          :loading="saving"
          @click="save"
        >
          {{ isEditing ? 'Save Changes' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>