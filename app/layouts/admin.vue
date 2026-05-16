<script setup lang="ts">
  import { useTheme, useDisplay } from 'vuetify'

  const theme = useTheme()
  const { mdAndUp } = useDisplay()
  const localePath = useLocalePath()

  const drawer = ref(mdAndUp.value)

  const adminMenu = [
    { title: 'Dashboard', route: '/admin', icon: 'mdi-view-dashboard' },
    { title: 'Home Settings', route: '/admin/home', icon: 'mdi-home-edit' },
    { title: 'Events', route: '/admin/events', icon: 'mdi-calendar-star' },
    { title: 'Intervenants', route: '/admin/intervenants', icon: 'mdi-account-group' },
    { title: 'Blog', route: '/admin/blog', icon: 'mdi-post' },
    { title: 'Sponsors', route: '/admin/sponsors', icon: 'mdi-handshake' },
  ]
</script>

<template>
    <!-- TOP NAVBAR -->
    <v-app-bar app elevation="1" class="admin-app-bar">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="font-weight-bold">
        Admin Panel
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-2 pe-4">
        <BaseThemeToggle />
        <v-btn
          prepend-icon="mdi-logout"
          variant="text"
          :to="localePath('/')"
        >
          Exit Admin
        </v-btn>
      </div>
    </v-app-bar>

    <!-- SIDEBAR -->
    <v-navigation-drawer
      v-model="drawer"
      app
      class="admin-drawer"
    >
      <div class="pa-4">
        <h2 class="text-h6 font-weight-black text-primary">Administration</h2>
        <p class="text-caption text-medium-emphasis">Au Passage du Livre</p>
      </div>
      
      <v-divider class="mb-2" />

      <v-list density="comfortable" class="px-2">
        <v-list-item
          v-for="item in adminMenu"
          :key="item.route"
          :to="localePath(item.route)"
          :prepend-icon="item.icon"
          rounded="lg"
          class="mb-1"
          active-class="bg-primary text-white font-weight-bold"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- PAGE CONTENT -->
    <slot />
</template>

<style scoped>
.admin-drawer {
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}
.v-theme--dark .bg-grey-lighten-4 {
  background-color: #121212 !important;
}
</style>
