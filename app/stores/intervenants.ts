import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SocialLinks {
  facebook?:  string
  instagram?: string
  twitter?:   string
  website?:   string
}

export interface Intervenant {
  id?:         number
  name:        string
  slug:        string
  role:        string
  specialty:   string
  excerpt:     string
  bio:         string
  image:       string | null
  featured:    boolean
  socialLinks: SocialLinks
  createdAt?:  string
  updatedAt?:  string
}

export const useIntervenantsStore = defineStore('intervenants', () => {
  const items    = ref<Intervenant[]>([])
  const loading  = ref(false)
  const saving   = ref(false)
  const deleting = ref<string | null>(null)
  const error    = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value   = null
    try {
      items.value = await $fetch<Intervenant[]>('/api/admin/intervenants')
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to load intervenants'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Accepts either a plain object or a FormData (when a file is attached)
  async function create(payload: FormData | Omit<Intervenant, 'id' | 'createdAt' | 'updatedAt'>) {
    saving.value = true
    error.value  = null
    try {
      const created = await $fetch<Intervenant>('/api/admin/intervenants', {
        method: 'POST',
        body:   payload,
      })
      items.value.push(created)
      return created
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to create intervenant'
      throw e
    } finally {
      saving.value = false
    }
  }

  // Accepts either a plain object or a FormData (when a file is attached)
  async function update(slug: string, payload: FormData | Partial<Intervenant>) {
    saving.value = true
    error.value  = null
    try {
      const updated = await $fetch<Intervenant>(`/api/admin/intervenants/${slug}`, {
        method: 'PATCH',
        body:   payload,
      })
      const idx = items.value.findIndex(i => i.slug === slug)
      if (idx !== -1) items.value[idx] = updated
      return updated
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to update intervenant'
      throw e
    } finally {
      saving.value = false
    }
  }

  async function remove(slug: string) {
    deleting.value = slug
    error.value    = null
    try {
      await $fetch(`/api/admin/intervenants/${slug}`, { method: 'DELETE' })
      items.value = items.value.filter(i => i.slug !== slug)
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to delete intervenant'
      throw e
    } finally {
      deleting.value = null
    }
  }

  return { items, loading, saving, deleting, error, fetchAll, create, update, remove }
})