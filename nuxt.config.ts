// nuxt.config.ts
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const ssrNoExternal = ['@react-email/render', 'resend']
const imageDomains = ['lh3.googleusercontent.com', 'googleusercontent.com']

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    'nuxt-protected-mailto',
  ],

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    public: {},
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    ssr: {
      noExternal: ssrNoExternal,
    },
  },

  nitro: {
    rollupConfig: {
      external: ['@react-email/render'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  image: {
    domains: imageDomains,
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales:[
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json', dir: 'ltr' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json', dir: 'ltr' },
      { code: 'tr', iso: 'tr-TR', name: 'Türkçe', file: 'tr.json', dir: 'ltr' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.json', dir: 'ltr' },
      { code: 'pt', iso: 'pt-PT', name: 'Português', file: 'pt.json', dir: 'ltr' },
      { code: 'ar', iso: 'ar-SA', name: 'العربية', file: 'ar.json', dir: 'rtl' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: false,
  },
})