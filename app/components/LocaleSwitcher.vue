<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, locales, setLocale } = useI18n()

type LocaleMeta = {
  code: string
  name?: string
  dir?: 'ltr' | 'rtl'
}

/* Current locale object from nuxt.config.ts */
const currentLocale = computed<LocaleMeta | undefined>(() =>
  (locales.value as LocaleMeta[]).find(l => l.code === locale.value)
)

/* Direction = single source of truth */
const dir = computed<'ltr' | 'rtl'>(() =>
  currentLocale.value?.dir ?? 'ltr'
)

/* Locale list for menu */
const availableLocales = computed(() =>
  (locales.value as LocaleMeta[]).map(l => ({
    code: l.code,
    name: l.name ?? l.code.toUpperCase(),
  }))
)

function isActive(code: any) {
  return locale.value === code
}

function changeLocale(code: any) {
  if (isActive(code)) return
  setLocale(code)
}

/* Apply globally */
watchEffect(() => {
  if (!import.meta.client) return
  document.documentElement.setAttribute('dir', dir.value)
  document.documentElement.setAttribute('lang', locale.value)
})
</script>


<template>
  <v-menu location="bottom end" transition="slide-y-transition" offset="8">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        size="small"
        variant="text"
        class="mx-1 px-0"
        prepend-icon="mdi-translate"
      >
        <span class="ls-code">{{ locale.toUpperCase() }}</span>
      </v-btn>
    </template>

    <v-list density="compact" min-width="170" class="ls-menu" rounded="xl">
      <v-list-item
        v-for="item in availableLocales"
        :key="item.code"
        class="ls-item"
        rounded="lg"
        :active="isActive(item.code)"
        active-class="ls-active"
        @click="changeLocale(item.code)"
      >
        <v-list-item-title class="ls-title">
          {{ item.name }}
        </v-list-item-title>

        <template #append>
          <span v-if="isActive(item.code)" class="ls-dot" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
/* Language code + tiny underline shimmer */
.ls-code {
  position: relative;
  padding-right: 2px;
}

.ls-code::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 999px;
  opacity: 0;
  transform: translateY(2px);
  transition: opacity 160ms ease, transform 160ms ease;
}

.ls-code::after {
  opacity: 1;
  transform: translateY(0);
}

.ls-chevron {
  margin-left: 6px;
  opacity: 0.8;
  transition: transform 160ms ease, opacity 160ms ease;
}

.ls-chevron {
  transform: translateY(1px);
  opacity: 1;
}

/* ---------------------------
   Menu (still v-list, but glossy)
---------------------------- */
.ls-menu {
  padding: 8px;
  border-radius: 16px !important;

  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.ls-item {
  margin: 4px 0;
  transition: transform 140ms ease, background 140ms ease;
}

.ls-item:hover {
  transform: translateX(3px);
  background: rgba(0, 0, 0, 0.03);
}

.ls-title {
  font-weight: 650;
}

/* Active item styling */
.ls-active {
  background: rgba(25, 118, 210, 0.10);
  font-weight: 750;
  border-left: 3px solid rgb(var(--v-theme-primary));
}

/* Active glowing dot */
.ls-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.15);
}
</style>
