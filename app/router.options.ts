import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 1. Browser back/forward
    if (savedPosition) {
      return savedPosition
    }

    // 2. ✅ HASH NAVIGATION (THIS WAS MISSING)
    if (to.hash) {
      return new Promise((resolve) => {
        // wait for DOM + transitions
        setTimeout(() => {
          const el = document.querySelector(to.hash) as HTMLElement | null

          if (!el) {
            resolve(false)
            return
          }

          const headerOffset = 96 // ← your header height
          const elementPosition = el.getBoundingClientRect().top
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })

          resolve(false)
        }, 0)
      })
    }



    // 3. Language switch (Nuxt i18n)
    if (from.name && to.name) {
      const fromBase = from.name.toString().split('___')[0]
      const toBase = to.name.toString().split('___')[0]

      if (fromBase === toBase) {
        return false
      }
    }

    // 4. Default navigation
    return { top: 0, behavior: 'smooth' }
  }
}
