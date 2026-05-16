import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Blog {
  id?:         number
  title:       string
  slug:        string
  summary:     string
  content:     string
  image:       string | null
  author:      string
  authorImage: string | null
  date:        string
  category:    string
  createdAt?:  string
  updatedAt?:  string
}

export const useBlogsStore = defineStore('blogs', () => {
  const items    = ref<Blog[]>([])
  const loading  = ref(false)
  const saving   = ref(false)
  const deleting = ref<string | null>(null)
  const error    = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value   = null
    try {
      items.value = await $fetch<Blog[]>('/api/admin/blog')
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to load blogs'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchPublic() {
    loading.value = true
    error.value   = null
    try {
      items.value = await $fetch<Blog[]>('/api/blog')
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to load blogs'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Accepts either a plain object or a FormData (when a file is attached)
  async function create(payload: FormData | Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) {
    saving.value = true
    error.value  = null
    try {
      const created = await $fetch<Blog>('/api/admin/blog', {
        method: 'POST',
        body:   payload,
      })
      items.value.push(created)
      return created
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to create blog'
      throw e
    } finally {
      saving.value = false
    }
  }

  // Accepts either a plain object or a FormData (when a file is attached)
  async function update(slug: string, payload: FormData | Partial<Blog>) {
    saving.value = true
    error.value  = null
    try {
      const updated = await $fetch<Blog>(`/api/admin/blog/${slug}`, {
        method: 'PATCH',
        body:   payload,
      })
      const idx = items.value.findIndex(i => i.slug === slug)
      if (idx !== -1) items.value[idx] = updated
      return updated
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to update blog'
      throw e
    } finally {
      saving.value = false
    }
  }

  async function remove(slug: string) {
    deleting.value = slug
    error.value    = null
    try {
      await $fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' })
      items.value = items.value.filter(i => i.slug !== slug)
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Failed to delete blog'
      throw e
    } finally {
      deleting.value = null
    }
  }

  return { items, loading, saving, deleting, error, fetchPublic, fetchAll, create, update, remove }
})
