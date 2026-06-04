import { requestPasswordReset } from '~~/server/services/password-reset.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email || typeof email !== 'string') {
    throw createError({ statusCode: 400, message: 'L\'adresse email est requise.' })
  }

  console.log('[API] Received forgot-password request for:', email)

  try {
    await requestPasswordReset(email)
  } catch (error) {
    console.error('[API] Unexpected error in forgot-password:', error)
  }

  return { 
    success: true, 
    message: 'Si un compte existe avec cette adresse, un email de réinitialisation a été envoyé.' 
  }
})