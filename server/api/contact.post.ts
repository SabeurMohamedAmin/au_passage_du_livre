import { defineEventHandler, readBody } from '#imports'
import { Resend } from 'resend'
import { randomUUID } from 'node:crypto' // Ensure this is imported

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // ✅ THIS is where your Netlify env var is available
  console.log('runtime config', config)
  const resendKey = config.resendApiKey
  const resend = new Resend(resendKey);
  console.log("resendKey", resendKey)
  // 🔒 1. Check API key
  if (!config.resendApiKey) {
    throw new Error('RESEND_API_KEY is missing')
  }
  // ... validation ...
  const { name, email, subject, message,company, website } = await readBody(event)

  // 🛡️ HONEYPOT CHECK
  // If 'company' is filled, it's a bot.
  // We return success: true to fool the bot into thinking it worked.
  if (company || website) {
    console.warn(`Spam detected! Honeypot filled by IP: ${event.node.req.headers['x-forwarded-for'] || 'unknown'}`)
    return { success: true } 
  }
  // 1. Generate the UNIQUE subject here
  // Example result: "[Nouveau Message] Information Générale #A1B2"
  const uniqueSubject = `[Nouveau Message] ${subject || 'Contact'} #${randomUUID().slice(0, 8)}`

  // 2. Pass the UNIQUE subject to the template
  const emailHtml = getContactEmailHtml({
    name: name,
    email: email,
    subject: subject,
    message: message,
  })

  // 3. Pass the SAME unique subject to the email headers
  await resend.emails.send({
    from: 'Au Passage du Livre <contact@nuxt.aupassagedulivre.fr>',
    to: 'aupassagedulivre@hotmail.com',
    replyTo: email,
    subject: uniqueSubject,    
    html: emailHtml,
  })

  return { success: true }
})
