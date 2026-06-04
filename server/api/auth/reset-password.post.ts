// server/api/auth/reset-password.post.ts
import { resetPassword } from '~~/server/services/password-reset.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token, password } = body

  if (!token || typeof token !== 'string') {
    throw createError({ statusCode: 400, message: 'Le token est requis.' })
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    throw createError({ statusCode: 400, message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  }

  try {
    await resetPassword(token, password)
    return { success: true, message: 'Mot de passe mis à jour avec succès.' }
  } catch (error: any) {
    // Mapping des erreurs internes vers des messages utilisateur clairs
    let message = 'Une erreur est survenue.'
    if (error.message === 'INVALID_TOKEN') message = 'Lien de réinitialisation invalide.'
    if (error.message === 'TOKEN_USED') message = 'Ce lien a déjà été utilisé.'
    if (error.message === 'TOKEN_EXPIRED') message = 'Ce lien a expiré.'
    
    throw createError({ statusCode: 400, message })
  }
})