export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return

  const publicRoutes = ['/admin/login', '/admin/forgot-password', '/admin/reset-password']
  if (publicRoutes.some(r => to.path.startsWith(r))) return

  const { loggedIn, session } = useUserSession()

  if (!loggedIn.value || !session.value?.user?.isAdmin) {
    return navigateTo('/admin/login')
  }
})