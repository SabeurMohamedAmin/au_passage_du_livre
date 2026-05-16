<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})
import { useBlogsStore, type Blog } from '~/stores/blogs'

const store = useBlogsStore()

// ── Local UI state ─────────────────────────────────────────────────────────
const dialog       = ref(false)
const dialogDelete = ref(false)
const isEditing    = ref(false)
const targetItem   = ref<Blog | null>(null)

const snackbar        = ref(false)
const snackbarMessage = ref('')
const snackbarColor   = ref<'success' | 'error'>('success')

const formRef    = ref()
const search     = ref('')
const filterCategory = ref<string | null>(null)

// ── Image state ────────────────────────────────────────────────────────────
const fileInput         = ref<HTMLInputElement | null>(null)
const authorFileInput   = ref<HTMLInputElement | null>(null)

const pendingFile       = ref<File | null>(null)
const previewUrl        = ref<string | null>(null)

const pendingAuthorFile = ref<File | null>(null)
const authorPreviewUrl  = ref<string | null>(null)

const availableCategories = ['events', 'news', 'community']

// ── Blank form ─────────────────────────────────────────────────────────────
function blankForm(): Blog {
  return {
    title: '', slug: '', summary: '', content: '',
    author: '', category: 'news', date: new Date().toISOString().substring(0, 10),
    image: null, authorImage: null
  }
}

const form = ref<Blog>(blankForm())

// ── Filtered list ──────────────────────────────────────────────────────────
const filtered = computed(() => {
  let list = store.items
  if (filterCategory.value) list = list.filter(i => i.category === filterCategory.value)
  const q = search.value.toLowerCase()
  if (q) list = list.filter(i =>
    i.title.toLowerCase().includes(q) ||
    i.author.toLowerCase().includes(q)
  )
  return list
})

// ── Bootstrap ──────────────────────────────────────────────────────────────
onMounted(async () => {
  try { await store.fetchAll() }
  catch { showSnackbar('Failed to load blogs', 'error') }
})

// ── Dialogs ────────────────────────────────────────────────────────────────
function openCreate() {
  isEditing.value         = false
  pendingFile.value       = null
  previewUrl.value        = null
  pendingAuthorFile.value = null
  authorPreviewUrl.value  = null
  form.value              = blankForm()
  dialog.value            = true
}

function openEdit(item: Blog) {
  isEditing.value         = true
  targetItem.value        = item
  pendingFile.value       = null
  previewUrl.value        = null
  pendingAuthorFile.value = null
  authorPreviewUrl.value  = null
  form.value = JSON.parse(JSON.stringify({
    ...item,
    date: item.date ? new Date(item.date).toISOString().substring(0, 10) : ''
  }))
  dialog.value = true
}

function openDelete(item: Blog) {
  targetItem.value   = item
  dialogDelete.value = true
}

function closeDialog() {
  dialog.value            = false
  pendingFile.value       = null
  previewUrl.value        = null
  pendingAuthorFile.value = null
  authorPreviewUrl.value  = null
  formRef.value?.reset()
}

// ── Image handling ─────────────────────────────────────────────────────────
function onFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)

  pendingFile.value = file
  previewUrl.value  = URL.createObjectURL(file)
  form.value.image  = previewUrl.value
  if (fileInput.value) fileInput.value.value = ''
}

function removeImage() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  pendingFile.value = null
  previewUrl.value  = null
  form.value.image  = null
}

function onAuthorFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (authorPreviewUrl.value) URL.revokeObjectURL(authorPreviewUrl.value)

  pendingAuthorFile.value = file
  authorPreviewUrl.value  = URL.createObjectURL(file)
  form.value.authorImage  = authorPreviewUrl.value
  if (authorFileInput.value) authorFileInput.value.value = ''
}

function removeAuthorImage() {
  if (authorPreviewUrl.value) URL.revokeObjectURL(authorPreviewUrl.value)
  pendingAuthorFile.value = null
  authorPreviewUrl.value  = null
  form.value.authorImage  = null
}

