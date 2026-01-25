<script setup lang="ts">
  import { useTheme, useDisplay } from 'vuetify'

  const theme = useTheme();
  const {mdAndUp, lgAndUp} = useDisplay();

  const localePath = useLocalePath()
  const isMobileOpen = ref(false);
  const route = useRoute();
 
  
  // Scroll detection
  const isScrolled = ref(false);
  
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  
type MenuItem = {
  title: string
  route: string
}

// TODO this will become to see our See our events (upcomming/archive)
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


  // Helper to mark active item
  // ✅ UPDATED: Deep matching logic
  const isActive = (itemRoute: string) => {
    const resolvedPath = localePath(itemRoute);
    
    // Strict match for Home to prevent it being active on every page
    if (itemRoute === '/') {
      return route.path === resolvedPath;
    }
    
    // Deep match for other routes (e.g., '/events/123' keeps '/events' active)
    return route.path.startsWith(resolvedPath);
  };

  const TOAST_TIME = 1200;

  
  function setSnack(text: string, type: typeof snackbar.type) {
    snackbar.type = type;
    snackbar.text = text;
    snackbar.show = true;
  };

  // Toast (Vuetify-native)
  const snackbar = reactive({
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
    show: false,
    title: '',
    text: '',
  });

  const logoSrc = computed(() =>
    theme.global.current.value.dark
      ? '/img/logos/main/logo_aupassagedulivre-dark.svg'
      : '/img/logos/main/logo_aupassagedulivre.svg'
  );

  const classesNavBar = computed(()=>{
    if(lgAndUp.value){
      return "pa-2 px-3 text-body-1";
    }
    else{
      return "pa-1 px-2 text-caption";
    }
  })
</script>

<template>
  <!-- Top Navigation Bar -->
  <v-app-bar 
    app
    height="60"
    elevation="0"
    :class="['topnav-bar' , {'topnav-bar--scrolled': isScrolled }]"
  >
    <v-container class="topnav-container">
      <v-row align="center" no-gutters>
        <!-- Left: Mobile hamburger -->
        <v-col class="d-flex d-md-none" cols="5">
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

        <!-- on desktop left / on Mobile Center: Logo -->
        <v-col class="d-flex justify-center" cols="1">
          <NuxtLink
            :to="localePath('/')"
            class="topnav-logo-link v-btn--variant-tonal"
          >
            <!-- Replace with your logo component or v-img -->
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
        
        <!-- Center: Desktop menu -->
        <v-col class="d-none d-md-flex" cols="9">
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
        
        <!-- Right: Toolbar area -->
        <v-col
          class="ms-auto ga-2 d-flex justify-end align-center"
          cols="2"
        >
          <LocaleSwitcher />
          <base-theme-toggle v-if="mdAndUp"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
    <v-navigation-drawer v-if="!mdAndUp" v-model="isMobileOpen" temporary width="300" :class="{'the_drawer': isScrolled && isMobileOpen}">
      <v-list density="comfortable" class="d-flex flex-column mx-2 ga-2">
        <BaseThemeToggle class="justify-start mb-4" />
        <v-list-item
          @click="isMobileOpen = false"
          v-for="item in baseMenu"
          :key="item.route"
          :active="isActive(item.route)"
          :to="localePath(item.route)"
          class="rounded-lg"
          active-class="drawer-item--active"
        >
          <v-list-item-title>
            {{ $t(item.title) }}
          </v-list-item-title>
        </v-list-item>
        <v-divider class="mt-12 mb-1" content-offset="2rem" opacity=".7" thickness="5" variant="dotted" gradient/>
      </v-list>
    </v-navigation-drawer>
    <!-- Page Content -->
    <slot />
</template>

<style scoped>
  /* Similar to Tairo's [--tairo-topnav-content-width:72rem] */
  .the_drawer {
    border-radius: 12px;
    margin-top: 4px;
    margin-left: 5px;
    border-radius: 12px;
    max-height: calc(100dvh - 72px);
    /* ✅ SAME glass material as topnav */
    background-color: rgba(var(--v-theme-surface), 0.72) !important;
    /* ✅ Same border philosophy */
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    /* ✅ SAME blur logic */
    backdrop-filter: saturate(180%) blur(15px);
    -webkit-backdrop-filter: saturate(180%) blur(15px);
  }
  .v-theme--dark .topnav-bar--scrolled {
    background: rgba(30, 30, 30, 0.8) !important;
  }
  .topnav-bar--scrolled {
    background-color: rgba(var(--v-theme-surface), 0.72) !important;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.08);
    margin-top: 2px !important;
    max-width: calc(100% - 10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }
  .topnav-container {
    max-width: 100%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0ms , color 0ms;
    border-radius: 12px;
    /* ✅ SAME blur logic */
    backdrop-filter: saturate(180%) blur(15px);
    -webkit-backdrop-filter: saturate(180%) blur(15px);
  }

  /* Center header feel with smooth transition */
  .topnav-bar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0ms , color 0ms;
    position: fixed;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  /* Dark mode support for scrolled state */
  .v-theme--dark .topnav-bar--scrolled {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* Tabs look closer to "variant=tab" (no big pill buttons) */
  .topnav-tabs {
    min-height: 42px;
  }

  /* Default tab */
  .topnav-tab {
    text-transform: none;
    font-weight: 500;
    opacity: 0.85;
  }

  /* Active tab */
  .topnav-tab--active {
    opacity: 1;
  }

  /* Logo link */
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
  .topnav-logo-icon:hover{
    filter: brightness(105%);
    transform: scale(1.04);
  }
  .topnav-logo-icon:active{
    transform: scale(1.02);
  }
  /* Drawer active item similar to underline + stronger text */
  .drawer-item--active {
    font-weight: 600;
  }

  /* Content spacing under app-bar (Vuetify handles layout, but add nice padding) */
  .page-container {
    padding-top: 24px;
    min-height: calc(100vh - 64px);
  }
  .back-transparent{
    backdrop-filter: blur(12px);
  }
</style>

<style>
  main.v-main.v-layout-top{
    padding-top: 0px !important
  };
</style>