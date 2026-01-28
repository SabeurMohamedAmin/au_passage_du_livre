<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

const onScroll = () => {
  show.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <v-fade-transition>
    <v-btn
      v-if="show"
      class="back-to-top"
      icon="mdi-arrow-up"
      size="large"
      elevation="10"
      rounded="xl"
      aria-label="Back to top"
      @click="scrollToTop"
    />
  </v-fade-transition>
</template>

<style scoped>
.back-to-top{
  --overlay-opacity-start: 0.2;
  --overlay-opacity-hover: 0.85;
  --glass-blur: 2px;

  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  right: 18px;
  overflow: hidden;
  bottom: 18px;
  z-index: 1000;
  background-color: rgba(110, 110, 110, 0.2);
  @supports (backdrop-filter: blur(var(--glass-blur))) {
    .back-to-top {
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
    }
  } 
}
.back-to-top:hover{
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}
.back-to-top>*>* {
  box-shadow: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  @supports (backdrop-filter: blur(22px)) {
    .back-to-top {
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
    }
  } 
}

</style>
