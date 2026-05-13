// stores/events.ts
//
// Pinia store for event management.
// Handles both admin CRUD and public-facing data fetching.

import { defineStore } from 'pinia'
import type {
  Event            as EventBase,
  EventTranslation,
  EventSession,
  EventSessionTranslation,
  EventDocument,
  EventIntervenant,
} from '~~/server/db/schema/events'
import type { Intervenant } from '~~/server/db/schema/intervenants'

// ── API response type (event with all nested relations) ───────────────────────

export interface EventWithRelations extends EventBase {
  translations: EventTranslation[]
  documents:    EventDocument[]
  intervenants: (EventIntervenant & { intervenant: Intervenant })[]
  sessions:     (EventSession & {
    translations: EventSessionTranslation[]
    intervenants: { sessionId: number; intervenantId: number; intervenant: Intervenant }[]
  })[]
}

// ── Payload sent to POST / PATCH ──────────────────────────────────────────────

export interface EventPayload {
  // Core event fields
  isNextEvent:  boolean
  coverImage:   string
  startDate:    string
  endDate:      string
  time:         string
  locationName: string
  address:      string
  entranceType: string
  website:      string

  // Translations (one per locale)
  translations: {
    locale:       string
    title:        string
    subtitle:     string
    slug:         string
    shortSummary: string
    about:        string
    highlights:   string
  }[]

  // Event-level intervenants
  intervenantIds: number[]

  // Sessions (each with nested translations + intervenants)
  sessions: {
    date:           string
    time:           string
    location:       string
    translations: {
      locale:       string
      title:        string
      description:  string
    }[]
    intervenantIds: number[]
  }[]

  // Documents
  documents: {
    label: string
    url:   string
  }[]
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useEventsStore = defineStore('events', () => {

  // State
  const items   = ref<EventWithRelations[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // Getters
  const nextEvent = computed(() =>
    items.value.find(e => e.isNextEvent) ?? null,
  )

  /**
   * Returns the French title for an event.
   * Falls back to the first available translation or empty string.
   */
  function frenchTitle(event: EventWithRelations): string {
    return (
      event.translations.find(t => t.locale === 'fr')?.title
      ?? event.translations[0]?.title
      ?? ''
    )
  }

  /**
   * Filters events by search query against the French title.
   */
  function filterBySearch(query: string): EventWithRelations[] {
    const normalized = query.toLowerCase().trim()
    if (!normalized) return items.value

    return items.value.filter(event =>
      frenchTitle(event).toLowerCase().includes(normalized),
    )
  }

  // ── Public (front-end pages) ──────────────────────────────────────────────

  async function fetchPublic() {
    loading.value = true
    error.value   = null
    try {
      items.value = await $fetch<EventWithRelations[]>('/api/events')
    } catch (err: any) {
      error.value = err?.data?.message ?? err.message
    } finally {
      loading.value = false
    }
  }

  // ── Admin CRUD ────────────────────────────────────────────────────────────

  async function fetchAll() {
    loading.value = true
    error.value   = null
    try {
      items.value = await $fetch<EventWithRelations[]>('/api/admin/events')
    } catch (err: any) {
      error.value = err?.data?.message ?? err.message
    } finally {
      loading.value = false
    }
  }

  async function create(payload: EventPayload): Promise<EventWithRelations> {
    const created = await $fetch<EventWithRelations>('/api/admin/events', {
      method: 'POST',
      body:   payload,
    })

    // If the new event is "next", unmark all others locally
    if (created.isNextEvent) {
      items.value.forEach(e => { e.isNextEvent = false })
    }

    items.value.unshift(created)
    return created
  }

  async function update(id: number, payload: EventPayload): Promise<EventWithRelations> {
    const updated = await $fetch<EventWithRelations>(`/api/admin/events/${id}`, {
      method: 'PATCH',
      body:   payload,
    })

    if (updated.isNextEvent) {
      items.value.forEach(e => { e.isNextEvent = false })
    }

    const index = items.value.findIndex(e => e.id === id)
    if (index !== -1) items.value[index] = updated

    return updated
  }

  async function remove(id: number): Promise<void> {
    await $fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    items.value = items.value.filter(e => e.id !== id)
  }

  // ── Expose ────────────────────────────────────────────────────────────────

  return {
    // State
    items,
    loading,
    error,

    // Getters
    nextEvent,
    frenchTitle,
    filterBySearch,

    // Actions
    fetchPublic,
    fetchAll,
    create,
    update,
    remove,
  }
})