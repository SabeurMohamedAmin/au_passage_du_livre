<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'admin'
})
import type { DataTableHeader } from 'vuetify'
import { useSponsorsStore, type Sponsor } from '~/stores/sponsors'
import SponsorFormDialog from '~/components/sponsors/SponsorFormDialog.vue'

const store = useSponsorsStore()

const { sponsors, isLoading } = storeToRefs(store)

const search = ref('')

// ✅ Single clean fetch using the correct DB action
await useAsyncData('admin-sponsors', () => store.fetchSponsors())

const deleteDialog = ref(false)
const deleting = ref(false)
const selectedSponsor = ref<Sponsor | null>(null)

const categories = [
  'Event Partner',
  'Logistics',
  'Real Estate',
  'Gastronomy',
  'Hospitality',
  'Tech Partner',
  'Services',
]

const headers: DataTableHeader[] = [
  { title: '', key: 'logoUrl', sortable: false, width: '60px' },
  { title: 'Name', key: 'name' },
  { title: 'Category', key: 'category' },
  { title: 'Address', key: 'address', sortable: false },
  { title: 'Website', key: 'website', sortable: false },
  { title: 'Order', key: 'displayOrder', width: '80px' },
  { title: 'Published', key: 'isPublished', width: '100px' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
]

const rules = {
  required: (v: string) => !!v || 'Required',
  url: (v: string) => !v || /^https?:\/\//.test(v) || 'Must be a valid URL',
}

function createEmptyForm(): Partial<Sponsor> {
  return {
    name: '',
    description: '',
    category: '',
    address: '',
    website: '',
    logoUrl: '',
    color: '#1565C0',
    displayOrder: 0,
    isPublished: true,
  }
}

function openDelete(sponsor: Sponsor) {
  selectedSponsor.value = sponsor
  deleteDialog.value = true
}

function closeDeleteDialog() {
  deleteDialog.value = false
  selectedSponsor.value = null
}

async function confirmDelete() {
  if (!selectedSponsor.value) return
  deleting.value = true
  try {
    await store.deleteSponsor(selectedSponsor.value.id)
    closeDeleteDialog()
    // ✅ Refetch from DB after delete
    await store.fetchSponsors()
  } finally {
    deleting.value = false
  }
}

async function togglePublished(item: Sponsor) {
  await store.updateSponsor(item.id, {
    isPublished: item.isPublished,
  })
}

const dialog = ref(false)
const editingSponsor = ref<Sponsor | null>(null)

function openCreate() {
  editingSponsor.value = null
  dialog.value = true
}

function openEdit(sponsor: Sponsor) {
  editingSponsor.value = sponsor
  dialog.value = true
}
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-black">Sponsors</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage sponsor cards displayed on the public page.
        </p>
      </div>

      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openCreate"
      >
        Add Sponsor
      </v-btn>
    </div>

    <v-card flat rounded="lg" border>
      <v-card-text class="pb-0">
        <v-text-field
          v-model="search"
          placeholder="Search sponsors..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          rounded="lg"
          hide-details
          clearable
          style="max-width: 320px"
        />
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="sponsors"
        :search="search"
        :loading="isLoading"
        item-value="id"
        hover
        class="mt-2"
      >
        <template #item.logoUrl="{ item }">
          <v-avatar rounded="sm" size="36" color="grey-lighten-3">
            <v-img :src="item.logoUrl || ''" cover />
          </v-avatar>
        </template>

        <template #item.name="{ item }">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-circle" size="10" :color="item.color || 'transparent'" />
            <span class="font-weight-medium">{{ item.name }}</span>
          </div>
        </template>

        <template #item.category="{ item }">
          <v-chip size="small" variant="tonal" rounded="lg">
            {{ item.category }}
          </v-chip>
        </template>

        <template #item.website="{ item }">
          <a
            v-if="item.website"
            :href="item.website"
            target="_blank"
            class="text-caption text-primary text-decoration-none"
          >
            {{ item.website.replace(/^https?:\/\//, '') }}
            <v-icon icon="mdi-open-in-new" size="10" class="ml-1" />
          </a>
          <span v-else class="text-disabled text-caption">—</span>
        </template>

        <template #item.isPublished="{ item }">
          <v-switch
            v-model="item.isPublished"
            density="compact"
            hide-details
            color="success"
            inset
            @change="togglePublished(item)"
          />
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end gap-1">
            <v-btn
              icon="mdi-pencil-outline"
              size="small"
              variant="text"
              @click="openEdit(item)"
            />
            <v-btn
              icon="mdi-trash-can-outline"
              size="small"
              variant="text"
              color="error"
              @click="openDelete(item)"
            />
          </div>
        </template>

        <template #no-data>
          <div class="py-10 text-center text-medium-emphasis">
            <v-icon icon="mdi-handshake-outline" size="48" class="mb-3 opacity-30" />
            <p>No sponsors yet. Add your first one.</p>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- ✅ Refetch from DB after save -->
    <SponsorFormDialog
      v-model="dialog"
      :edited-sponsor="editingSponsor"
      @saved="store.fetchSponsors()"
    />

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card rounded="xl">
        <v-card-text class="pt-6 pb-2 px-6">
          <div class="d-flex align-center gap-3 mb-3">
            <v-icon icon="mdi-alert-circle-outline" color="error" size="28" />
            <span class="text-h6 font-weight-bold">Delete Sponsor</span>
          </div>

          <p class="text-body-2 text-medium-emphasis">
            Are you sure you want to delete
            <strong>{{ selectedSponsor?.name }}</strong>?
            This action cannot be undone.
          </p>
        </v-card-text>

        <v-card-actions class="px-6 pb-5">
          <v-spacer />
          <v-btn variant="text" rounded="lg" @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            :loading="deleting"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>