// ── Build request body ─────────────────────────────────────────────────────
function buildPayload(): FormData | Partial<Blog> {
  const hasFile = !!pendingFile.value || !!pendingAuthorFile.value

  if (!hasFile) {
    const { id: _id, createdAt: _ca, updatedAt: _ua, ...rest } = form.value as any
    return rest
  }

  const { image: _img, authorImage: _ai, id: _id, createdAt: _ca, updatedAt: _ua, ...rest } = form.value as any
  const fd = new FormData()
  if (pendingFile.value) fd.append('file', pendingFile.value)
  if (pendingAuthorFile.value) fd.append('authorFile', pendingAuthorFile.value)
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
      showSnackbar('Blog updated', 'success')
    } else {
      await store.create(payload as any)
      showSnackbar('Blog created', 'success')
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
    showSnackbar('Blog deleted', 'success')
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

watch(() => form.value.title, (newTitle) => {
  if (!isEditing.value && newTitle) {
    form.value.slug = newTitle
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

const rules = {
  required: (v: string) => !!v?.trim() || 'Required',
}
</script>

<template>
  <v-container fluid class="pa-6">

    <!-- Header -->
    <div class="page-header mb-6">
      <div class="d-flex align-center justify-space-between gap-4 px-6 py-4">
        <div>
          <h1 class="text-h5 font-weight-black">Blogs</h1>
          <p class="text-body-2 text-medium-emphasis mt-1">Manage blog articles and news.</p>
        </div>
        <v-btn color="primary" variant="flat" prepend-icon="mdi-plus" rounded="lg" @click="openCreate">
          New Article
        </v-btn>
      </div>
      <v-divider />
    </div>

    <!-- Table -->
    <v-card flat rounded="lg" border>
      <div class="d-flex align-center flex-wrap ga-3 pa-4">
        <v-text-field
          v-model="search"
          placeholder="Search by title or author..."
          variant="outlined" density="compact" hide-details
          rounded="lg" prepend-inner-icon="mdi-magnify" clearable
          style="max-width: 300px"
        />
        <v-select
          v-model="filterCategory"
          :items="[{ title: 'All', value: null }, ...availableCategories.map(r => ({ title: r, value: r }))]"
          item-title="title" item-value="value"
          variant="outlined" density="compact" hide-details
          rounded="lg" style="max-width: 180px"
        />
        <v-spacer />
        <v-chip size="small" variant="tonal" color="primary">{{ filtered.length }} articles</v-chip>
      </div>

      <v-divider />

      <v-data-table
        :headers="[
          { title: 'Title',     key: 'title',     sortable: true  },
          { title: 'Category',  key: 'category',  sortable: true  },
          { title: 'Author',    key: 'author',    sortable: true  },
          { title: 'Date',      key: 'date',      sortable: true  },
          { title: '',          key: 'actions',   sortable: false, align: 'end' },
        ]"
        :items="filtered"
        :loading="store.loading"
        item-value="id"
        hover
      >
        <template #item.title="{ item }">
          <div class="d-flex align-center ga-3 py-2">
            <v-avatar size="36" class="rounded-lg border border-medium-emphasis">
              <v-img v-if="item.image" :src="item.image" />
              <v-icon v-else size="36" icon="mdi-image-outline" />
            </v-avatar>
            <span class="font-weight-medium">{{ item.title }}</span>
          </div>
        </template>

        <template #item.category="{ item }">
          <v-chip size="small" variant="tonal">{{ item.category }}</v-chip>
        </template>
        
        <template #item.date="{ item }">
          <span>{{ new Date(item.date).toLocaleDateString() }}</span>
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
            {{ isEditing ? `Edit — ${form.title}` : 'New Article' }}
          </span>
        </div>
        <v-divider />

        <v-card-text class="pa-6" style="max-height: 75vh;">
          <v-form ref="formRef">
            <v-row dense>

              <!-- Image Upload -->
              <v-col cols="12" class="d-flex flex-column align-center ga-3 pt-2">
                <v-img v-if="form.image" :src="form.image" height="200" width="100%" cover class="rounded-lg border" />
                <v-sheet v-else height="200" width="100%" class="rounded-lg border d-flex align-center justify-center bg-surface-variant">
                  <v-icon icon="mdi-image-outline" size="48" />
                </v-sheet>
                
                <input
                  ref="fileInput" type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="d-none"
                  @change="onFileSelected"
                />
                <div class="d-flex ga-2">
                  <v-btn
                    variant="tonal" size="small"
                    prepend-icon="mdi-camera-outline" rounded="lg"
                    @click="fileInput?.click()"
                  >
                    {{ form.image ? 'Replace Cover' : 'Upload Cover' }}
                  </v-btn>
                  <v-btn
                    v-if="form.image"
                    variant="text" size="small" color="error"
                    @click="removeImage"
                  >
                    Remove
                  </v-btn>
                </div>
              </v-col>

              <!-- Core Info -->
              <v-col cols="12">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.title" label="Title" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.slug" label="Slug" variant="outlined" density="compact"
                      :rules="[rules.required]" prepend-inner-icon="mdi-link-variant"
                      hint="Used in the URL" persistent-hint
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.category" :items="availableCategories" label="Category"
                      variant="outlined" density="compact" :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12"><v-divider class="my-4" /></v-col>

              <!-- Content -->
              <v-col cols="12">
                <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Content</p>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.summary" label="Summary (Excerpt)" variant="outlined" density="compact" :rows="2" no-resize hint="Brief summary shown on cards" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="form.content" label="Full Content (HTML allowed)" variant="outlined" density="compact" :rows="10" auto-grow />
              </v-col>

              <v-col cols="12"><v-divider class="my-4" /></v-col>

              <!-- Author & Date -->
              <v-col cols="12">
                <p class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Author & Date</p>
              </v-col>
              
              <v-col cols="12" sm="3" class="d-flex flex-column align-center ga-3">
                <v-avatar size="80" rounded="lg" color="surface-variant">
                  <v-img v-if="form.authorImage" :src="form.authorImage" />
                  <v-icon v-else icon="mdi-account-outline" size="32" />
                </v-avatar>
                <input
                  ref="authorFileInput" type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="d-none"
                  @change="onAuthorFileSelected"
                />
                <v-btn
                  variant="text" size="x-small"
                  @click="authorFileInput?.click()"
                >
                  Change
                </v-btn>
              </v-col>
              <v-col cols="12" sm="9">
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field v-model="form.author" label="Author Name" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="form.date" type="date" label="Publish Date" variant="outlined" density="compact" :rules="[rules.required]" />
                  </v-col>
                </v-row>
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
            {{ isEditing ? 'Save changes' : 'Create article' }}
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
        <h3 class="text-h6 font-weight-bold mb-2">Delete Article?</h3>
        <p class="text-body-2 text-medium-emphasis mb-6">
          Are you sure you want to delete <strong>{{ targetItem?.title }}</strong>? This action cannot be undone.
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
