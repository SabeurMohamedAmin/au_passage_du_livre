<script setup lang="ts">
/**
 * ThemeToggle (Vuetify 3 + Nuxt SSR-friendly) — NO system mode
 *
 * - Only toggles 'light' <-> 'dark'
 * - Persists the resolved theme in a cookie: 'vuetify-theme'
 * - SSR should read ONLY this cookie to choose initial theme
 */

import { useTheme } from 'vuetify';
import { useThemeStateStore } from '~/stores/ThemeState'

const store = useThemeStateStore();
const vuetifyTheme = useTheme()

const props = withDefaults(
  defineProps<{
    id?: string
    inverted?: boolean
    disableTransitions?: boolean
  }>(),
  {
    id: undefined,
    inverted: false,
    disableTransitions: false,
  },
);

const uid = useId();
const id = computed(() => props.id ?? `theme-toggle-${uid}`);

const isDark = computed<boolean>({
  get() { return store?.isDark },
  set() { store.toggle(vuetifyTheme)},
});

  const isMounted = ref(false);
  onMounted(()=>{
    isMounted.value = true;
  })
</script>

<template>
    <v-skeleton-loader v-if="!isMounted" height="30" class="ma-2 px-2" type="chip"/>
    <div v-else class="vt-theme-toggle-wrap">
      <label
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :class="{ 'vt-theme-toggle--inverted': inverted }"
        :for="id"
        class="vt-theme-toggle"
      >
        <input
          :id="id"
          v-model="isDark"
          type="checkbox"
          class="vt-theme-toggle__input"
        >
  
        <span class="vt-theme-toggle__track">
          <v-icon class="vt-theme-toggle__icon vt-theme-toggle__icon--sun text-yellow" size="18">
            mdi-weather-sunny
          </v-icon>
          <v-icon class="vt-theme-toggle__icon vt-theme-toggle__icon--moon text-light-blue-darken-4" size="18">
            mdi-moon-waning-crescent
          </v-icon>
          <span class="vt-theme-toggle__thumb" />
        </span>
      </label>
    </div>
</template>

<style scoped>
  /* ... your global helper ... */
  :global(.vt-no-transition *) {
    transition-property: none !important;
    transition-duration: 0 !important;
  }

  .vt-theme-toggle-wrap{
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .vt-theme-toggle { 
    display:inline-flex; 
    align-items:center; cursor:pointer; user-select:none; 
  }

  .vt-theme-toggle__input {
    position:absolute; opacity:0; width:1px; height:1px; pointer-events:none;
  }

  .vt-theme-toggle__track {
    position:relative;
    display:inline-flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    width:56px;
    height:32px;
    padding:0 6px;
    border-radius:999px;
    background: rgba(var(--v-theme-on-surface), 0.08);
    border: 1px solid rgba(var(--v-theme-on-surface), 0.14);
    
    /* Ensure icons don't flip in RTL */
    direction: ltr; 
  }

  .vt-theme-toggle__icon { opacity:.7; transition: opacity .2s ease; }
  .vt-theme-toggle__icon--moon { transform: rotate(-20deg); }

  .vt-theme-toggle__thumb {
    position:absolute;
    top:50%;
    /* Use logical property for start position */
    inset-inline-start: 4px; 
    
    width:24px;
    height:24px;
    
    /* Center vertically */
    transform: translateY(-50%);
    
    border-radius:999px;
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 6px 14px rgba(0,0,0,.14);
    
    /* Animate transform instead of left/right for better performance */
    transition: transform .2s ease;
  }

  /* When Checked (Dark Mode) */
  .vt-theme-toggle__input:checked + .vt-theme-toggle__track .vt-theme-toggle__thumb {
    /* Move the thumb 24px to the right (56px width - 24px thumb - 4px padding * 2 = 24px travel distance) */
    transform: translate(24px, -50%);
  }

  /* Icon Opacity States */
  .vt-theme-toggle__input:checked + .vt-theme-toggle__track .vt-theme-toggle__icon--moon { opacity:1; }
  .vt-theme-toggle__input:not(:checked) + .vt-theme-toggle__track .vt-theme-toggle__icon--sun { opacity:1; }

  /* Inverted Mode */
  .vt-theme-toggle--inverted .vt-theme-toggle__track {
    background: rgba(var(--v-theme-surface), 0.9);
    border-color: rgba(var(--v-theme-on-surface), 0.18);
  }
</style>