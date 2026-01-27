<script setup lang="ts">
  defineProps<{ guest: Guest }>();
</script>

<template>
  <v-card class="rounded-lg pa-2" elevation="4">
    <v-list>
      <v-list-item class="align-items-start">
        <template v-slot:prepend>
          <v-avatar size="64" class="rounded-lg elevation-2 border-2 border-surface">
            <v-img :src="guest.image" cover />
          </v-avatar>
        </template>

        <v-list-item-title  class="text-h6 font-weight-bold">
          {{ guest.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption mb-2">
          Special Guest
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- Header with Background Image (optional visual flair)-->
    <v-card-title class="text-white text-subtitle-2 font-weight-bold">
      {{ guest.role }}
    </v-card-title>
    <v-divider/>

    <v-card-text class="py-3">
      <div class="d-flex justify-space-between align-center">
        <span class="text-caption text-medium-emphasis">Socials</span>
        <div class="d-flex gap-2">
          <v-btn
            v-if="guest.facebook"
            :href="guest.facebook"
            target="_blank"
            icon="mdi-facebook"
            variant="text"
            density="comfortable"
            size="small"
            color="blue-darken-1"
          />
          <v-btn
            v-if="guest.x"
            :href="guest.x"
            target="_blank"
            icon="mdi-twitter"
            variant="text"
            density="comfortable"
            size="small"
            color="black"
          />
          <v-btn
            v-if="guest.website"
            :href="guest.website"
            target="_blank"
            icon="mdi-web"
            variant="text"
            density="comfortable"
            size="small"
            color="primary"
          />
        </div>
      </div>
    </v-card-text>
    
    <v-card-actions>
      <nuxt-link
        :to="$localePath({name: 'guest-profile', params: { slug: guest.slug }})"
        class="w-100 text-decoration-none"
      >
        <v-btn 
          block 
          variant="tonal" 
          color="primary" 
        >
          View Full Profile
        </v-btn>
      </nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.border-surface {
  border-color: rgb(var(--v-theme-surface)) !important;
}
</style>
