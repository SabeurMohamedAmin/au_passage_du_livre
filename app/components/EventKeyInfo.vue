<script setup lang="ts">
/* =====================================
   INTERFACES
   Defines the shape of the data prop.
  ===================================== */

interface InfoItem {
  title: string
  desc: string
  sub: string
}

// The prop expects an object with keys 'when', 'where', 'what'
interface KeyInfoData {
  when: InfoItem
  where: InfoItem
  what: InfoItem
}

const props = defineProps<{
  data: KeyInfoData
}>()

/* ==========================================================================
   HELPER LOGIC
   Maps the specific key (when/where/what) to specific icons and colors.
   ========================================================================== */
const items = computed(() => [
  {
    key: 'when',
    ...props.data.when,
    icon: 'mdi-calendar-clock',
    color: 'primary'
  },
  {
    key: 'where',
    ...props.data.where,
    icon: 'mdi-map-marker-radius',
    color: 'secondary'
  },
  {
    key: 'what',
    ...props.data.what,
    icon: 'mdi-book-open-page-variant',
    color: 'success'
  }
])
</script>

<template>
  <v-row class="mb-10 mt-2">
    <v-col 
      cols="12" 
      md="4" 
      v-for="item in items" 
      :key="item.key"
    >
      <v-sheet class="rounded-xl pa-6 bg-surface-light border-thin h-100 d-flex flex-column align-center text-center">
        
        <!-- Icon Badge -->
        <v-avatar 
          :color="item.color" 
          variant="tonal" 
          size="60" 
          class="mb-4 rounded-lg"
        >
          <v-icon size="30">{{ item.icon }}</v-icon>
        </v-avatar>

        <!-- Content -->
        <h3 class="text-h6 font-weight-bold">
          {{ item.title }}
        </h3>
        
        <p class="text-body-2 text-medium-emphasis mt-1">
          {{ item.desc }}<br>
          {{ item.sub }}
        </p>

      </v-sheet>
    </v-col>
  </v-row>
</template>
