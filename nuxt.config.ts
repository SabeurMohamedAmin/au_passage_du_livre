// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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
    runtimeConfig: {
      resendApiKey: '', // DO NOT put process.env here
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    }
  },
  image: {
    domains: ['lh3.googleusercontent.com', 'googleusercontent.com'],
  },
  
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
        dir: 'ltr'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de.json',
        dir: 'ltr'
      },
      {
        code: 'tr',
        iso: 'tr-TR',
        name: 'Türkçe',
        file: 'tr.json',
        dir: 'ltr'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json',
        dir: 'ltr'
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
        file: 'pt.json',
        dir: 'ltr'
      },
      // ✅ Arabic
      { 
        code: 'ar', 
        iso: 'ar-SA', 
        name: 'العربية', 
        file: 'ar.json', 
        dir: 'rtl' 
      }, 

    ]    
  }
})