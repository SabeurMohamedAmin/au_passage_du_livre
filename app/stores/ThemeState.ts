export type ThemeName = 'light' | 'dark';

export const useThemeStateStore = defineStore('ThemeStateStore', {
  // STATE
  state: ()=>{
    return {
      override : useCookie<ThemeName | null>('vuetify-theme', {
        sameSite: 'lax',
        default: () => null,
      }),
      resolved : useCookie<ThemeName>('vuetify-theme-resolved', {
        sameSite: 'lax',
        default: () => 'light',
      })

    }
  },
  // ACTIONS
  // Manual override cookie (null = no override)
  actions:{
    overrideCookie() {    
      return useCookie<ThemeName | null>('vuetify-theme', { sameSite: 'lax', default: () => null })
    },
    resolvedCookie() {
      return useCookie<ThemeName>('vuetify-theme-resolved', { sameSite: 'lax', default: () => 'light' })
    },

    // Set manual override and persist to cookie
    setOverride(name: ThemeName) {
      this.override = name
      useCookie<ThemeName | null>('vuetify-theme', { sameSite: 'lax' }).value = name;
    },
    clearOverride() {
      this.override = null
      useCookie<ThemeName | null>('vuetify-theme', { sameSite: 'lax' }).value = null;
    },
    setResolved(name: ThemeName) {
      this.resolved = name
      useCookie<ThemeName>('vuetify-theme-resolved', { sameSite: 'lax' }).value = name;
    },
    
    // ✅ Apply using component's useTheme() if provided, otherwise fallback to injected Vuetify instance.
    apply(name: ThemeName, vuetifyThemeController?: any) {
      const theme = vuetifyThemeController ?? (useNuxtApp() as any).$vuetify?.theme
      if (!theme) return

      if (typeof theme.change === 'function') theme.change(name)
      else if (theme.global?.name) theme.global.name.value = name
    },

    toggle(vuetifyThemeController?: any) {
      const next: ThemeName = this.effectiveTheme === 'dark' ? 'light' : 'dark';
      this.setOverride(next);
      this.setResolved(next);
      this.apply(next, vuetifyThemeController);
    },

  },

  // GETTERS
  getters:{
    hasOverride: (state) => state.override !== null,
    isDark: (state) => state.resolved === 'dark',
    effectiveTheme: (state): ThemeName => (state.override ?? state.resolved),
  }

});