<script setup lang="ts">
const props = defineProps<{ guest: Guest }>();

const roleColors: Record<GuestRole, string> = {
  Auteur: 'purple',
  Artiste: 'green',
  Historien: 'blue',
  Artisan: 'orange',
  Conférencier: 'blue',
}

const getRoleColor = (role: GuestRole) => roleColors[role]
</script>

<template>
  <v-card
    class="rounded-xl overflow-hidden featured-card h-100"
    elevation="2"
  >
    <v-img
      :src="guest.image"
      height="300"
      cover
      gradient="to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%"
    >
      <div class="fill-height d-flex flex-column">
        
        <v-chip
          :color="getRoleColor(guest.role)"
          size="small"
          class="ma-3 align-self-start font-weight-bold"
          label
        >
          {{ guest.role }}
        </v-chip>

        <div class="mt-auto pa-4 text-white">
          <h3 class="text-h6 font-weight-bold mb-1">
            {{ guest.name }}
          </h3>
          
          <p class="text-subtitle-2 text-primary-lighten-2 mb-2">
            {{ guest.role }}
          </p>

          <p class="text-caption opacity-90 line-clamp-2">
            {{ guest.excerpt || guest.bio }}
          </p>
        </div>
      </div>
    </v-img>

    <v-card-actions class="pa-4">
      <nuxt-link 
        :to="$localePath({name: 'guest-profile', params: {slug: guest.slug}})"
        class="text-decoration-none w-100"
      >
        <v-btn
          variant="tonal"
          color="primary"
          rounded="lg"
          block
        >
          Voir le profil
        </v-btn>
      </nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>