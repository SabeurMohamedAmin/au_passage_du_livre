<script setup lang="ts">
  interface Guest {
    id: number
    name: string
    slug: string
    role: 'Auteur' | 'Artiste' | 'Conférencier' | 'Historien' | 'Artisan'
    specialty: string
    bio: string
    image: string
    socialLinks?: {
      website?: string
      twitter?: string
      instagram?: string
    }
  }

  const props = defineProps<{
    guest: Guest
  }>()

  const getRoleColor = (role: Guest['role']): string => {
    const map: Record<Guest['role'], string> = {
      Auteur: 'primary',
      Artiste: 'secondary',
      Conférencier: 'success',
      Historien: 'info',
      Artisan: 'warning'
    }
    return map[role]
  }
</script>

<template>
  <v-card 
    class="rounded-xl h-100 featured-card hover-lift"
    elevation="1"
  >
    <!-- IMAGE / HEADER -->
    <v-img
      :src="guest.image"
      height="220"
      cover
      gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%"
    >
      <div class="fill-height d-flex flex-column">
        <!-- Role -->
        <v-chip
          :color="getRoleColor(guest.role)"
          class="ma-2 align-self-start rounded-xl"
          label
        >
          {{ guest.role }}
        </v-chip>

        <!-- Name & Specialty -->
        <div class="mt-auto pa-3 text-white">
          <h4 class="text-subtitle-1 font-weight-bold mb-0">
            {{ guest.name }}
          </h4>
          <p class="text-subtitle-2 text-primary">
            {{ guest.specialty }}
          </p>
        </div>
      </div>
    </v-img>

    <!-- CONTENT -->
    <v-card-text class="pa-4 py-2">
      <p class="text-body-2 text-medium-emphasis bio-3-lines mb-3">
        {{ guest.bio }}
      </p>

      <div v-if="guest.socialLinks" class="d-flex ga-2">
        <v-btn
          v-if="guest.socialLinks.website"
          icon="mdi-web"
          size="small"
          rounded="lg"
          variant="tonal"
          color="primary"
        />
        <v-btn
          v-if="guest.socialLinks.twitter"
          icon="mdi-twitter"
          size="small"
          rounded="lg"
          variant="tonal"
          color="info"
        />
        <v-btn
          v-if="guest.socialLinks.instagram"
          icon="mdi-instagram"
          size="small"
          rounded="lg"
          variant="tonal"
          color="pink"
        />
      </div>
    </v-card-text>

    <!-- ACTION -->
    <v-card-actions class="pa-4 pt-0">
      <v-btn
        block
        size="small"
        color="primary"
        variant="outlined"
        rounded="lg"
        :to="`/guests/${guest.slug}`"
      >
        En savoir plus
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .bio-3-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    min-height: calc(1.5em * 3);
  }

  .hover-lift {
    transition: 
      transform 0.3s ease,
      box-shadow 0.3s ease,
      outline 0.3s ease-in-out;
  }

  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
  }

  .featured-card {
    outline: 1px solid transparent;
  }
  
  .featured-card:hover {
    outline: 2px solid;
    outline-color: rgb(var(--v-theme-primary));
  }
</style>