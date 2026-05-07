<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useIntervenantsStore, type Intervenant } from '~/stores/intervenants'

const store = useIntervenantsStore()

// ── Local UI state ─────────────────────────────────────────────────────────
const dialog       = ref(false)
const dialogDelete = ref(false)
const isEditing    = ref(false)
const targetItem   = ref<Intervenant | null>(null)

const snackbar        = ref(false)
const snackbarMessage = ref('')
const snackbarColor   = ref<'success' | 'error'>('success')

const formRef    = ref()
const search     = ref('')
const filterRole = ref<string | null>(null)
const fileInput  = ref<HTMLInputElement | null>(null)

// ── Image state ────────────────────────────────────────────────────────────
const pendingFile = ref<File | null>(null)    // raw File waiting to be uploaded on save
const previewUrl  = ref<string | null>(null)  // local blob URL for instant preview

// ── Role harvester ─────────────────────────────────────────────────────────
const BASE_ROLES = ['Auteur', 'Artiste', 'Conférencier', 'Animateur']

const availableRoles = computed(() => {
  const dbRoles = store.items.map(i => i.role).filter(Boolean)
  return Array.from(new Set([...BASE_ROLES, ...dbRoles])).sort()
})

// ── Blank form ─────────────────────────────────────────────────────────────
function blankForm(): Intervenant {
  return {
    name: '', slug: '', role: 'Auteur', specialty: '',
    excerpt: '', bio: '', image: null, featured: false,
    socialLinks: { facebook: '', instagram: '', twitter: '', website: '' },
  }
}

const form = ref<Intervenant>(blankForm())

// ── Filtered list ──────────────────────────────────────────────────────────
const filtered = computed(() => {
  let list = store.items
  if (filterRole.value) list = list.filter(i => i.role === filterRole.value)
  const q = search.value.toLowerCase()
  if (q) list = list.filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.specialty.toLowerCase().includes(q),
  )
  return list
})

// ── Bootstrap ──────────────────────────────────────────────────────────────
onMounted(async () => {
  try { await store.fetchAll() }
  catch { showSnackbar('Failed to load intervenants', 'error') }
})

// ── Dialogs ────────────────────────────────────────────────────────────────
function openCreate() {
  isEditing.value   = false
  pendingFile.value = null
  previewUrl.value  = null
  form.value        = blankForm()
  dialog.value      = true
}

function openEdit(item: Intervenant) {
  isEditing.value   = true
  targetItem.value  = item
  pendingFile.value = null
  previewUrl.value  = null
  form.value = JSON.parse(JSON.stringify({
    ...item,
    socialLinks: item.socialLinks || { facebook: '', instagram: '', twitter: '', website: '' },
  }))
  dialog.value = true
}

function openDelete(item: Intervenant) {
  targetItem.value   = item
  dialogDelete.value = true
}

function closeDialog() {
  dialog.value      = false
  pendingFile.value = null
  previewUrl.value  = null
  formRef.value?.reset()
}

// ── Image handling ─────────────────────────────────────────────────────────
// Selecting a file only creates a local preview — the upload happens on save
function onFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Revoke previous blob URL to avoid memory leaks
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)

  pendingFile.value = file
  previewUrl.value  = URL.createObjectURL(file)
  form.value.image  = previewUrl.value   // drives the avatar preview
  if (fileInput.value) fileInput.value.value = ''
}

function removeImage() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  pendingFile.value = null
  previewUrl.value  = null
  form.value.image  = null
}

// ── Build request body ─────────────────────────────────────────────────────
// If a file is pending, send as multipart FormData — otherwise plain JSON
function buildPayload(): FormData | Omit<Intervenant, 'id' | 'createdAt' | 'updatedAt'> {
  if (!pendingFile.value) {
    // No new file — send plain JSON (image field = existing URL or null)
    const { id: _id, createdAt: _ca, updatedAt: _ua, ...rest } = form.value as any
    return rest
  }

  // Has a new file — send multipart: file binary + the rest as a JSON string
  const { image: _img, id: _id, createdAt: _ca, updatedAt: _ua, ...rest } = form.value as any
  const fd = new FormData()
  fd.append('file', pendingFile.value)
  fd.append('data', JSON.stringify(rest))
  return fd
}

