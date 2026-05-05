<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'
import type { HomeImage } from '@/stores/home'

const { locale, locales } = useI18n()
const homeStore = useHomeStore()
const { isLoading, page } = storeToRefs(homeStore)

await useAsyncData('admin-home', () => homeStore.fetchHomePage())

const editingLocale = ref(locale.value)

const availableLocales = computed(() =>
  (locales.value as any[]).map((l) => ({ code: l.code, name: l.name }))
)

const saving          = ref(false)
const savingImages    = ref(false)
const snackbar        = ref(false)
const snackbarMessage = ref('')
const snackbarColor   = ref<'success' | 'error'>('success')
const formRef         = ref()
const activeTab       = ref('Hero')
const tabs            = ['Hero', 'Missions', 'Speakers', 'Articles', 'Events']

// ── Deep clone — fully detaches localForm from the store ──────────────────────
function cloneTranslation(loc: string) {
  const t = homeStore.getTranslation(loc)
  return t ? JSON.parse(JSON.stringify(t) as string) : {}
}

const localForm = ref(cloneTranslation(editingLocale.value))

watch([editingLocale, page], () => {
  localForm.value = cloneTranslation(editingLocale.value)
})

// ── Image management ──────────────────────────────────────────────────────────

type ImageSlot = HomeImage['slot']

const IMAGE_SLOTS: { slot: ImageSlot; label: string; aspectRatio: string }[] = [
  { slot: 'hero_top_left',     label: 'Top Left',     aspectRatio: '2/3' },
  { slot: 'hero_bottom_left',  label: 'Bottom Left',  aspectRatio: '1/1' },
  { slot: 'hero_top_right',    label: 'Top Right',    aspectRatio: '1/1' },
  { slot: 'hero_bottom_right', label: 'Bottom Right', aspectRatio: '2/3' },
]

const imageForm = ref<Record<ImageSlot, { url: string; alt: string }>>({
  hero_top_left:     { url: '', alt: '' },
  hero_bottom_left:  { url: '', alt: '' },
  hero_top_right:    { url: '', alt: '' },
  hero_bottom_right: { url: '', alt: '' },
})

const uploading = ref<Record<ImageSlot, boolean>>({
  hero_top_left:     false,
  hero_bottom_left:  false,
  hero_top_right:    false,
  hero_bottom_right: false,
})

// Plain (non-reactive) object — fixes v-for ref assignment in Vue 3
const fileInputs: Record<ImageSlot, HTMLInputElement | null> = {
  hero_top_left:     null,
  hero_bottom_left:  null,
  hero_top_right:    null,
  hero_bottom_right: null,
}

watchEffect(() => {
  if (!page.value?.images) return
  for (const { slot } of IMAGE_SLOTS) {
    const existing = page.value.images.find(i => i.slot === slot)
    imageForm.value[slot] = {
      url: existing?.url ?? '',
      alt: existing?.alt ?? '',
    }
  }
})

function triggerUpload(slot: ImageSlot) {
  fileInputs[slot]?.click()
}

async function onFileSelected(slot: ImageSlot, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploading.value[slot] = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    imageForm.value[slot].url = res.url
    showSnackbar(`Image uploaded for ${slot.replace(/_/g, ' ')}`, 'success')
  } catch {
    showSnackbar('Upload failed — check file size/type', 'error')
  } finally {
    uploading.value[slot] = false
    if (fileInputs[slot]) fileInputs[slot]!.value = ''
  }
}

function clearImage(slot: ImageSlot) {
  imageForm.value[slot].url = ''
}

async function saveImages() {
  savingImages.value = true
  try {
    await $fetch('/api/admin/home/images', {
      method: 'PATCH',
      body: {
        images: IMAGE_SLOTS.map(({ slot }) => ({
          slot,
          url: imageForm.value[slot].url || null,
          alt: imageForm.value[slot].alt,
        })),
      },
    })
    showSnackbar('Images saved successfully', 'success')
  } catch {
    showSnackbar('Failed to save images', 'error')
  } finally {
    savingImages.value = false
  }
}

// ── Text save ─────────────────────────────────────────────────────────────────

const rules = {
  required: (v: string) => !!v?.trim() || 'Required',
  url: (v: string) => !v || /^(https?:\/\/|\/)/.test(v) || 'Must be a valid URL or path',
}

async function save() {
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  saving.value = true
  const ok = await homeStore.updateHomePage(editingLocale.value, localForm.value)
  saving.value = false
  showSnackbar(ok ? 'Saved successfully' : 'Failed to save', ok ? 'success' : 'error')
}

