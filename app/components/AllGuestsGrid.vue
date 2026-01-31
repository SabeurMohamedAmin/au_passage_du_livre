<script setup lang="ts">
  import GuestsFilters from '@/components/guest/GuestsFilters.vue';
  import GuestsEmptyState from '@/components/guest/GuestsEmptyState.vue';
  import GuestsGrid from '@/components/guest/GuestsGrid.vue';
  import GuestCard from '@/components/guest/GuestCard.vue';
  import seed_guest from '@/composables/seed_guest.json'


  interface FilterCategory {
    label: string
    value: 'all' | 'author' | 'artist' | 'speaker' | 'artisan'
  }

  const filterCategories: FilterCategory[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Auteurs', value: 'author' },
    { label: 'Artistes', value: 'artist' },
    { label: 'Conférenciers', value: 'speaker' },
    { label: 'Artisans', value: 'artisan' }
  ]


  const guests = ref<Guest[]>(seed_guest as Guest[])
  const selectedFilter = ref<FilterCategory['value']>('all')
  const searchQuery = ref('')


  const filteredGuests = computed(() => {
    let result = guests.value

    // category filter
    if (selectedFilter.value !== 'all') {
      const roleMap: Record<Exclude<FilterCategory['value'], 'all'>, Guest['role']> = {
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
        g.specialty?.toLowerCase().includes(q) ||
        g.name.toLowerCase().includes(q) ||
        g.bio.toLowerCase().includes(q)
      )
    }
    return result
  })

  const resetFilters = () => {
    selectedFilter.value = 'all'
    searchQuery.value = ''
  }
</script>

<template>
  <v-container>
    <section>
    <!-- Card Search & Filters -->
      <GuestsFilters
        v-model:modelValueFilter="selectedFilter"
        v-model:modelValueSearch="searchQuery"
        :categories="filterCategories"
        @reset="resetFilters"
      />

      <!-- Title -->
      <div class="mb-6">
        <h2 class="text-h5 font-weight-bold mb-2">
          Tous les Invités
          <v-chip size="small" class="ms-4 rounded-lg">
            {{ filteredGuests.length }}
          </v-chip>
        </h2>
      </div>

      <!-- Empty State -->
      <GuestsEmptyState
        v-if="filteredGuests.length === 0"
        @reset="resetFilters"
      />

      <!-- Grid -->
      <GuestsGrid :guests="filteredGuests">
        <template #default="{ guest }">
          <GuestCard :guest="guest" />
        </template>
      </GuestsGrid>

    </section>
  </v-container>
</template>

<style scoped>
  /* Only keeping styles actually used in the template above */
  .background-opacity-sticky {
    position: sticky;
    margin: 0 -10px;
    z-index: 5;
    top: 70px;
  }
</style>