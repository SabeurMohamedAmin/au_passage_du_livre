<script setup lang="ts">
// Optional: Allow overriding URL/Title, otherwise use current page
const props = defineProps<{ url?: string; title?: string }>()

const snackbar = ref(false)

const items = [
  { id: 'facebook', icon: 'mdi-facebook',  title: 'Facebook' },
  { id: 'x',        icon: 'mdi-twitter',   title: 'X (Twitter)' },
  { id: 'reddit',   icon: 'mdi-reddit',    title: 'Reddit' },
  { id: 'copy',     icon: 'mdi-instagram', title: 'Instagram' }, // Insta = Copy
  { id: 'copy',     icon: 'mdi-link',      title: $t('copy_link') }
]

const share = (platformId: string) => {
  // 1. Get data from Props OR Browser
  const url = props.url || window.location.href
  const text = props.title || document.title

  // 2. Define popups
  const networks: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x:        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    reddit:   `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
  }

  // 3. Logic: Open Popup OR Copy to Clipboard
  if (platformId === 'copy' || !networks[platformId]) {
    navigator.clipboard.writeText(url)
    snackbar.value = true
  } else {
    window.open(networks[platformId], '_blank', 'width=600,height=400')
  }
}
</script>

<template>
  <v-menu location="bottom end">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        rounded="lg"
        variant="text"
        color="grey-darken-1"
        size="small"
      >
        <v-icon icon="mdi-share-variant-outline" />
        <v-tooltip
          activator="parent"
          location="start"
        >
          {{$t("share_page")}}
        </v-tooltip>
      </v-btn>
    </template>

    <v-list density="compact" min-width="180" class="pa-0 rounded-lg mt-2">
      <v-list-item
        class="ma-1 rounded-lg"
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="share(item.id)"
      />
    </v-list>
  </v-menu>

  <v-snackbar v-model="snackbar" timeout="2000" color="success" location="bottom">
    <v-icon start icon="mdi-check" /> Lien copié !
  </v-snackbar>
</template>