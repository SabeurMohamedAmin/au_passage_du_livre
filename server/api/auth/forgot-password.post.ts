import { db } from '~~/server/db'
import { passwordResets } from '~~/server/db/schema/password-resets'
import { eq } from 'drizzle-orm'
import { generateResetToken } from '~~/server/utils/auth'
import { Resend } from 'resend'

const GENERIC_OK = { ok: true, message: 'Si ce compte existe, un lien a été envoyé.' }

export default defineEventHandler(async (event) => {
  const { email }  = await readBody(event)
  const config     = useRuntimeConfig()

  if (!email?.trim()) throw createError({ statusCode: 400, message: 'Email requis.' })

  const user = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.email, email.toLowerCase().trim()),
  })

  // Toujours répondre de la même façon (anti-énumération d'emails)
  if (!user?.isAdmin || !user.hashedPassword) return GENERIC_OK

  // Invalider les anciens tokens
  await db.delete(passwordResets).where(eq(passwordResets.userId, user.id))

  // Nouveau token — expire dans 1h
  const { raw, hashed } = generateResetToken()
  const expiresAt = Math.floor(Date.now() / 1000) + 3600

  await db.insert(passwordResets).values({ userId: user.id, token: hashed, expiresAt })

  const resetUrl = `${config.appUrl}/admin/reset-password?token=${raw}`
  const resend   = new Resend(config.resendApiKey)

  await resend.emails.send({
    from:    'noreply@au-passage-du-livre.fr',
    to:      user.email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f8f5;border-radius:12px;">
        <h2 style="color:#01696f;margin-bottom:8px;">Réinitialisation du mot de passe</h2>
        <p>Bonjour <strong>${user.displayName}</strong>,</p>
        <p>Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe.<br>
           Ce lien est valide pendant <strong>1 heure</strong>.</p>
        <a href="${resetUrl}"
           style="display:inline-block;margin-top:20px;padding:14px 28px;background:#01696f;
                  color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
          Réinitialiser le mot de passe
        </a>
        <p style="margin-top:32px;font-size:12px;color:#888;">
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.<br>
          Lien : <a href="${resetUrl}">${resetUrl}</a>
        </p>
      </div>
    `,
  })

  return GENERIC_OK
})