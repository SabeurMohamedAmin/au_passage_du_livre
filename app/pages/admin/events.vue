<script setup lang="ts">

// --- MOCK STORE & STATE ---
const isLoading = ref(false)
const saving = ref(false)
const deleting = ref(false)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref<'success' | 'error'>('success')

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const formRef = ref()

// Event Data Structure based on your UI images
interface AppEvent {
  id: string | null;
  isNextEvent: boolean;
  title: string;
  subtitle: string;
  coverImage: string;
  
  // Logistics
  startDate: string;
  endDate: string;
  time: string;
  locationName: string;
  address: string;
  entranceType: string; // e.g., "Entrée libre"
  website: string;
  
  // Content
  shortSummary: string; // For "Quoi ?" card
  about: string; // "À propos de l'événement"
  highlights: string; // "Au programme du salon"
  
  // Relationships
  speakerIds: string[];
}

const defaultForm: AppEvent = {
  id: null,
  isNextEvent: false,
  title: '',
  subtitle: '',
  coverImage: '',
  startDate: '',
  endDate: '',
  time: '',
  locationName: '',
  address: '',
  entranceType: '',
  website: '',
  shortSummary: '',
  about: '',
  highlights: '',
  speakerIds: [],
}

const form = ref<AppEvent>({ ...defaultForm })
const eventToDelete = ref<AppEvent | null>(null)

// --- MOCK DATA ---
const events = ref<AppEvent[]>([
  {
    id: '1',
    isNextEvent: true,
    title: 'Au Passage du Livre Goes European',
    subtitle: 'Foire Européenne 2026',
    coverImage: 'https://via.placeholder.com/1200x600',
    startDate: '2026-09-04',
    endDate: '2026-09-14',
    time: '10:00 - 20:00',
    locationName: 'Hall 5',
    address: 'Avenue Herrenschmidt, Strasbourg',
    entranceType: 'Entrée payante',
    website: 'https://foire-europeenne.com',
    shortSummary: 'Dédicaces, tables rondes et ateliers exclusifs.',
    about: 'Nous vous invitons à nous rejoindre lors de notre prochain événement. Découvrez nos événements passés : lectures, discussions et expériences culturelles...',
    highlights: 'Rencontres avec des auteurs\nAteliers de lecture\nSéances de dédicaces',
    speakerIds: ['spk1', 'spk2'],
  }
])

const availableSpeakers = [
  { id: 'spk1', name: 'Pascal Dedre' },
  { id: 'spk2', name: 'Anne Siegel' },
  { id: 'spk3', name: 'Christian Peultier' },
  { id: 'spk4', name: 'Pascal Graffica' },
]

const filteredEvents = computed(() => {
  if (!search.value) return events.value
  const query = search.value.toLowerCase()
  return events.value.filter(e => e.title.toLowerCase().includes(query))
})

const isEditing = computed(() => !!form.value.id)

// --- ACTIONS ---

function openAddDialog() {
  form.value = { ...defaultForm }
  dialog.value = true
}

function openEditDialog(item: AppEvent) {
  form.value = JSON.parse(JSON.stringify(item)) // Deep clone
  dialog.value = true
}

function openDeleteDialog(item: AppEvent) {
  eventToDelete.value = item
  deleteDialog.value = true
}

const rules = {
  required: (v: any) => !!v || 'Required',
  url: (v: string) => !v || /^(https?:\/\/|\/)/.test(v) || 'Must be a valid URL',
}

async function save() {
  const result = await formRef.value?.validate()
  if (!result?.valid) {
    showSnackbar('Please fill in all required fields correctly', 'error')
    return
  }

  saving.value = true
  try {
    // MOCK API CALL
    await new Promise(res => setTimeout(res, 800))

    if (isEditing.value) {
      const index = events.value.findIndex(e => e.id === form.value.id)
      if (index !== -1) events.value[index] = { ...form.value }
      showSnackbar('Event updated successfully', 'success')
    } else {
      form.value.id = Math.random().toString(36).substr(2, 9)
      events.value.unshift({ ...form.value })
      showSnackbar('Event created successfully', 'success')
    }
    dialog.value = false
  } catch (error) {
    showSnackbar('An error occurred', 'error')
  } finally {
    saving.value = false
  }
}

