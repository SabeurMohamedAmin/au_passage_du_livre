import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

/* ============================================================================
   TYPES (copied, not reinvented)
============================================================================ */
export interface Guest {
  id: number
  name: string
  slug: string
  role: 'Auteur' | 'Artiste' | 'Conférencier' | 'Historien' | 'Artisan'
  specialty: string
  excerpt: string
  bio: string
  image: string
  featured: boolean
  socialLinks?: {
    website?: string
    twitter?: string
    instagram?: string
  }
}

export interface FilterCategory {
  label: string
  value: 'all' | 'author' | 'artist' | 'speaker' | 'artisan'
}

/* ============================================================================
   COMPOSABLE
============================================================================ */
export function useGuests(guestsSeed: Guest[]) {
  /* --------------------------------------------------------------------------
   STATE
  -------------------------------------------------------------------------- */
  const guests = ref<Guest[]>(guestsSeed)
  const selectedFilter = ref<FilterCategory['value']>('all')
  const searchQuery = ref('')

  /* --------------------------------------------------------------------------
   DISPLAY (kept exactly as-is)
  -------------------------------------------------------------------------- */
  const { xs, sm } = useDisplay()

  /* --------------------------------------------------------------------------
   COMPUTED
  -------------------------------------------------------------------------- */
  const featuredGuests = computed(() =>
    guests.value.filter(g => g.featured)
  )

  const filteredGuests = computed(() => {
    let result = guests.value

    // category filter
    if (selectedFilter.value !== 'all') {
      const roleMap: Record<
        Exclude<FilterCategory['value'], 'all'>,
        Guest['role']
      > = {
        author: 'Auteur',
        artist: 'Artiste',
        speaker: 'Conférencier',
        artisan: 'Artisan'
      }

      const mappedRole = roleMap[selectedFilter.value]
      result = result.filter(g => g.role === mappedRole)
    }

    // search filter
    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      result = result.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.specialty.toLowerCase().includes(q) ||
        g.bio.toLowerCase().includes(q)
      )
    }

    return result
  })

  const statsCols = computed(() => {
    if (xs.value) return { cols: 12, sm: 4, md: 2 }
    return { cols: 4, sm: 4, md: 2 }
  })

  const slideCardWidth = computed(() => {
    if (xs.value) return 240
    if (sm.value) return 260
    return 280
  })

  /* --------------------------------------------------------------------------
   HELPERS
  -------------------------------------------------------------------------- */
  const getRoleColor = (role: Guest['role']): string => {
    const colorMap: Record<Guest['role'], string> = {
      Auteur: 'primary',
      Artiste: 'secondary',
      Conférencier: 'success',
      Historien: 'info',
      Artisan: 'warning'
    }
    return colorMap[role] || 'default'
  }

  const resetFilters = () => {
    selectedFilter.value = 'all'
    searchQuery.value = ''
  }

  /* --------------------------------------------------------------------------
   API (what the page consumes)
  -------------------------------------------------------------------------- */
  return {
    // state
    guests,
    selectedFilter,
    searchQuery,

    // computed
    filteredGuests,
    featuredGuests,
    statsCols,
    slideCardWidth,

    // helpers
    getRoleColor,
    resetFilters
  }
}