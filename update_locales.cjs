const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'i18n/locales');
const locales = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const translations = {
  fr: { free: "Entrée gratuite", paid: "Entrée payante", invitation: "Sur invitation", registration: "Sur inscription" },
  en: { free: "Free entry", paid: "Paid entry", invitation: "By invitation", registration: "Registration required" },
  de: { free: "Freier Eintritt", paid: "Kostenpflichtiger Eintritt", invitation: "Auf Einladung", registration: "Anmeldung erforderlich" },
  es: { free: "Entrada gratuita", paid: "Entrada de pago", invitation: "Por invitación", registration: "Inscripción obligatoria" },
  pt: { free: "Entrada gratuita", paid: "Entrada paga", invitation: "Por convite", registration: "Inscrição obrigatória" },
  tr: { free: "Ücretsiz giriş", paid: "Ücretli giriş", invitation: "Davetiye ile", registration: "Kayıt gerekli" },
  ar: { free: "دخول مجاني", paid: "دخول مدفوع", invitation: "بدعوة", registration: "التسجيل مطلوب" }
};

for (const file of locales) {
  const lang = file.split('.')[0];
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const trans = translations[lang] || translations.en;
  
  data["Entrée gratuite"] = trans.free;
  data["Entrée payante"] = trans.paid;
  data["Sur invitation"] = trans.invitation;
  data["Sur inscription"] = trans.registration;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated ' + file);
}
