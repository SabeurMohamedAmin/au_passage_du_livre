<script setup lang="ts">
  interface FilterCategory {
    label: string
    value: 'all' | 'author' | 'artist' | 'speaker' | 'artisan'
  }

  const props = defineProps<{
    modelValueFilter: FilterCategory['value']
    modelValueSearch: string
    categories: FilterCategory[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValueFilter', value: FilterCategory['value']): void
    (e: 'update:modelValueSearch', value: string): void
    (e: 'reset'): void
  }>()

  const updateFilter = (value: FilterCategory['value']) => {
    emit('update:modelValueFilter', value)
  }

  const updateSearch = (value: string) => {
    emit('update:modelValueSearch', value)
  }

  const resetFilters = () => {
    emit('reset')
  }
</script>

<template>
  <v-card class="background-opacity-sticky rounded-xl border-thin mb-8">
    <v-card-text class="pa-4 pa-md-6">
      <v-row align="center" dense>
        <!-- Search -->
        <v-col cols="12" md="6">
          <v-text-field
            :model-value="modelValueSearch"
            @update:model-value="updateSearch"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('search_by_name_specialty')"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            hide-details
            clearable
            @click:clear="resetFilters"
          />
        </v-col>

        <!-- Filters -->
        <v-col cols="12" md="6">
          <div class="d-flex flex-wrap ga-2 justify-md-end">
            <v-chip
              v-for="category in categories"
              :key="category.value"
              :color="modelValueFilter === category.value ? 'primary' : 'default'"
              :variant="modelValueFilter === category.value ? 'flat' : 'outlined'"
              rounded="lg"
              class="cursor-pointer"
              @click="updateFilter(category.value)"
            >
              {{ $t(category.label) }}
            </v-chip>
            <!-- Reset -->
            <v-icon
              v-if="modelValueFilter !== 'all' || modelValueSearch"
              class="cursor-pointer pa-4 rounded-lg align-self-center mx-1"
              @click="resetFilters"
              icon="mdi-close"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>