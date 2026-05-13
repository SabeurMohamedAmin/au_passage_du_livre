<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useEventsStore, type EventWithRelations, type EventPayload } from '~/stores/events'
import { useIntervenantsStore } from '~/stores/intervenants'

// ── i18n ──────────────────────────────────────────────────────────────────
const { locales, t } = useI18n()
const availableLocales = computed(() =>
  (locales.value as any[]).map(l => ({ code: l.code, name: l.name }))
)
const editingLocale = ref('fr')

// ── Stores ────────────────────────────────────────────────────────────────
const eventsStore       = useEventsStore()
const intervenantsStore = useIntervenantsStore()

await Promise.all([eventsStore.fetchAll(), intervenantsStore.fetchAll()])

// ── Form type (flat for the UI, converted to EventPayload on save) ────────
interface SessionTranslationForm {
  title:       string
  description: string
}
interface SessionForm {
  tempId:         string
  date:           string
  time:           string
  location:       string
  translations:   Record<string, SessionTranslationForm>
  intervenantIds: number[]
}
interface DocumentForm {
  tempId: string
  label:  string
  url:    string
}
interface TranslationForm {
  title:        string
  subtitle:     string
  slug:         string
  shortSummary: string
  about:        string
  highlights:   string
}
interface EventForm {
  id:             number | null
  isNextEvent:    boolean
  coverImage:     string
  startDate:      string
  endDate:        string
  time:           string
  locationName:   string
  address:        string
  entranceType:   string
  website:        string
  translations:   Record<string, TranslationForm>
  intervenantIds: number[]
  sessions:       SessionForm[]
  documents:      DocumentForm[]
}

// ── UI state ──────────────────────────────────────────────────────────────
const ui = reactive({
  search:       '',
  dialog:       false,
  deleteDialog: false,
  saving:       false,
  deleting:     false,
  uploading:    false,
  activeTab:    'general',
  snackbar:     { show: false, msg: '', color: 'success' as 'success' | 'error' },
})

const formRef         = ref()
const fileInput       = ref<HTMLInputElement | null>(null)
const eventToDelete   = ref<EventWithRelations | null>(null)
const pendingDeleteId = ref<string | null>(null)

// ── Helpers ───────────────────────────────────────────────────────────────
const tempId = () => Math.random().toString(36).slice(2, 9)

const emptySessionTranslation = (): SessionTranslationForm => ({
  title: '', description: '',
})

function buildEmptySessionTranslations(): Record<string, SessionTranslationForm> {
  const map: Record<string, SessionTranslationForm> = {}
  for (const l of availableLocales.value) map[l.code] = emptySessionTranslation()
  return map
}

const emptySession = (): SessionForm => ({
  tempId: tempId(), date: '', time: '', location: '',
  translations: buildEmptySessionTranslations(), intervenantIds: [],
})

const emptyDocument = (): DocumentForm => ({
  tempId: tempId(), label: '', url: '',
})

const emptyTranslation = (): TranslationForm => ({
  title: '', subtitle: '', slug: '', shortSummary: '', about: '', highlights: '',
})

function buildEmptyTranslations(): Record<string, TranslationForm> {
  const map: Record<string, TranslationForm> = {}
  for (const l of availableLocales.value) map[l.code] = emptyTranslation()
  return map
}

const emptyForm = (): EventForm => ({
  id: null, isNextEvent: false, coverImage: '', startDate: '', endDate: '',
  time: '', locationName: '', address: '', entranceType: 'Entrée gratuite',
  website: '', translations: buildEmptyTranslations(),
  intervenantIds: [], sessions: [], documents: [],
})

const form = ref<EventForm>(emptyForm())

// ── Options ───────────────────────────────────────────────────────────────
const entranceOptions = computed(() => [
  { title: t('Entrée gratuite'), value: 'Entrée gratuite' },
  { title: t('Entrée payante'), value: 'Entrée payante' },
  { title: t('Sur invitation'), value: 'Sur invitation' },
  { title: t('Sur inscription'), value: 'Sur inscription' },
])

const speakerOptions = computed(() =>
  intervenantsStore.items.map(i => ({ id: i.id!, name: i.name }))
)

