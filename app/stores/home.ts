import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * One of the four image positions in the hero section grid.
 *
 *   [ top_left  ]  [ top_right  ]
 *   [ bot_left  ]  [ bot_right  ]
 */
export type HeroImageSlot =
  | 'hero_top_left'
  | 'hero_bottom_left'
  | 'hero_top_right'
  | 'hero_bottom_right'

/** A single hero image stored in the DB. */
export interface HomeImage {
  id:     string
  pageId: string
  slot:   HeroImageSlot
  url:    string | null   // null = no image set yet
  alt:    string
}

/**
 * All editable text for one locale on the home page.
 * Fields are grouped by section (Hero → Missions → Speakers → Articles → Events).
 */
export interface HomePageTranslation {
  id:     string
  pageId: string
  locale: string

  // Hero section
  heroTitle1:      string
  heroTitle2:      string
  heroTitle3:      string   // displayed in accent color
  heroDescription: string
  heroCta1Label:   string
  heroCta1Link:    string
  heroCta2Label:   string
  heroCta2Link:    string

  // Missions section
  missionsTitle:        string
  missionsDescription:  string
  missionsSeeAllLabel:  string
  missionsSeeAllLink:   string

  // Speakers section
  speakersTitle:        string
  speakersDescription:  string
  speakersSeeAllLabel:  string
  speakersSeeAllLink:   string

  // Articles & News section
  articlesTitle:        string
  articlesDescription:  string
  articlesSeeAllLabel:  string
  articlesSeeAllLink:   string

  // Events / Program section
  eventsTitle:         string
  eventsDescription:   string
  eventsDownloadLabel: string
  eventsDownloadLink:  string
}

/** The singleton home page record, with all its translations and images. */
export interface HomePage {
  id:           string
  createdAt:    Date
  updatedAt:    Date
  translations: HomePageTranslation[]
  images:       HomeImage[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────

export const useHomeStore = defineStore('home', () => {

  // ── State ──────────────────────────────────────────────────────────────────

  /** The full home page record. Null until first fetch. */
  const page      = ref<HomePage | null>(null)
  const isLoading = ref(false)
  const error     = ref<string | null>(null)

  // ── Getters ────────────────────────────────────────────────────────────────

  /**
   * Returns the translation for the requested locale.
   * Falls back to French, then to whatever is first in the array.
   *
   * Usage: homeStore.getTranslation('en')
   */
  const getTranslation = computed(() =>
    (locale: string): HomePageTranslation | undefined =>
      page.value?.translations?.find((t) => t.locale === locale)
      ?? page.value?.translations?.find((t) => t.locale === 'fr')
      ?? page.value?.translations?.[0]
  )

  /**
   * Returns the image data for a given hero grid slot, or undefined if not set.
   *
   * Usage: homeStore.getImage('hero_top_left')
   */
  const getImage = computed(() =>
    (slot: HeroImageSlot): HomeImage | undefined =>
      page.value?.images?.find((img) => img.slot === slot)
  )

  // ── Internal helpers ───────────────────────────────────────────────────────

  /** Wraps $fetch with loading/error state management. */
  async function apiFetch<T>(
    endpoint: string,
    options: Parameters<typeof $fetch>[1] = {}
  ): Promise<T | null> {
    isLoading.value = true
    error.value     = null
    try {
      return await $fetch<T>(endpoint, options)
    }
    catch (e: any) {
      error.value = e?.data?.message ?? e?.message ?? 'An unexpected error occurred.'
      console.error(`[HomeStore] ${options.method ?? 'GET'} ${endpoint}`, e)
      return null
    }
    finally {
      isLoading.value = false
    }
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Loads the home page from the API (all locales, all images).
   * Called once on page mount; also called after locale switch.
   */
  async function fetchHomePage(): Promise<boolean> {
    const res = await apiFetch<{ success: boolean; data: HomePage | null }>(
      '/api/admin/home'
    )
    if (res?.success && res.data) {
      page.value = res.data
      return true
    }
    return false
  }

  /**
   * Saves text content for a specific locale.
   * Sends only the changed fields — the API merges with existing data.
   *
   * @param locale  e.g. 'fr', 'en', 'ar'
   * @param data    Any subset of HomePageTranslation fields
   */
  async function updateHomePage(
    locale: string,
    data: Partial<HomePageTranslation>
  ): Promise<boolean> {
    const res = await apiFetch<{ ok: boolean; data: HomePage }>(
      '/api/admin/home',
      { 
        method: 'PATCH', 
        // ✅ Fix: Spread data first, so the passed `locale` overrides any fallback locale
        body: { ...data, locale } 
      }
    )
    if (res?.ok && res.data) {
      page.value = res.data
      return true
    }
    return false
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  return {
    // State
    page,
    isLoading,
    error,

    // Getters
    getTranslation,   // (locale: string) => HomePageTranslation | undefined
    getImage,         // (slot: HeroImageSlot) => HomeImage | undefined

    // Actions
    fetchHomePage,    // () => Promise<boolean>
    updateHomePage,   // (locale, data) => Promise<boolean>
  }
})