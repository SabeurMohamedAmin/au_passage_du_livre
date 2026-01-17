import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    // 1. If "Back" button was pressed, restore position
    if (savedPosition) {
      return savedPosition
    }

    // 2. Check for Language Switch
    // Nuxt i18n adds a suffix like ___en or ___fr
    // We split by '___' to compare the base route name
    if (from.name && to.name) {
      const fromBase = from.name.toString().split('___')[0]
      const toBase = to.name.toString().split('___')[0]

      // If we are on the "same" page but just changed language
      if (fromBase === toBase) {
        // returning 'false' prevents any scroll change
        return false 
      }
    }

    // 3. Normal navigation -> Scroll to top
    return { top: 0, behavior: 'smooth' }
  }
}