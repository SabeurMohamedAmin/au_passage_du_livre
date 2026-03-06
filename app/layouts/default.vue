<script setup lang="ts">
  import { useTheme, useDisplay } from 'vuetify'

  const theme = useTheme()
  const { mdAndUp, lgAndUp } = useDisplay()

  const localePath = useLocalePath()
  const route = useRoute()

  const isMobileOpen = shallowRef(false)
  const isScrolled = shallowRef(false)

  /**
   * Scroll detection
   */
  useEventListener(window, 'scroll', () => {
    isScrolled.value = window.scrollY > 10
  })

  type MenuItem = {
    title: string
    route: string
  }

  const baseMenu: MenuItem[] = [
    { title: 'home', route: '/' },
    { title: 'events', route: '/evenements' },
    { title: 'intervenants', route: '/artistes-et-intervenants' },
    { title: 'press', route: '/presse' },
    { title: 'blog', route: '/blog' },
    { title: 'sponsors', route: '/sponsors' },
    { title: 'contact us', route: '/contactez-nous' },
    { title: 'about us', route: '/about-us' },
  ]

  /**
   * Active route detection
   */
  const isActive = (path: string) => {
    const resolved = localePath(path)

    if (path === '/') {
      return route.path === resolved
    }

    return route.path.startsWith(resolved)
  }

  /**
   * Logo source depending on theme
   */
  const logoSrc = computed(() =>
    `/img/logos/main/logo_aupassagedulivre${
      theme.global.current.value.dark ? '-dark' : ''
    }.svg`
  )

  /**
   * Navbar button classes depending on screen size
   */
  const classesNavBar = computed(() =>
    lgAndUp.value
      ? 'pa-2 px-3 text-body-1'
      : 'pa-1 px-2 text-caption'
  )

  /**
   * Double click logo behavior
   */
  const handleDoubleClick = async () => {
    await navigateTo(localePath('/'))

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
</script>

<template>
  <!-- TOP NAVBAR -->
  <v-app-bar
    app
    height="60"
    elevation="0"
    :class="['topnav-bar', { 'topnav-bar--scrolled': isScrolled }]"
  >
    <v-container class="topnav-container">
      <v-row align="center" no-gutters>

        <!-- MOBILE MENU BUTTON -->
        <v-col cols="5" class="d-flex d-md-none">
          <v-btn
            icon
            variant="text"
            class="rounded-lg"
            aria-label="Open menu"
            @click="isMobileOpen = !isMobileOpen"
          >
            <v-icon icon="mdi-menu" size="x-large" />
          </v-btn>
        </v-col>

        <!-- LOGO -->
        <v-col cols="2" md="1" class="d-flex justify-center justify-md-start">
          <NuxtLink
            :to="localePath('/')"
            class="topnav-logo-link"
            @click="handleDoubleClick"
          >
            <nuxt-img
              :src="logoSrc"
              alt="Au Passage du Livre – Association culturelle"
              class="topnav-logo-icon"
              height="90"
              width="90"
              contain
              eager
            />
          </NuxtLink>
        </v-col>

        <!-- DESKTOP MENU -->
        <v-col cols="9" class="d-none d-md-flex">
          <div class="d-flex flex-wrap">
            <v-btn
              v-for="item in baseMenu"
              :key="item.route"
              rounded="lg"
              density="comfortable"
              :class="classesNavBar"
              class="mx-1 flex-shrink-0 align-content-center"
              :variant="isActive(item.route) ? 'tonal' : 'text'"
              :color="isActive(item.route) ? 'primary' : undefined"
              :to="localePath(item.route)"
            >
              {{ $t(item.title) }}
            </v-btn>
          </div>
        </v-col>

        <!-- RIGHT TOOLBAR -->
        <v-col
          cols="2"
          class="ms-auto ga-2 d-flex justify-end align-center"
        >
          <LocaleSwitcher />
          <BaseThemeToggle v-if="mdAndUp" />
        </v-col>

      </v-row>
    </v-container>
  </v-app-bar>

  <!-- MOBILE DRAWER -->
  <v-navigation-drawer
    v-if="!mdAndUp"
    v-model="isMobileOpen"
    temporary
    width="300"
    :class="{ the_drawer: isScrolled && isMobileOpen }"
  >
    <v-list
      density="comfortable"
      class="d-flex flex-column mx-2 ga-2"
    >

      <BaseThemeToggle class="justify-start mb-4" />

      <v-list-item
        v-for="item in baseMenu"
        :key="item.route"
        :to="localePath(item.route)"
        :active="isActive(item.route)"
        class="rounded-lg"
        active-class="drawer-item--active"
        @click="isMobileOpen = false"
      >
        <v-list-item-title>
          {{ $t(item.title) }}
        </v-list-item-title>
      </v-list-item>

      <v-divider
        class="mt-12 mb-1"
        content-offset="2rem"
        opacity=".7"
        thickness="5"
        variant="dotted"
        gradient
      />

    </v-list>
  </v-navigation-drawer>

  <!-- PAGE CONTENT -->
  <slot class="w-100 px-0 mx-0" />

  <!-- FOOTER -->
  <v-footer class="pt-16 text-center text-md-left">
    <FooterSection />
  </v-footer>
</template>

<style scoped>
  .the_drawer {
    border-radius: 12px;
    margin-top: 4px;
    margin-left: 5px;
    max-height: calc(100dvh - 72px);

    background-color: rgba(var(--v-theme-surface), 0.72) !important;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);

    backdrop-filter: saturate(180%) blur(15px);
    -webkit-backdrop-filter: saturate(180%) blur(15px);
  }

  .topnav-bar {
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                background 0ms,
                color 0ms;
  }

  .topnav-bar--scrolled {
    margin-top: 2px !important;
    max-width: calc(100% - 10px);
    border-radius: 12px;
    overflow: hidden;

    background-color: rgba(var(--v-theme-surface), 0.72) !important;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);

    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.08);
  }

  .v-theme--dark .topnav-bar--scrolled {
    background: rgba(30, 30, 30, 0.8) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .topnav-container {
    max-width: 100%;
    border-radius: 12px;

    backdrop-filter: saturate(180%) blur(15px);
    -webkit-backdrop-filter: saturate(180%) blur(15px);

    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                background 0ms,
                color 0ms;
  }

  .topnav-logo-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .topnav-logo-icon {
    color: rgb(var(--v-theme-primary));
    transition: all 150ms ease-in-out;
  }

  .topnav-logo-icon:hover {
    filter: brightness(105%);
    transform: scale(1.04);
  }

  .topnav-logo-icon:active {
    transform: scale(1.02);
  }

  .drawer-item--active {
    font-weight: 600;
  }

  .page-container {
    padding-top: 24px;
    min-height: calc(100vh - 64px);
  }
</style>

<style>
  main.v-main.v-layout-top {
    padding-top: 0px !important;
  }
</style>