// plugins/vuetify.ts
/**
 * Nuxt 4 + Vuetify plugin (SSR)
 *
 * Goals:
 * - Register Vuetify with the Nuxt app.
 * - Use a cookie to decide the **initial SSR theme** (light/dark).
 *   This avoids SSR rendering light and then flipping to dark on hydration.
 *
 * Dependencies:
 * - `vuetify` + `vuetify/styles`
 * - Optional icons:
 *   - `npm i @mdi/font`
 *   - import the CSS below (required if you use mdi icons in Vuetify components)
 *
 * Theme cookie:
 * - Name: `vuetify-theme`
 * - Values: 'light' | 'dark'
 * - This cookie is the single source of truth for the SSR theme.
 *
 * When toggling theme in the UI:
 * - Update this cookie AND set `theme.global.name.value` (or `theme.change` if available),
 *   so the change is immediate and persists across refresh/SSR.
 */

// import this after install `@mdi/font` package// plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// 1. Import Vuetify's internal translations
import { ar, en, fr, es, de, tr, pt } from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n:any = nuxtApp.$i18n

  // Helper to build the RTL dictionary
  // @ts-ignore
  const rtlDictionary = Object.fromEntries(
    i18n.locales.value.map((l: any) => [l.code, l.dir === 'rtl'])
  )

  const themeCookie = useCookie('vuetify-theme')

  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: themeCookie.value || 'dark',
    },
    locale: {
      // 2. Pass the imported messages here
      messages: { 
        ar, 
        en,
        fr,
        es,
        de, tr, pt
      },
      
      // Initialize with current locale
      locale: i18n.locale.value,
      fallback: 'en',
      rtl: rtlDictionary,
    },
  })

  nuxtApp.vueApp.use(vuetify)

  // Sync logic (same as before)
  if (import.meta.client) {
    watch(
      () => i18n.locale.value,
      (newLocale) => {
        // @ts-ignore
        vuetify.locale.current.value = newLocale
        
        const isRtl = rtlDictionary[newLocale]
        document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
        document.documentElement.setAttribute('lang', newLocale)
      }
    )
  }
})
