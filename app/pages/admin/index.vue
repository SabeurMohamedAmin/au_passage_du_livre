<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { useEventsStore } from '~/stores/events'
import { useIntervenantsStore } from '~/stores/intervenants'
import { useBlogsStore } from '~/stores/blogs'
import { useSponsorsStore } from '~/stores/sponsors'

definePageMeta({
  layout: 'admin'
})
const eventsStore = useEventsStore()
const intervenantsStore = useIntervenantsStore()
const blogsStore = useBlogsStore()
const sponsorsStore = useSponsorsStore()

onMounted(async () => {
  // Fetch data in parallel for admin stats if not loaded yet
  const promises = []
  if (eventsStore.items.length === 0) promises.push(eventsStore.fetchAll())
  if (intervenantsStore.items.length === 0) promises.push(intervenantsStore.fetchAll())
  if (blogsStore.items.length === 0) promises.push(blogsStore.fetchAll())
  if (sponsorsStore.sponsors.length === 0) promises.push(sponsorsStore.fetchSponsors())
  
  await Promise.allSettled(promises)
})

const dashboardItems = computed(() => [
  {
    title: 'Home Settings',
    description: 'Manage home page content and hero images.',
    icon: 'mdi-home-edit',
    color: 'warning',
    route: '/admin/home',
    count: null,
    loading: false
  },  
  {
    title: 'Events',
    description: 'Manage association events and sessions.',
    icon: 'mdi-calendar-star',
    color: 'primary',
    route: '/admin/events',
    count: eventsStore.items.length,
    loading: eventsStore.loading
  },
  {
    title: 'Intervenants',
    description: 'Manage speakers, authors, and artists.',
    icon: 'mdi-account-group',
    color: 'secondary',
    route: '/admin/intervenants',
    count: intervenantsStore.items.length,
    loading: intervenantsStore.loading
  },
  {
    title: 'Blogs',
    description: 'Manage blog articles and news updates.',
    icon: 'mdi-post',
    color: 'info',
    route: '/admin/blog',
    count: blogsStore.items.length,
    loading: blogsStore.loading
  },
  {
    title: 'Sponsors',
    description: 'Manage sponsors and partners.',
    icon: 'mdi-handshake',
    color: 'success',
    route: '/admin/sponsors',
    count: sponsorsStore.sponsors.length,
    loading: sponsorsStore.isLoading
  },

])
</script>

<template>
  <v-container fluid class="pa-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-h4 font-weight-black mb-2">Admin Dashboard</h1>
      <p class="text-body-1 text-medium-emphasis">Overview of all manageable content.</p>
    </div>

    <!-- Grid -->
    <v-row>
      <v-col v-for="item in dashboardItems" :key="item.route" cols="12" sm="6" lg="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 8 : 2"
            class="h-100 rounded-xl transition-swing d-flex flex-column border"
            :to="item.route"
          >
            <v-card-item class="pa-6 pb-2">
              <div class="d-flex justify-space-between align-start mb-4">
                <v-avatar :color="`${item.color}-lighten-4`" size="56" rounded="lg">
                  <v-icon :icon="item.icon" :color="item.color" size="32" />
                </v-avatar>

                <template v-if="item.count !== null">
                  <v-progress-circular v-if="item.loading" indeterminate color="primary" size="24" />
                  <v-chip v-else :color="item.color" variant="flat" size="large" class="font-weight-bold">
                    {{ item.count }}
                  </v-chip>
                </template>
              </div>

              <v-card-title class="text-h5 font-weight-bold mb-1">
                {{ item.title }}
              </v-card-title>
              
              <v-card-subtitle class="text-body-2 text-wrap opacity-80" style="line-height: 1.5;">
                {{ item.description }}
              </v-card-subtitle>
            </v-card-item>

            <v-spacer />

            <v-card-actions class="px-6 pb-6 pt-4">
              <v-btn
                variant="tonal"
                :color="item.color"
                append-icon="mdi-arrow-right"
                rounded="lg"
                class="font-weight-bold px-4"
              >
                Manage
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
