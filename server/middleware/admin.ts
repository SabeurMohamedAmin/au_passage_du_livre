// server/middleware/admin.ts
import { defineEventHandler, getRequestPath, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event)

  // Block any request to admin API endpoints (except the initial setup endpoints)
  // if the user does not have a valid admin session.
  if (path.startsWith('/api/admin') && !path.startsWith('/api/admin/setup')) {
    const session = await getUserSession(event)

    if (!session?.user?.isAdmin) {
      throw createError({
        statusCode: 401,
        message: 'Accès non autorisé.',
      })
    }
  }
})
