<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'

const theme      = useTheme()
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { session, clear } = useUserSession()

const drawer = ref(mdAndUp.value)

const adminMenu = [
  { title: 'Dashboard',      route: '/admin',              icon: 'mdi-view-dashboard-outline' },
  { title: 'Home Settings',  route: '/admin/home',         icon: 'mdi-home-edit-outline'      },
  { title: 'Events',         route: '/admin/events',       icon: 'mdi-calendar-star-outline'  },
  { title: 'Intervenants',   route: '/admin/intervenants', icon: 'mdi-account-group-outline'  },
  { title: 'Blog',           route: '/admin/blog',         icon: 'mdi-post-outline'           },
  { title: 'Sponsors',       route: '/admin/sponsors',     icon: 'mdi-handshake-outline'      },
]

// Initiale de l'admin pour l'avatar
const adminInitial = computed(() => {
  const name = session.value?.user?.displayName ?? session.value?.user?.email ?? '?'
  return name.charAt(0).toUpperCase()
})

const adminName = computed(() =>
  session.value?.user?.displayName ?? session.value?.user?.email ?? 'Administrateur'
)

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/admin/login')
}
</script>

<template>
  <!-- ═══════════════════════════════════════════
       TOP NAVBAR
  ════════════════════════════════════════════ -->
  <v-app-bar app elevation="0" border="b">
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <v-app-bar-title>
      <span class="font-weight-black text-primary">Admin</span>
      <span class="text-medium-emphasis font-weight-regular"> · Au Passage du Livre</span>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center ga-2 pe-3">
      <!-- Thème -->
      <BaseThemeToggle />

      <!-- Lien vers le site public -->
      <v-btn
        icon="mdi-open-in-new"
        variant="text"
        size="small"
        :to="localePath('/')"
        target="_blank"
        title="Voir le site"
      />

      <!-- Avatar + menu utilisateur -->
      <v-menu location="bottom end" min-width="200">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="text"
            rounded="lg"
            class="pa-1"
            aria-label="Menu utilisateur"
          >
            <v-avatar size="32" color="primary" class="me-2">
              <span class="text-body-2 font-weight-bold text-white">{{ adminInitial }}</span>
            </v-avatar>
            <span class="text-body-2 d-none d-sm-inline">{{ adminName }}</span>
            <v-icon end size="small" class="d-none d-sm-inline">mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list density="compact" rounded="lg" border>
          <!-- Infos compte -->
          <v-list-item class="py-3">
            <template #prepend>
              <v-avatar size="36" color="primary">
                <span class="text-body-2 font-weight-bold text-white">{{ adminInitial }}</span>
              </v-avatar>
            </template>
            <v-list-item-title class="font-weight-bold">{{ adminName }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              {{ session?.user?.email }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-1" />

          <v-list-item
            prepend-icon="mdi-open-in-new"
            :to="localePath('/')"
            target="_blank"
            rounded="lg"
          >
            <v-list-item-title>Voir le site</v-list-item-title>
          </v-list-item>

          <v-divider class="my-1" />

          <!-- Déconnexion -->
          <v-list-item
            prepend-icon="mdi-logout"
            base-color="error"
            rounded="lg"
            @click="logout"
          >
            <v-list-item-title>Déconnexion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- ═══════════════════════════════════════════
       SIDEBAR
  ════════════════════════════════════════════ -->
  <v-navigation-drawer v-model="drawer" app class="admin-drawer">

    <!-- Brand -->
    <div class="pa-5 pb-3">
      <div class="d-flex align-center gap-2 mb-1">
        <v-icon icon="mdi-book-open-page-variant" color="primary" size="22" />
        <span class="text-subtitle-1 font-weight-black text-primary">Au Passage du Livre</span>
      </div>
      <v-chip size="x-small" color="primary" variant="tonal" label>
        Administration
      </v-chip>
    </div>

    <v-divider class="mb-2" />

    <!-- Navigation -->
    <v-list density="comfortable" class="px-2">
      <v-list-item
        v-for="item in adminMenu"
        :key="item.route"
        :to="localePath(item.route)"
        :prepend-icon="item.icon"
        rounded="lg"
        class="mb-1"
        active-class="v-list-item--active-custom"
      >
        <v-list-item-title class="text-body-2">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Footer sidebar : déconnexion rapide -->
    <template #append>
      <v-divider />
      <div class="pa-3">
        <v-btn
          prepend-icon="mdi-logout"
          variant="tonal"
          color="error"
          rounded="lg"
          block
          size="small"
          @click="logout"
        >
          Déconnexion
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- ═══════════════════════════════════════════
       PAGE CONTENT
  ════════════════════════════════════════════ -->
  <slot />
</template>

<style scoped>
.admin-drawer {
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

/* Élément actif dans la sidebar */
:deep(.v-list-item--active-custom) {
  background-color: rgb(var(--v-theme-primary));
  color: #fff !important;
  font-weight: 700;
}

:deep(.v-list-item--active-custom .v-icon) {
  color: #fff !important;
}
</style>