import type { ThemeName } from '@/stores/ThemeState'
import { useThemeStateStore } from '@/stores/ThemeState'

export default defineNuxtPlugin((nuxtApp) => {
  // Pinia store that owns:
  // - override: manual user choice ('light' | 'dark' | null/undefined)
  // - resolved: the theme that is actually applied right now
  // - hasOverride: helper getter (true if override is set)
  // - setResolved(): action to persist the resolved theme (often in a cookie)
  const storeTheme = useThemeStateStore()

  // System preference (OS/browser) media query listener
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  /**
   * Decide what theme we SHOULD apply right now:
   * 1) If the user manually forced a theme (override), use it.
   * 2) Otherwise, follow the system preference (mq.matches).
   */
  const getTarget = (): ThemeName => {
    if (storeTheme.override) {
      return storeTheme.override
    }
    return mediaQueryList.matches ? 'dark' : 'light';
  }

  /**
   * Apply the theme to Vuetify.
   * Vuetify versions differ:
   * - Some expose `theme.change(name)`
   * - Others require setting `theme.global.name.value`
   *
   * We support both, and bail out safely if Vuetify isn't available yet.
   */
  const applyToVuetify = (name: ThemeName) => {
    const { $vuetify } = useNuxtApp() as any

    // If Vuetify plugin isn't installed yet (or not injected), do nothing.
    if (!$vuetify?.theme) { return };

    // Preferred API (newer Vuetify builds)
    if (typeof $vuetify.theme.change === 'function') {
      $vuetify.theme.change(name)
    }
    // Fallback API (older / different builds)
    else if ($vuetify.theme.global?.name) {
      $vuetify.theme.global.name.value = name
    }
  }

  // Compute the desired theme now
  const target = getTarget()

  /**
   * Hydration safety:
   * We only apply the theme immediately (during plugin init) if it won't cause
   * SSR/CSR mismatch.
   *
   * - If user explicitly set override => safe to apply immediately.
   * - Else only apply immediately when SSR-chosen theme (theme.resolved) already
   *   matches what we would choose on the client (target).
   */
  const canApplyBeforeHydration = storeTheme.hasOverride || storeTheme.resolved === target

  if (canApplyBeforeHydration) {
    // Keep store in sync + apply right away
    storeTheme.setResolved(target)
    applyToVuetify(target)
  } else {
    // If SSR theme differs from client target, wait until mounted to avoid
    // "hydration mismatch" (DOM/classes/CSS vars differ between server and client).
    nuxtApp.hook('app:mounted', () => {
      const t = getTarget()
      storeTheme.setResolved(t)
      applyToVuetify(t)
    })
  }

  /**
   * When user changes the override (e.g. toggles light/dark),
   * re-resolve and apply immediately.
   */
  watch(
    () => storeTheme.override,
    () => {
      const t = getTarget()
      storeTheme.setResolved(t)
      applyToVuetify(t)
    },
  )

  /**
   * When the system theme changes (OS/browser), only react if the user
   * does NOT have a manual override set.
   */
  mediaQueryList.addEventListener('change', () => {
    if (storeTheme.override) return
    const t = getTarget()
    storeTheme.setResolved(t)
    applyToVuetify(t)
  })
})
