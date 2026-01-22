interface EmailTemplateData {
  name: string
  email: string
  subject: string
  message: string
}

export const getContactEmailHtml = ({ name, email, subject, message }: EmailTemplateData): string => {
  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'full',
    timeStyle: 'short',
  })
  
  const firstName = name.split(' ')[0]

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Message - Au Passage du Livre</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f5; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background-color: #18181b; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
    .content { padding: 40px; }
    .meta-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; border-bottom: 1px solid #e4e4e7; padding-bottom: 24px; }
    .meta-item { font-size: 14px; }
    .label { color: #71717a; font-weight: 500; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .value { color: #18181b; font-weight: 600; font-size: 16px; text-decoration: none; }
    .badge { display: inline-block; background-color: #f4f4f5; color: #18181b; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; border: 1px solid #e4e4e7; }
    .message-box { background-color: #fafafa; border-left: 4px solid #18181b; padding: 24px; border-radius: 4px; font-size: 16px; color: #3f3f46; white-space: pre-wrap; }
    .footer { background-color: #f4f4f5; padding: 24px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #e4e4e7; }
    .btn { display: inline-block; background-color: #18181b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; margin-top: 24px; }
    @media (min-width: 480px) { .meta-grid { grid-template-columns: 1fr 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Au Passage du Livre</h1>
    </div>
    
    <div class="content">
      <div class="meta-grid">
        <div class="meta-item">
          <span class="label">De la part de</span>
          <div class="value">${name}</div>
        </div>
        <div class="meta-item">
          <span class="label">Adresse Email</span>
          <a href="mailto:${email}" class="value" style="color:#2563eb;">${email}</a>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <span class="label">Sujet</span>
        <span class="badge">${subject || 'Contact Général'}</span>
      </div>

      <span class="label">Message</span>
      <div class="message-box">${message}</div>

      <div style="text-align: center;">
        <a href="mailto:${email}?subject=RE: ${subject || 'Votre message'}" class="btn">
          Répondre à ${firstName}
        </a>
      </div>
    </div>

    <div class="footer">
      <p>Cet email a été envoyé via le formulaire de contact de<br>aupassagedulivre.fr</p>
      <p style="margin-top: 8px;">Reçu le ${date}</p>
    </div>
  </div>
</body>
</html>`
}