function showSnackbar(message: string, color: 'success' | 'error') {
  snackbarMessage.value = message
  snackbarColor.value   = color
  snackbar.value        = true
}
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-black">Home Page</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">
          Edit the content displayed on the public home page.
        </p>
      </div>
      <div class="d-flex align-center gap-3">
        <v-select
          v-model="editingLocale"
          :items="availableLocales"
          item-title="name"
          item-value="code"
          label="Editing locale"
          variant="outlined"
          density="compact"
          hide-details
          rounded="lg"
          style="min-width: 160px"
          prepend-inner-icon="mdi-translate"
        />
        <v-btn
          color="primary" variant="flat"
          prepend-icon="mdi-content-save-outline"
          rounded="lg" :loading="saving"
          @click="save"
        >
          Save changes
        </v-btn>
      </div>
    </div>

    <v-form ref="formRef">
      <v-tabs v-model="activeTab" color="primary" class="mb-4">
        <v-tab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">

        <!-- ── Hero ─────────────────────────────────────────────────────────── -->
        <v-window-item value="Hero">
          <v-row dense>

            <!-- Text content card (unchanged) -->
            <v-col cols="12">
              <v-card flat rounded="lg" border class="pa-6 mb-4">
                <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-4">
                  Hero Text Content
                </p>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="localForm.heroTitle1" label="Hero Title line 1" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="localForm.heroTitle2" label="Hero Title line 2" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="localForm.heroTitle3" label="Hero Sub Title (accent color)" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="localForm.heroDescription" label="Hero Description" variant="outlined" density="compact" rows="3" auto-grow :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12"><v-divider class="mb-4" /></v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="localForm.heroCta1Label" label="Primary button label" variant="outlined" density="compact" prepend-inner-icon="mdi-button-cursor" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="localForm.heroCta1Link" label="Primary button link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="localForm.heroCta2Label" label="Secondary button label" variant="outlined" density="compact" prepend-inner-icon="mdi-button-cursor" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="localForm.heroCta2Link" label="Secondary button link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- ── Image upload card ──────────────────────────────────────── -->
            <v-col cols="12">
              <v-card flat rounded="lg" border class="pa-6">

                <!-- Header -->
                <div class="d-flex align-center justify-space-between mb-2">
                  <div>
                    <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis">
                      Hero Images
                    </p>
                    <p class="text-caption text-medium-emphasis mt-1">
                      JPG, PNG or WebP · max 5MB per image · recommended 700×700px minimum
                    </p>
                  </div>
                  <v-btn
                    color="primary" variant="tonal" size="small"
                    prepend-icon="mdi-content-save-outline"
                    rounded="lg" :loading="savingImages"
                    @click="saveImages"
                  >
                    Save images
                  </v-btn>
                </div>

                <v-divider class="mb-5" />

                <!-- 4 image slots in a horizontal row (like the screenshot) -->
                <div class="image-slots-row">
                  <div
                    v-for="{ slot, label, aspectRatio } in IMAGE_SLOTS"
                    :key="slot"
                    class="image-slot"
                  >
                    <!-- Hidden native file input -->
                    <input
                      :ref="(el) => { fileInputs[slot] = el as HTMLInputElement }"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      class="d-none"
                      @change="onFileSelected(slot, $event)"
                    />

                    <!-- Image preview box — click to upload -->
                    <div
                      class="slot-preview"
                      :style="{ aspectRatio }"
                      :class="{ 'has-image': !!imageForm[slot].url }"
                      @click="triggerUpload(slot)"
                    >
                      <!-- Uploading spinner -->
                      <div v-if="uploading[slot]" class="slot-overlay">
                        <v-progress-circular indeterminate color="white" size="32" />
                      </div>

                      <!-- Image -->
                      <img
                        v-else-if="imageForm[slot].url"
                        :src="imageForm[slot].url"
                        :alt="imageForm[slot].alt || label"
                        class="slot-img"
                      />

                      <!-- Empty state -->
                      <div v-else class="slot-empty">
                        <v-icon icon="mdi-image-plus-outline" size="28" color="medium-emphasis" />
                        <span class="text-caption text-medium-emphasis mt-1">Upload</span>
                      </div>

                      <!-- Remove button (top-right corner like the screenshot) -->
                      <button
                        v-if="imageForm[slot].url && !uploading[slot]"
                        class="slot-remove"
                        title="Remove image"
                        @click.stop="clearImage(slot)"
                      >
                        <v-icon icon="mdi-close" size="14" color="white" />
                      </button>

                      <!-- Re-upload overlay on hover -->
                      <div v-if="imageForm[slot].url && !uploading[slot]" class="slot-hover-overlay">
                        <v-icon icon="mdi-camera-retake-outline" size="20" color="white" />
                      </div>
                    </div>

                    <!-- Slot label + status chip -->
                    <div class="d-flex align-center gap-1 mt-2">
                      <span class="text-caption font-weight-medium">{{ label }}</span>
                      <v-chip
                        size="x-small" variant="tonal"
                        :color="imageForm[slot].url ? 'success' : 'default'"
                      >
                        {{ imageForm[slot].url ? 'set' : 'empty' }}
                      </v-chip>
                    </div>

                    <!-- Alt text -->
                    <v-text-field
                      v-model="imageForm[slot].alt"
                      label="Alt text"
                      variant="outlined"
                      density="compact"
                      class="mt-2"
                      placeholder="Describe the image…"
                      prepend-inner-icon="mdi-image-text"
                      hide-details
                    />
                  </div>
                </div>

              </v-card>
            </v-col>

          </v-row>
        </v-window-item>

        <!-- ── Missions ──────────────────────────────────────────────────────── -->
        <v-window-item value="Missions">
          <v-card flat rounded="lg" border class="pa-6">
            <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-4">Missions Section</p>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="localForm.missionsTitle" label="Section title" variant="outlined" density="compact" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="localForm.missionsDescription" label="Description" variant="outlined" density="compact" rows="3" auto-grow />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.missionsSeeAllLabel" label="See all label" variant="outlined" density="compact" prepend-inner-icon="mdi-button-cursor" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.missionsSeeAllLink" label="See all link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>

        <!-- ── Speakers ──────────────────────────────────────────────────────── -->
        <v-window-item value="Speakers">
          <v-card flat rounded="lg" border class="pa-6">
            <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-4">Speakers Section</p>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="localForm.speakersTitle" label="Section title" variant="outlined" density="compact" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="localForm.speakersDescription" label="Description" variant="outlined" density="compact" rows="2" auto-grow />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.speakersSeeAllLabel" label="See all label" variant="outlined" density="compact" prepend-inner-icon="mdi-button-cursor" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.speakersSeeAllLink" label="See all link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>

        <!-- ── Articles ──────────────────────────────────────────────────────── -->
        <v-window-item value="Articles">
          <v-card flat rounded="lg" border class="pa-6">
            <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-4">Articles & News Section</p>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="localForm.articlesTitle" label="Section title" variant="outlined" density="compact" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="localForm.articlesDescription" label="Description" variant="outlined" density="compact" rows="2" auto-grow />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.articlesSeeAllLabel" label="See all label" variant="outlined" density="compact" prepend-inner-icon="mdi-button-cursor" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.articlesSeeAllLink" label="See all link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>

        <!-- ── Events ────────────────────────────────────────────────────────── -->
        <v-window-item value="Events">
          <v-card flat rounded="lg" border class="pa-6">
            <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-4">Events Program Section</p>
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="localForm.eventsTitle" label="Section title" variant="outlined" density="compact" :rules="[rules.required]" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="localForm.eventsDescription" label="Description" variant="outlined" density="compact" rows="2" auto-grow />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.eventsDownloadLabel" label="Download button label" variant="outlined" density="compact" prepend-inner-icon="mdi-download" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="localForm.eventsDownloadLink" label="PDF link" variant="outlined" density="compact" :rules="[rules.url]" prepend-inner-icon="mdi-file-pdf-box" />
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>

      </v-window>
      <!-- TODO: the section 2 after page main hero -->
    </v-form>

    <v-snackbar v-model="snackbar" :color="snackbarColor" rounded="lg" timeout="3000" location="bottom right">
      <v-icon :icon="snackbarColor === 'success' ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline'" class="mr-2" />
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
/* ── Image slots row (matches screenshot layout) ─────────────────────────── */
.image-slots-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.image-slot {
  flex: 1 1 160px;
  min-width: 140px;
  max-width: 220px;
}

/* The clickable preview box */
.slot-preview {
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(128, 128, 128, 0.08);
  border: 2px dashed rgba(128, 128, 128, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
}

.slot-preview:hover {
  border-color: rgba(128, 128, 128, 0.5);
  background: rgba(128, 128, 128, 0.12);
}

.slot-preview.has-image {
  border: none;
}

/* The actual image */
.slot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Empty state (icon + label) */
.slot-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px;
}

/* Red remove button — top right corner, like the screenshot */
.slot-remove {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e53935;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  transition: transform 0.15s;
}

.slot-remove:hover {
  transform: scale(1.15);
}

/* Loading / re-upload overlays */
.slot-overlay,
.slot-hover-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1;
}

.slot-overlay {
  background: rgba(0, 0, 0, 0.45);
}

.slot-hover-overlay {
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.2s;
}

.slot-preview:hover .slot-hover-overlay {
  opacity: 1;
}
</style>