// ── Computed ──────────────────────────────────────────────────────────────
const filteredEvents = computed(() => eventsStore.filterBySearch(ui.search))
const isEditing      = computed(() => form.value.id !== null)

// Auto-generated slug preview from title (used as placeholder)
function toSlug(text: string): string {
  return text.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
const autoSlug = computed(() =>
  toSlug(form.value.translations[editingLocale.value]?.title ?? '') || 'mon-evenement',
)
const currentTranslation = computed(() =>
  form.value.translations[editingLocale.value] ?? emptyTranslation(),
)

// ── Notifications ─────────────────────────────────────────────────────────
const notify = (msg: string, color: 'success' | 'error' = 'success') => {
  ui.snackbar = { show: true, msg, color }
}

// ── Dialog ────────────────────────────────────────────────────────────────
function openDialog(event?: EventWithRelations) {
  if (event) {
    const translations = buildEmptyTranslations()
    for (const t of event.translations) {
      if (translations[t.locale]) {
        translations[t.locale] = {
          title: t.title,
          subtitle: t.subtitle,
          slug: t.slug,
          shortSummary: t.shortSummary,
          about: t.about,
          highlights: t.highlights,
        }
      }
    }
    form.value = {
      id:             event.id,
      isNextEvent:    event.isNextEvent,
      coverImage:     event.coverImage,
      startDate:      event.startDate,
      endDate:        event.endDate,
      time:           event.time,
      locationName:   event.locationName,
      address:        event.address,
      entranceType:   event.entranceType,
      website:        event.website,
      translations,
      intervenantIds: event.intervenants.map(ei => ei.intervenantId),
      sessions: event.sessions.map(s => {
        const sessionTranslations = buildEmptySessionTranslations()
        for (const st of s.translations) {
          if (sessionTranslations[st.locale]) {
            sessionTranslations[st.locale] = {
              title:       st.title,
              description: st.description,
            }
          }
        }
        return {
          tempId:         tempId(),
          date:           s.date,
          time:           s.time,
          location:       s.location,
          translations:   sessionTranslations,
          intervenantIds: s.intervenants.map(si => si.intervenantId),
        }
      }),
      documents: event.documents.map(d => ({
        tempId: tempId(), label: d.label, url: d.url,
      })),
    }
  } else {
    form.value = emptyForm()
  }
  editingLocale.value = 'fr'
  ui.activeTab = 'general'
  pendingDeleteId.value = null
  ui.dialog = true
}

function openDelete(event: EventWithRelations) {
  eventToDelete.value = event
  ui.deleteDialog = true
}
function closeDeleteDialog() {
  ui.deleteDialog = false
  eventToDelete.value = null
}

// ── Session CRUD ──────────────────────────────────────────────────────────
const addSession    = () => form.value.sessions.push(emptySession())
const requestRemove = (id: string) => { pendingDeleteId.value = id }
const cancelRemove  = () => { pendingDeleteId.value = null }
const confirmRemove = (id: string) => {
  form.value.sessions = form.value.sessions.filter(s => s.tempId !== id)
  pendingDeleteId.value = null
}

// ── Document CRUD ─────────────────────────────────────────────────────────
const addDocument    = () => form.value.documents.push(emptyDocument())
const removeDocument = (id: string) => {
  form.value.documents = form.value.documents.filter(d => d.tempId !== id)
}

// ── Cover image (uploads to /api/admin/upload, persists on disk) ──────────
async function onFileSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  ui.uploading = true
  try {
    const body = new FormData()
    body.append('file', file)
    const { url } = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body,
    })
    form.value.coverImage = url
  } catch {
    notify('Erreur lors de l\'upload.', 'error')
  } finally {
    ui.uploading = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

// ── Build payload from form ───────────────────────────────────────────────
function buildPayload(): EventPayload {
  const f = form.value
  return {
    isNextEvent:  f.isNextEvent,
    coverImage:   f.coverImage,
    startDate:    f.startDate,
    endDate:      f.endDate,
    time:         f.time,
    locationName: f.locationName,
    address:      f.address,
    entranceType: f.entranceType,
    website:      f.website,
    // Only send translations that have at least a title
    translations: Object.entries(f.translations)
      .filter(([, t]) => t.title.trim())
      .map(([locale, t]) => ({
        locale,
        title:        t.title,
        subtitle:     t.subtitle,
        slug:         t.slug,
        shortSummary: t.shortSummary,
        about:        t.about,
        highlights:   t.highlights,
      })),
    intervenantIds: f.intervenantIds,
    sessions: f.sessions.map(s => ({
      date:           s.date,
      time:           s.time,
      location:       s.location,
      // Only send session translations that have at least a title
      translations:   Object.entries(s.translations)
        .filter(([, t]) => t.title.trim() || t.description.trim())
        .map(([locale, t]) => ({
          locale,
          title:       t.title,
          description: t.description,
        })),
      intervenantIds: s.intervenantIds,
    })),
    documents: f.documents.map(d => ({
      label: d.label,
      url:   d.url,
    })),
  }
}

// ── Save ──────────────────────────────────────────────────────────────────
async function saveEvent() {
  // Only validate the French title as mandatory, not all locales
  const frTitle = form.value.translations['fr']?.title?.trim()
  if (!frTitle) {
    editingLocale.value = 'fr'
    ui.activeTab = 'general'
    return notify('Le titre en français est requis.', 'error')
  }
  if (!form.value.startDate) {
    ui.activeTab = 'general'
    return notify('La date de début est requise.', 'error')
  }

  ui.saving = true
  try {
    const payload = buildPayload()
    if (isEditing.value && form.value.id !== null) {
      await eventsStore.update(form.value.id, payload)
      notify('Événement mis à jour.')
    } else {
      await eventsStore.create(payload)
      notify('Événement publié.')
    }
    ui.dialog = false
  } catch {
    notify('Erreur lors de la sauvegarde.', 'error')
  } finally {
    ui.saving = false
  }
}

// ── Delete ────────────────────────────────────────────────────────────────
async function confirmDelete() {
  if (!eventToDelete.value) return
  ui.deleting = true
  try {
    await eventsStore.remove(eventToDelete.value.id)
    closeDeleteDialog()
    notify('Événement supprimé.')
  } catch {
    notify('Impossible de supprimer.', 'error')
  } finally {
    ui.deleting = false
  }
}

// ── Validation ────────────────────────────────────────────────────────────
const rules = {
  required: (v: any) => !!v || 'Ce champ est requis',
  url:      (v: string) => !v || /^(https?:\/\/|\/)/.test(v) || 'URL invalide',
}
</script>

<template>
  <v-container fluid class="pa-0">

    <!-- Header -->
    <div class="page-header d-flex flex-column flex-md-row align-md-center justify-space-between pa-6 mx-auto mb-4 rounded-b-lg">
      <div class="mb-4 mb-md-0">
        <h1 class="text-h4 font-weight-black text-primary">Événements</h1>
        <p class="text-body-1 text-medium-emphasis">Gérer les événements et intervenants.</p>
      </div>
      <div class="d-flex align-center gap-4">
        <v-text-field
          v-model="ui.search" placeholder="Rechercher..." prepend-inner-icon="mdi-magnify"
          variant="outlined" density="comfortable" hide-details bg-color="surface" style="min-width: 260px"
        />
        <v-btn color="primary" variant="flat" prepend-icon="mdi-plus" rounded="lg" class="font-weight-bold" @click="openDialog()">
          Ajouter
        </v-btn>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="px-6 pb-12 mx-auto" style="max-width: 1400px;">
      <div v-if="filteredEvents.length === 0" class="d-flex flex-column align-center justify-center py-16 text-medium-emphasis">
        <v-icon icon="mdi-calendar-blank" size="64" class="mb-4 opacity-50" />
        <h3 class="text-h6">Aucun événement trouvé</h3>
      </div>

      <div v-else class="events-grid">
        <v-card v-for="ev in filteredEvents" :key="ev.id" flat border rounded="lg" class="event-card d-flex flex-column">
          <div class="border-b position-relative">
            <v-img v-if="ev.coverImage" :src="ev.coverImage" cover height="160" />
            <div v-else class="d-flex align-center justify-center bg-grey-lighten-4" style="height: 160px">
              <v-icon icon="mdi-image-outline" color="grey" size="32" />
            </div>
            <v-chip v-if="ev.isNextEvent" color="primary" variant="flat" size="small" class="font-weight-bold position-absolute top-0 right-0 ma-3">
              NEXT
            </v-chip>
          </div>
          <div class="pa-4 flex-grow-1 d-flex flex-column">
            <h3 class="text-h6 font-weight-bold text-truncate mb-1">{{ eventsStore.frenchTitle(ev) }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-2 text-truncate">
              {{ ev.startDate }} → {{ ev.endDate }} &bull; {{ ev.locationName || 'TBA' }}
            </p>
            <div class="d-flex gap-2 mb-4 flex-wrap">
              <v-chip size="x-small" variant="tonal">{{ ev.entranceType }}</v-chip>
              <v-chip v-if="ev.time" size="x-small" variant="tonal" prepend-icon="mdi-clock-outline">{{ ev.time }}</v-chip>
            </div>
            <v-spacer />
            <v-divider class="mb-3" />
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex gap-2">
                <span class="text-caption">{{ ev.intervenants.length }} intervenants</span>
                <span class="text-caption">&bull;</span>
                <span class="text-caption">{{ ev.sessions.length }} sessions</span>
              </div>
              <div class="d-flex gap-1">
                <v-btn icon="mdi-pencil-outline" variant="text" density="comfortable" @click="openDialog(ev)" />
                <v-btn icon="mdi-trash-can-outline" variant="text" density="comfortable" color="error" @click="openDelete(ev)" />
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- ====== EDIT / CREATE DIALOG ====== -->
    <v-dialog v-model="ui.dialog" max-width="1100" persistent scrollable>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center justify-space-between px-6 py-4 border-b">
          <span class="text-h5 font-weight-bold">{{ isEditing ? 'Éditer' : 'Nouvel Événement' }}</span>
          <div class="d-flex align-center gap-3">
            <v-select
              v-model="editingLocale"
              :items="availableLocales"
              item-title="name"
              item-value="code"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 150px"
              prepend-inner-icon="mdi-translate"
            />
            <v-btn variant="tonal" @click="ui.dialog = false">Annuler</v-btn>
            <v-btn color="primary" :loading="ui.saving" @click="saveEvent">
              {{ isEditing ? 'Enregistrer' : 'Publier' }}
            </v-btn>
          </div>
        </v-card-title>

        <v-tabs v-model="ui.activeTab" color="primary" class="border-b px-4" style="min-height:48px">
          <v-tab value="general" prepend-icon="mdi-information-outline">Général</v-tab>
          <v-tab value="schedule" prepend-icon="mdi-calendar-clock">
            Programme
            <v-badge v-if="form.sessions.length" :content="form.sessions.length" color="primary" inline class="ml-1" />
          </v-tab>
          <v-tab value="speakers" prepend-icon="mdi-account-group-outline">
            Intervenants
            <v-badge v-if="form.intervenantIds.length" :content="form.intervenantIds.length" color="primary" inline class="ml-1" />
          </v-tab>
          <v-tab value="documents" prepend-icon="mdi-folder-outline">
            Documents
            <v-badge v-if="form.documents.length" :content="form.documents.length" color="primary" inline class="ml-1" />
          </v-tab>
        </v-tabs>

        <v-card-text class="pa-6">
          <v-form ref="formRef">
            <v-window v-model="ui.activeTab">

              <!-- TAB: GÉNÉRAL -->
              <v-window-item value="general">
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex align-center justify-space-between border rounded-lg pa-4 mb-2">
                      <div>
                        <h4 class="text-primary font-weight-bold">Mettre en avant</h4>
                        <p class="text-caption mb-0">Affiche cet événement en haut de la page d'accueil.</p>
                      </div>
                      <v-switch v-model="form.isNextEvent" color="primary" hide-details inset />
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="mb-2 mt-4">
                      <h4 class="text-h6 font-weight-bold">Textes & Traductions</h4>
                    </div>
                    <v-divider class="mb-4" />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12" md="4">
                    <v-text-field v-model="form.translations[editingLocale]!.title" label="Titre *" variant="outlined" :rules="[rules.required]" />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12" md="4">
                    <v-text-field v-model="form.translations[editingLocale]!.subtitle" label="Sous-titre" variant="outlined" />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12" md="4">
                    <v-text-field
                      v-model="form.translations[editingLocale]!.slug" label="Slug" variant="outlined"
                      :placeholder="autoSlug" persistent-placeholder
                      hint="Laissez vide pour générer automatiquement depuis le titre."
                      persistent-hint
                    />
                  </v-col>
                  <v-col cols="12">
                    <p class="text-subtitle-2 font-weight-bold mb-2">Image de couverture</p>
                    <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="onFileSelected" />
                    <div
                      class="cover-upload-zone border rounded-lg d-flex align-center justify-center cursor-pointer"
                      @click="fileInput?.click()"
                      style="min-height: 200px; position: relative; border: 2px dashed rgba(var(--v-theme-primary), 0.4);"
                    >
                      <v-progress-circular v-if="ui.uploading" indeterminate color="primary" size="48" />
                      <v-img v-else-if="form.coverImage" :src="form.coverImage" cover height="200" class="rounded-lg w-100" />
                      <div v-else class="text-center pa-6">
                        <v-icon icon="mdi-image-plus" size="48" color="grey" class="mb-2" />
                        <p class="text-body-2 text-medium-emphasis mb-0">Cliquez pour ajouter une image</p>
                      </div>
                      <v-btn v-if="form.coverImage && !ui.uploading" icon="mdi-close" size="x-small" color="error"
                        class="position-absolute top-0 right-0 ma-2" @click.stop="form.coverImage = ''" />
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.startDate" type="date" label="Date de début *" variant="outlined" :rules="[rules.required]" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.endDate" type="date" label="Date de fin" variant="outlined" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="form.time" label="Horaires" variant="outlined" placeholder="ex: 10:00 – 20:00" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.locationName" label="Nom du lieu" variant="outlined" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.address" label="Adresse" variant="outlined" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select v-model="form.entranceType" :items="entranceOptions" label="Type d'entrée" variant="outlined" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="form.website" label="Site Web" variant="outlined" :rules="[rules.url]" placeholder="https://..." />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12">
                    <v-textarea v-model="form.translations[editingLocale]!.shortSummary" label="Résumé court" variant="outlined" rows="2" />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12">
                    <v-textarea v-model="form.translations[editingLocale]!.about" label="À propos" variant="outlined" rows="4" />
                  </v-col>
                  <v-col v-if="form.translations[editingLocale]" cols="12">
                    <v-textarea v-model="form.translations[editingLocale]!.highlights" label="Points forts du programme" variant="outlined" rows="3"
                      placeholder="Un point par ligne" />
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- TAB: PROGRAMME -->
              <v-window-item value="schedule">
                <div class="d-flex align-center justify-space-between mb-4">
                  <h3 class="text-h6 font-weight-bold">Programme détaillé</h3>
                  <v-btn color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addSession">Ajouter</v-btn>
                </div>
                <v-expansion-panels variant="accordion" class="mb-2">
                  <v-expansion-panel v-for="(s, i) in form.sessions" :key="s.tempId" rounded="lg" class="mb-2 border">
                    <template #title>
                      <div class="d-flex align-center gap-3 w-100 pr-4">
                        <v-chip size="small" variant="tonal" color="primary">{{ s.date || 'Aucune date' }}</v-chip>
                        <v-chip size="small" variant="tonal">{{ s.time || '--:--' }}</v-chip>
                        <span class="text-truncate font-weight-medium">{{ s.translations[editingLocale]?.title || `Session ${i + 1}` }}</span>
                        <v-spacer />
                        <template v-if="pendingDeleteId === s.tempId">
                          <span class="text-caption text-error font-weight-bold mr-2">Supprimer ?</span>
                          <v-btn size="small" variant="flat" color="error" class="mr-1" @click.stop="confirmRemove(s.tempId)">Oui</v-btn>
                          <v-btn size="small" variant="tonal" @click.stop="cancelRemove">Non</v-btn>
                        </template>
                        <v-btn v-else icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click.stop="requestRemove(s.tempId)" />
                      </div>
                    </template>
                    <v-expansion-panel-text>
                      <v-row class="pt-2">
                        <v-col cols="12" md="4">
                          <v-text-field v-model="s.date" type="date" label="Date *" variant="outlined" density="comfortable" :rules="[rules.required]" />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="s.time" type="time" label="Heure *" variant="outlined" density="comfortable" :rules="[rules.required]" />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="s.location" label="Lieu / Salle" variant="outlined" density="comfortable" />
                        </v-col>
                        <v-col v-if="s.translations[editingLocale]" cols="12">
                          <v-text-field v-model="s.translations[editingLocale]!.title" label="Titre" variant="outlined" density="comfortable" />
                        </v-col>
                        <v-col v-if="s.translations[editingLocale]" cols="12">
                          <v-textarea v-model="s.translations[editingLocale]!.description" label="Description" variant="outlined" density="comfortable" rows="3" />
                        </v-col>
                        <v-col cols="12">
                          <v-select v-model="s.intervenantIds" :items="speakerOptions" item-title="name" item-value="id"
                            label="Intervenants" multiple chips closable-chips variant="outlined" density="comfortable" />
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>

              <!-- TAB: INTERVENANTS -->
              <v-window-item value="speakers">
                <h3 class="text-h6 font-weight-bold mb-1">Les Intervenants</h3>
                <p class="text-caption text-medium-emphasis mb-4">Intervenants principaux de l'événement.</p>
                <v-select v-model="form.intervenantIds" :items="speakerOptions" item-title="name" item-value="id"
                  label="Intervenants" multiple chips closable-chips variant="outlined" />
              </v-window-item>

              <!-- TAB: DOCUMENTS -->
              <v-window-item value="documents">
                <div class="d-flex align-center justify-space-between mb-4">
                  <h3 class="text-h6 font-weight-bold">Documents & Archives</h3>
                  <v-btn color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addDocument">Ajouter</v-btn>
                </div>
                <v-row>
                  <v-col v-for="doc in form.documents" :key="doc.tempId" cols="12" md="6">
                    <v-card flat border rounded="lg" class="pa-4">
                      <div class="d-flex align-start gap-3">
                        <v-icon icon="mdi-file-pdf-box" color="error" size="32" class="mt-1" />
                        <div class="flex-grow-1">
                          <v-text-field v-model="doc.label" label="Libellé" variant="outlined" density="compact" class="mb-2" />
                          <v-text-field v-model="doc.url" label="URL" variant="outlined" density="compact" :rules="[rules.url]" />
                        </div>
                        <v-btn icon="mdi-trash-can-outline" variant="text" color="error" size="small" @click="removeDocument(doc.tempId)" />
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-window-item>

            </v-window>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ====== DELETE DIALOG ====== -->
    <v-dialog v-model="ui.deleteDialog" max-width="480" persistent>
      <v-card rounded="xl" class="pa-6">
        <div class="d-flex align-center gap-3 mb-4">
          <v-icon icon="mdi-alert-circle" color="error" size="36" />
          <h3 class="text-h5 font-weight-bold">Supprimer ?</h3>
        </div>
        <v-alert variant="plain" rounded="lg" class="mb-4 text-body-1">
          Cette action est <strong>définitive</strong>. Toutes les données liées seront perdues.
        </v-alert>
        <div class="d-flex gap-3 justify-end mt-4">
          <v-btn variant="tonal" @click="closeDeleteDialog">Annuler</v-btn>
          <v-btn color="error" :loading="ui.deleting" prepend-icon="mdi-trash-can" @click="confirmDelete">
            Supprimer
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="ui.snackbar.show" :color="ui.snackbar.color" rounded="pill" location="bottom right">
      {{ ui.snackbar.msg }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.cursor-pointer { cursor: pointer; }
.cover-upload-zone { transition: border-color 0.2s; }
.cover-upload-zone:hover { border-color: rgb(var(--v-theme-primary)) !important; }
</style>