// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    public: {
      //
    },
  },
  
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
      Icons({
        // compiler: 'vue3',
        autoInstall: true, // auto-installs icon sets on demand
      }),
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

    ],
  }

})