// composables/useRtlIcons.ts
import { useLocale } from 'vuetify'

export const useRtlIcons = () => {
  const { isRtl } = useLocale()

  // Dynamic arrow that flips automatically
  const iconArrowRight = computed(() => {
    return isRtl.value ? 'mdi-arrow-left' : 'mdi-arrow-right'
  })

  const iconArrowLeft = computed(() => {
    return isRtl.value ? 'mdi-arrow-right' : 'mdi-arrow-left'
  })

  const iconChevronRight = computed(() => {
    return isRtl.value ? 'mdi-chevron-left' : 'mdi-chevron-right'
  })

  const iconChevronLeft = computed(() => {
    return isRtl.value ? 'mdi-chevron-right' : 'mdi-chevron-left'
  })

  return {
    iconArrowRight,
    iconArrowLeft,
    iconChevronRight,
    iconChevronLeft,
    isRtl
  }
}