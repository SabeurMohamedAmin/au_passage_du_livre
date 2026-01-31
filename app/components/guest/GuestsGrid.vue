<script setup lang="ts">
  defineProps<{
    guests: Guest[]
  }>();
</script>

<template>
  <v-row>
    <v-col
      v-for="guest in guests"
      :key="guest.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <slot :guest="guest" />
    </v-col>
  </v-row>
</template>