// ── Save ───────────────────────────────────────────────────────────────────
async function save() {
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  try {
    const payload = buildPayload()

    if (isEditing.value && targetItem.value?.slug) {
      await store.update(targetItem.value.slug, payload as any)
      showSnackbar('Intervenant updated', 'success')
    } else {
      await store.create(payload as any)
      showSnackbar('Intervenant created', 'success')
    }
    closeDialog()
  } catch {
    showSnackbar(store.error ?? 'Failed to save', 'error')
  }
}

// ── Delete ─────────────────────────────────────────────────────────────────
async function confirmDelete() {
  if (!targetItem.value?.slug) return
  try {
    await store.remove(targetItem.value.slug)
    showSnackbar('Intervenant deleted', 'success')
    dialogDelete.value = false
  } catch {
    showSnackbar(store.error ?? 'Failed to delete', 'error')
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function showSnackbar(message: string, color: 'success' | 'error') {
  snackbarMessage.value = message
  snackbarColor.value   = color
  snackbar.value        = true
}

watch(() => form.value.name, (newName) => {
  if (!isEditing.value && newName) {
    form.value.slug = newName
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

const rules = {
  required: (v: string) => !!v?.trim() || 'Required',
  url:      (v: string) => !v || /^(https?:\/\/)/.test(v) || 'Must be a valid https URL',
}
</script>

<template>
  <v-container fluid class="pa-6">

    <!-- Header -->
    <div class="page-header mb-6">
      <div class="d-flex align-center justify-space-between gap-4 px-6 py-4">
        <div>
          <h1 class="text-h5 font-weight-black">Intervenants</h1>
          <p class="text-body-2 text-medium-emphasis mt-1">Manage the central database of authors and speakers.</p>
        </div>
        <v-btn color="primary" variant="flat" prepend-icon="mdi-account-plus-outline" rounded="lg" @click="openCreate">
          New Intervenant
        </v-btn>
      </div>
      <v-divider />
    </div>

    <!-- Table -->
    <v-card flat rounded="lg" border>
      <div class="d-flex align-center flex-wrap ga-3 pa-4">
        <v-text-field
          v-model="search"
          placeholder="Search by name or specialty..."
          variant="outlined" density="compact" hide-details
          rounded="lg" prepend-inner-icon="mdi-magnify" clearable
          style="max-width: 300px"
        />
        <v-select
          v-model="filterRole"
          :items="[{ title: 'All roles', value: null }, ...availableRoles.map(r => ({ title: r, value: r }))]"
          item-title="title" item-value="value"
          variant="outlined" density="compact" hide-details
          rounded="lg" style="max-width: 180px"
        />
        <v-spacer />
        <v-chip size="small" variant="tonal" color="primary">{{ filtered.length }} intervenants</v-chip>
      </div>

      <v-divider />

      <v-data-table
        :headers="[
          { title: '',          key: 'image',     sortable: false, width: '60px' },
          { title: 'Name',      key: 'name',      sortable: true  },
          { title: 'Role',      key: 'role',      sortable: true  },
          { title: 'Specialty', key: 'specialty', sortable: true  },
          { title: 'Featured',  key: 'featured',  sortable: true  },
          { title: '',          key: 'actions',   sortable: false, align: 'end' },
        ]"
        :items="filtered"
        :loading="store.loading"
        item-value="id"
        hover
      >
        <template #item.image="{ item }">
          <v-avatar size="36" class="my-1 rounded-lg border border-medium-emphasis">
            <v-img v-if="item.image" :src="item.image" />
            <v-icon v-else size="36" icon="mdi-account-outline" />
          </v-avatar>
        </template>

        <template #item.name="{ item }">
          <p class="font-weight-medium py-2">{{ item.name }}</p>
        </template>

        <template #item.role="{ item }">
          <v-chip size="small" variant="tonal">{{ item.role }}</v-chip>
        </template>

        <template #item.featured="{ item }">
          <v-icon
            :icon="item.featured ? 'mdi-star' : 'mdi-star-outline'"
            :color="item.featured ? 'warning' : 'medium-emphasis'"
            size="20"
          />
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-1">
            <v-btn icon="mdi-pencil-outline" variant="text" size="small" @click="openEdit(item)" />
            <v-btn
              icon="mdi-trash-can-outline" variant="text" size="small" color="error"
              :loading="store.deleting === item.slug"
              @click="openDelete(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- CREATE / EDIT DIALOG -->
    <v-dialog v-model="dialog" max-width="800" scrollable persistent>
      <v-card rounded="lg">
        <div class="d-flex align-center justify-space-between px-6 py-4 bg-surface-variant">
          <span class="text-h6 font-weight-bold">
            {{ isEditing ? `Edit — ${form.name}` : 'New intervenant' }}
          </span>
        </div>
        <v-divider />

        <v-card-text class="pa-6" style="max-height: 75vh;">
          <v-form ref="formRef">
            <v-row dense>

              <!-- Image Upload -->
              <v-col cols="12" sm="3" class="d-flex flex-column align-center ga-3 pt-2">
                <v-avatar size="120" rounded="lg" color="surface-variant">
                  <v-img v-if="form.image" :src="form.image" />
                  <v-icon v-else icon="mdi-account-outline" size="48" />
                </v-avatar>
                <input
                  ref="fileInput" type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="d-none"
                  @change="onFileSelected"
                />
                <v-btn
                  variant="tonal" size="small"
                  prepend-icon="mdi-camera-outline" rounded="lg"
                  @click="fileInput?.click()"
                >
                  {{ form.image ? 'Replace' : 'Upload' }}
                </v-btn>
                <v-btn
                  v-if="form.image"
                  variant="text" size="x-small" color="error"
                  @click="removeImage"
                >
                  Remove
                </v-btn>
              </v-col>

              <!-- Core Info -->
              <v-col cols="12" sm="9">
                <v-row dense>
                  <v-col cols="12" sm="7">
                    <v-text-field v-model="form.name" label="Full Name" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-combobox
                      v-model="form.role" :items="availableRoles" label="Role"
                      variant="outlined" density="compact" :rules="[rules.required]"
                      hint="Select from list or type new role"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.slug" label="Slug" variant="outlined" density="compact"
                      :rules="[rules.required]" prepend-inner-icon="mdi-link-variant"
                      hint="Used in the URL" persistent-hint
                    />
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-text-field v-model="form.specialty" label="Specialty (e.g. Histoire Européenne)" variant="outlined" density="compact" />
                  </v-col>
                  <v-col cols="12" sm="4" class="d-flex align-center">
                    <v-switch v-model="form.featured" label="Featured" color="warning" hide-details inset />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12"><v-divider class="my-4" /></v-col>

              <!-- Bios -->
              <v-col cols="12">
                <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Biography</p>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.excerpt" label="Short Excerpt (Teaser)" variant="outlined" density="compact" :rows="2" no-resize hint="Brief summary shown on cards" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.bio" label="Full Bio" variant="outlined" density="compact" :rows="4" no-resize />
              </v-col>

              <v-col cols="12"><v-divider class="my-4" /></v-col>

              <!-- Social Links -->
              <v-col cols="12">
                <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Social Links</p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.socialLinks.website"   label="Website URL"      variant="outlined" density="compact" prepend-inner-icon="mdi-web"      :rules="[rules.url]" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.socialLinks.facebook"  label="Facebook URL"     variant="outlined" density="compact" prepend-inner-icon="mdi-facebook"  :rules="[rules.url]" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.socialLinks.instagram" label="Instagram URL"    variant="outlined" density="compact" prepend-inner-icon="mdi-instagram" :rules="[rules.url]" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.socialLinks.twitter"   label="X (Twitter) URL" variant="outlined" density="compact" prepend-inner-icon="mdi-twitter"   :rules="[rules.url]" />
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4 justify-end ga-2">
          <v-btn variant="text" rounded="lg" @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="primary" variant="flat" rounded="lg"
            :loading="store.saving"
            prepend-icon="mdi-content-save-outline"
            @click="save"
          >
            {{ isEditing ? 'Save changes' : 'Create intervenant' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="dialogDelete" max-width="400">
      <v-card rounded="lg" class="pa-6 text-center">
        <v-avatar color="error" variant="tonal" size="64" class="mb-4 mx-auto">
          <v-icon icon="mdi-alert-circle-outline" size="32" />
        </v-avatar>
        <h3 class="text-h6 font-weight-bold mb-2">Delete Intervenant?</h3>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Are you sure you want to delete <strong>{{ targetItem?.name }}</strong>? This action cannot be undone.
        </p>
        <div class="d-flex justify-center ga-3">
          <v-btn variant="tonal" rounded="lg" class="flex-grow-1" @click="dialogDelete = false">Cancel</v-btn>
          <v-btn
            color="error" variant="flat" rounded="lg" class="flex-grow-1"
            :loading="!!store.deleting"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" rounded="lg" timeout="3000" location="bottom right">
      {{ snackbarMessage }}
    </v-snackbar>

  </v-container>
</template>

<style scoped>
.page-header {
  position: sticky;
  top: 65px;
  z-index: 10;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
</style>