async function confirmDelete() {
  if (!eventToDelete.value) return
  deleting.value = true
  try {
    // MOCK API CALL
    await new Promise(res => setTimeout(res, 800))
    events.value = events.value.filter(e => e.id !== eventToDelete.value?.id)
    showSnackbar('Event deleted successfully', 'success')
    deleteDialog.value = false
  } catch (error) {
    showSnackbar('Failed to delete event', 'error')
  } finally {
    deleting.value = false
    eventToDelete.value = null
  }
}

// --- IMAGE UPLOAD ---
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

function triggerUpload() {
  fileInput.value?.click()
}

async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploading.value = true
  try {
    // MOCK UPLOAD
    await new Promise(resolve => setTimeout(resolve, 1000))
    form.value.coverImage = URL.createObjectURL(file) 
    showSnackbar('Image uploaded', 'success')
  } catch {
    showSnackbar('Upload failed', 'error')
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function clearImage() {
  form.value.coverImage = ''
}

function showSnackbar(message: string, color: 'success' | 'error') {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}
</script>

<template>
  <v-container fluid class="pa-0">
    
    <!-- ── Header & Global Actions ──────────────────────────────────────── -->
    <div class="page-header d-flex flex-column flex-md-row align-md-center justify-space-between pa-6 mx-auto mb-4 rounded-b-lg">
      <div class="mb-4 mb-md-0">
        <h1 class="text-h4 font-weight-black text-primary">Events</h1>
        <p class="text-body-1 text-medium-emphasis mt-1">
          Manage your association's events, agendas, and speakers.
        </p>
      </div>

      <div class="d-flex align-center gap-4">
        <v-text-field
          v-model="search"
          placeholder="Search events..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          bg-color="surface"
          style="min-width: 260px"
        />
        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-plus"
          rounded="lg"
          class="font-weight-bold"
          @click="openAddDialog"
        >
          Add Event
        </v-btn>
      </div>
    </div>

    <!-- ── Events List ──────────────────────────────────────────────────────── -->
    <div class="px-6 pb-12 mx-auto" style="max-width: 1400px;">
      
      <div v-if="filteredEvents.length === 0" class="d-flex flex-column align-center justify-center py-16 text-medium-emphasis">
        <v-icon icon="mdi-calendar-blank" size="64" class="mb-4 opacity-50" />
        <h3 class="text-h6 font-weight-medium">No events found</h3>
        <p class="text-body-2 mt-1">Click 'Add Event' to create your first event.</p>
      </div>

      <div v-else class="events-grid">
        <v-card 
          v-for="event in filteredEvents" 
          :key="event.id ?? ''" 
          flat 
          border 
          rounded="lg" 
          class="event-card d-flex flex-column"
        >
          <!-- Card Image -->
          <div class="event-card-img-wrapper border-b">
            <v-img v-if="event.coverImage" :src="event.coverImage" cover height="160" />
            <div v-else class="h-100 d-flex align-center justify-center bg-grey-lighten-4">
              <v-icon icon="mdi-image-outline" color="grey" size="32" />
            </div>
            <v-chip v-if="event.isNextEvent" color="primary" variant="flat" size="small" class="font-weight-bold position-absolute top-0 right-0 ma-3">
              NEXT EVENT
            </v-chip>
          </div>

          <!-- Card Content -->
          <div class="pa-4 flex-grow-1 d-flex flex-column">
            <h3 class="text-h6 font-weight-bold text-truncate mb-1">{{ event.title }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-4 text-truncate">
              {{ event.startDate }} &bull; {{ event.locationName || 'Location TBA' }}
            </p>
            
            <v-spacer />
            
            <v-divider class="mb-3" />
            
            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">
                {{ event.speakerIds.length }} Speakers
              </span>
              <div class="d-flex gap-1">
                <v-btn icon="mdi-pencil-outline" variant="text" density="comfortable" color="medium-emphasis" @click="openEditDialog(event)" />
                <v-btn icon="mdi-trash-can-outline" variant="text" density="comfortable" color="error" @click="openDeleteDialog(event)" />
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- ── Add / Edit Dialog (Full Screen capable) ────────────────────────── -->
    <v-dialog v-model="dialog" max-width="1000" persistent scrollable>
      <v-card rounded="xl" class="bg-surface">
        
        <!-- Dialog Sticky Header -->
        <v-card-title class="dialog-header d-flex align-center justify-space-between px-6 py-4 border-b">
          <div>
            <span class="text-h5 font-weight-bold d-block">{{ isEditing ? 'Edit Event' : 'Create New Event' }}</span>
            <span class="text-body-2 text-medium-emphasis d-block mt-1">Configure event details, logistics, and content.</span>
          </div>
          <div class="d-flex gap-3">
            <v-btn variant="tonal" class="font-weight-bold" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" variant="flat" class="font-weight-bold px-6" :loading="saving" @click="save">
              {{ isEditing ? 'Save Changes' : 'Publish Event' }}
            </v-btn>
          </div>
        </v-card-title>

        <!-- Dialog Scrollable Content -->
        <v-card-text class="pa-0">
          <v-form ref="formRef" class="pa-6">
            <div class="d-flex flex-column" style="gap: 56px;">

              <!-- 1. Highlight / Status -->
              <section>
                <div class="d-flex align-center justify-space-between bg-blue-lighten-5 border border-primary-lighten-3 rounded-lg pa-5">
                  <div>
                    <h4 class="text-h6 font-weight-bold text-primary mb-1">Mark as "Next Event"</h4>
                    <p class="text-body-2 text-medium-emphasis mb-0">Setting this to active will display this event in the hero banner of the Events page.</p>
                  </div>
                  <v-switch v-model="form.isNextEvent" color="primary" hide-details inset />
                </div>
              </section>

              <!-- 2. General Information -->
              <section>
                <div class="d-flex align-center gap-3 mb-6">
                  <v-avatar color="primary" variant="tonal" size="36" class="font-weight-bold">1</v-avatar>
                  <h2 class="text-h5 font-weight-bold mb-0">General Information</h2>
                </div>
                
                <v-card flat rounded="lg" border class="pa-6">
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.title" label="Event Title" variant="outlined" density="comfortable" :rules="[rules.required]" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.subtitle" label="Subtitle (e.g. Foire Européenne 2026)" variant="outlined" density="comfortable" />
                    </v-col>

                    <!-- Cover Image -->
                    <v-col cols="12" class="mt-2">
                      <p class="text-subtitle-2 font-weight-bold text-medium-emphasis mb-3">Cover Image (Banner)</p>
                      <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="d-none" @change="onFileSelected" />
                      
                      <div class="slot-preview" :class="{ 'has-image': !!form.coverImage }" @click="triggerUpload">
                        <div v-if="uploading" class="slot-overlay">
                          <v-progress-circular indeterminate color="primary" size="48" width="3" />
                        </div>
                        
                        <img v-else-if="form.coverImage" :src="form.coverImage" alt="Cover" class="slot-img" />
                        
                        <div v-else class="slot-empty">
                          <v-icon icon="mdi-image-plus" size="48" color="medium-emphasis" class="mb-3" />
                          <span class="text-body-1 font-weight-medium">Click to upload cover image</span>
                          <span class="text-caption text-medium-emphasis mt-1">Recommended: 1200 x 600px (WebP, JPG)</span>
                        </div>

                        <button v-if="form.coverImage && !uploading" class="slot-remove" title="Remove image" @click.stop="clearImage">
                          <v-icon icon="mdi-close" size="16" color="white" />
                        </button>
                        <div v-if="form.coverImage && !uploading" class="slot-hover-overlay">
                          <v-icon icon="mdi-camera-retake" size="36" color="white" />
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </section>

              <!-- 3. Logistics -->
              <section>
                <div class="d-flex align-center gap-3 mb-6">
                  <v-avatar color="primary" variant="tonal" size="36" class="font-weight-bold">2</v-avatar>
                  <h2 class="text-h5 font-weight-bold mb-0">Logistics</h2>
                </div>
                
                <v-card flat rounded="lg" border class="pa-6">
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="form.startDate" type="date" label="Start Date" variant="outlined" density="comfortable" :rules="[rules.required]" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="form.endDate" type="date" label="End Date" variant="outlined" density="comfortable" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field v-model="form.time" label="Time (e.g. 10:00 - 20:00)" variant="outlined" density="comfortable" prepend-inner-icon="mdi-clock-outline" />
                    </v-col>
                    
                    <v-col cols="12"><v-divider class="my-3" /></v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.locationName" label="Location / Building Name" variant="outlined" density="comfortable" prepend-inner-icon="mdi-domain" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.address" label="Full Address" variant="outlined" density="comfortable" prepend-inner-icon="mdi-map-marker-outline" />
                    </v-col>

                    <v-col cols="12"><v-divider class="my-3" /></v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.entranceType" label="Entrance Info (e.g. Entrée libre)" variant="outlined" density="comfortable" prepend-inner-icon="mdi-ticket-confirmation-outline" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="form.website" label="Website Link" variant="outlined" density="comfortable" :rules="[rules.url]" prepend-inner-icon="mdi-link" />
                    </v-col>
                  </v-row>
                </v-card>
              </section>

              <!-- 4. Content & Agenda -->
              <section>
                <div class="d-flex align-center gap-3 mb-6">
                  <v-avatar color="primary" variant="tonal" size="36" class="font-weight-bold">3</v-avatar>
                  <h2 class="text-h5 font-weight-bold mb-0">Content & Description</h2>
                </div>
                
                <v-card flat rounded="lg" border class="pa-6">
                  <v-row dense>
                    <v-col cols="12">
                      <v-textarea 
                        v-model="form.shortSummary" 
                        label="Short Summary (Quoi ?)" 
                        placeholder="Brief overview for cards (e.g., Dédicaces, tables rondes...)"
                        variant="outlined" 
                        density="comfortable" 
                        rows="3" 
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea 
                        v-model="form.about" 
                        label="About the event (À propos)" 
                        placeholder="Full description of the event..."
                        variant="outlined" 
                        density="comfortable" 
                        rows="4" 
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea 
                        v-model="form.highlights" 
                        label="Program Highlights (Au programme)" 
                        placeholder="List key activities, one per line..."
                        variant="outlined" 
                        density="comfortable" 
                        rows="4" 
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </section>

              <!-- 5. Speakers -->
              <section>
                <div class="d-flex align-center gap-3 mb-6">
                  <v-avatar color="primary" variant="tonal" size="36" class="font-weight-bold">4</v-avatar>
                  <h2 class="text-h5 font-weight-bold mb-0">Speakers (Intervenants)</h2>
                </div>
                
                <v-card flat rounded="lg" border class="pa-6">
                  <v-select
                    v-model="form.speakerIds"
                    :items="availableSpeakers"
                    item-title="name"
                    item-value="id"
                    label="Assign Speakers to Event"
                    multiple
                    chips
                    closable-chips
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-account-group-outline"
                  />
                </v-card>
              </section>

            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ── Delete Confirmation Dialog ───────────────────────────────────────── -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card rounded="xl" class="text-center pa-6">
        <v-icon icon="mdi-alert-circle-outline" color="error" size="64" class="mx-auto mb-4" />
        <h3 class="text-h5 font-weight-bold mb-2">Delete Event?</h3>
        <p class="text-body-1 text-medium-emphasis mb-6">
          Are you sure you want to delete <strong>{{ eventToDelete?.title }}</strong>? This action cannot be undone.
        </p>
        <div class="d-flex gap-3 justify-center">
          <v-btn variant="tonal" class="px-6 font-weight-bold" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" variant="flat" class="px-6 font-weight-bold" :loading="deleting" @click="confirmDelete">Delete</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- ── Snackbar ─────────────────────────────────────────────────────────── -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" rounded="pill" timeout="3000" location="bottom center">
      <v-icon :icon="snackbarColor === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" class="mr-2" />
      <span class="font-weight-medium">{{ snackbarMessage }}</span>
    </v-snackbar>

  </v-container>
</template>

<style scoped>
/* ── Sticky Headers ─────────────── */
.page-header {
  position: sticky;
  top: 65px;
  z-index: 5;
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
}

.dialog-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* ── Events Grid ──────────── */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.event-card {
  transition: all 0.2s ease;
  background: rgb(var(--v-theme-surface));
}
.event-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.08);
  transform: translateY(-2px);
}

.event-card-img-wrapper {
  position: relative;
  background: #f5f5f5;
}

/* ── Image Upload Slot ─────────── */
.slot-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9; /* Wide banner format for events */
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
  border: 2px dashed #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.slot-preview:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background: rgba(var(--v-theme-primary), 0.05);
}

.slot-preview.has-image {
  border-color: transparent;
}

.slot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slot-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.slot-remove {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e53935;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.15s ease, background 0.15s ease;
}

.slot-remove:hover {
  transform: scale(1.15);
  background: #c62828;
}

.slot-overlay,
.slot-hover-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.slot-overlay {
  background: rgba(255, 255, 255, 0.7);
}

.slot-hover-overlay {
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.slot-preview:hover .slot-hover-overlay {
  opacity: 1;
}
</style>