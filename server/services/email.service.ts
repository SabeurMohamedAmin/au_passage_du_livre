// server/services/email.service.ts
import { useRuntimeConfig } from '#imports'
import { Resend } from 'resend'

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  console.log('[EmailService] 🚀 Attempting to send email to:', email) // ⭐ CE LOG DOIT APPARAÎTRE
  
  const config = useRuntimeConfig()
  
  if (!config.resendApiKey) {
    console.warn('[EmailService] ⚠️ RESEND_API_KEY is not defined in .env')
    return
  }

  const resend = new Resend(config.resendApiKey)
  const resetUrl = `${config.appUrl}/admin/reset-password?token=${resetToken}`
  
  console.log('[EmailService] 🔗 Generated reset URL:', resetUrl)

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `<p>Lien: ${resetUrl}</p>` // Version simplifiée pour le test
    })
    console.log('[EmailService] ✅ Email sent! Resend ID:', response)
  } catch (error) {
    console.error('[EmailService] ❌ Failed to send email via Resend:', error)
    throw error
  }
}