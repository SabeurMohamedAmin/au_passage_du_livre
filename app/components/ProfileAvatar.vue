<script setup lang="ts">
/* ============================================================
   ProfileAvatar — Vuetify 3
   - Image OR initials fallback
   - Deterministic background color
   ============================================================ */

interface Avatar {
  src?: string | null
  alt: string
}

const props = defineProps<{
  avatar: Avatar
  size?: number | string
  customClass?: string
}>()

/* ---------- Utils ---------- */
function getColour(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255
    color += ('00' + value.toString(16)).slice(-2)
  }

  return color
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .join('')
}
</script>

<template>
  <v-avatar
    :size="size ?? 48"
    :class="customClass"
    :color="!avatar.src ? getColour(avatar.alt) : undefined"
  >
    <slot />

    <v-img
      v-if="avatar.src"
      :src="avatar.src"
      :alt="avatar.alt"
      cover
    />

    <span
      v-else
      class="text-white font-weight-medium"
    >
      {{ getInitials(avatar.alt) }}
    </span>
  </v-avatar>
</template>