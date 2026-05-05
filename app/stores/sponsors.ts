// stores/sponsors.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface SponsorTranslation {
  id: string
  sponsorId: string
  locale: string
  name: string
  tagline?: string | null
  description?: string | null
}

export interface Sponsor {
  id: string
  slug: string
  name: string
  tagline?: string | null        // ← add this (returned by public endpoint)
  description?: string | null
  category: string
  address?: string | null
  addressText?: string | null
  website?: string | null
  displayOrder: number
  isPublished: boolean
  logoUrl?: string | null
  color?: string | null
  locale?: string                // ← add this (returned by public endpoint)
  translations?: SponsorTranslation[]
}

export interface SponsorsPageContent {
  title: string
  subtitle: string
  footerText: string
}

interface SponsorListResponse {
  success: boolean
  data: Sponsor[]
}

interface SponsorMutationResponse {
  ok: boolean
  sponsor?: Sponsor
}

interface LogoUploadResponse {
  success: boolean
  url: string
}

export const useSponsorsStore = defineStore('sponsors', () => {

  // ── State ──────────────────────────────────────────────────────────────────

  const pageContent = ref<SponsorsPageContent>({
    title: 'Nos Sponsors',
    subtitle: 'Soutiens essentiels du festival "Au Passage du Livre"',
    footerText:
      'Nous remercions chaleureusement nos partenaires pour leur confiance et leur soutien.\nLeur engagement rend possibles nos actions culturelles et littéraires.',
  })

  const sponsors = ref<Sponsor[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ── Getters ────────────────────────────────────────────────────────────────

  const publishedSponsors = computed(() =>
    sponsors.value
      .filter((s) => s.isPublished)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  )

  const getSponsorById = computed(() => (id: string) =>
    sponsors.value.find((s) => s.id === id)
  )

  const getSponsorBySlug = computed(() => (slug: string) =>
    sponsors.value.find((s) => s.slug === slug)
  )

  // ── Private helpers ────────────────────────────────────────────────────────

  function setLoading(state: boolean) { isLoading.value = state }
  function setError(message: string | null) { error.value = message }

  function replaceSponsorInList(updated: Sponsor) {
    const index = sponsors.value.findIndex((s) => s.id === updated.id)
    if (index !== -1) sponsors.value[index] = updated
  }

  async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> {
    setLoading(true)
    setError(null)
    try {
      return await $fetch<T>(endpoint, options)
    } catch (e: any) {
      const message = e?.data?.message ?? e?.message ?? 'An unexpected error occurred.'
      console.error(`[SponsorsStore] ${options.method ?? 'GET'} ${endpoint} →`, e)
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Admin fetch — all sponsors with all translations (for CRUD operations)
   */
  async function fetchSponsors(): Promise<boolean> {
    const res = await apiFetch<SponsorListResponse>(
      '/api/admin/sponsors?include=translations'
    )
    if (res?.success) {
      sponsors.value = res.data
      return true
    }
    return false
  }

  /**
   * Public fetch — published sponsors only, translated server-side for the given locale.
   * Pass the current i18n locale so the server returns the right translation.
   */
  async function fetchPublicSponsors(locale: string = 'fr'): Promise<boolean> {
    const res = await apiFetch<SponsorListResponse>(
      `/api/sponsors?locale=${locale}`  // ← hits your public index.get.ts
    )
    if (res?.success) {
      sponsors.value = res.data
      return true
    }
    return false
  }

  async function createSponsor(data: Partial<Sponsor>): Promise<Sponsor | null> {
    const res = await apiFetch<SponsorMutationResponse>('/api/admin/sponsors', {
      method: 'POST',
      body: data,
    })
    if (res?.ok && res.sponsor) {
      sponsors.value.push(res.sponsor)
      return res.sponsor
    }
    return null
  }

  async function updateSponsor(
    id: string,
    data: Partial<Sponsor>
  ): Promise<Sponsor | null> {
    const res = await apiFetch<SponsorMutationResponse>(
      `/api/admin/sponsors/${id}`,
      { method: 'PATCH', body: data }
    )
    if (res?.ok && res.sponsor) {
      replaceSponsorInList(res.sponsor)
      return res.sponsor
    }
    return null
  }

  async function deleteSponsor(id: string): Promise<boolean> {
    const res = await apiFetch<{ ok: boolean }>(
      `/api/admin/sponsors/${id}`,
      { method: 'DELETE' }
    )
    if (res?.ok) {
      sponsors.value = sponsors.value.filter((s) => s.id !== id)
      return true
    }
    return false
  }

  async function uploadSponsorLogo(file: File): Promise<string | null> {
    const body = new FormData()
    body.append('file', file)
    const res = await apiFetch<LogoUploadResponse>(
      '/api/admin/upload/sponsor-logo',
      { method: 'POST', body }
    )
    return res?.url ?? null
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    // State
    pageContent,
    sponsors,
    isLoading,
    error,
    // Getters
    publishedSponsors,
    getSponsorById,
    getSponsorBySlug,
    // Actions
    fetchSponsors,
    fetchPublicSponsors,
    createSponsor,
    updateSponsor,
    deleteSponsor,
    uploadSponsorLogo,
  }
})