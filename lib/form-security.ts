const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60000
const RATE_LIMIT_MAX = 3

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (Math.random() < 0.01) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.timestamp > RATE_LIMIT_WINDOW * 5) rateLimitMap.delete(k)
    }
  }
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }
  if (record.count >= RATE_LIMIT_MAX) return true
  record.count++
  return false
}

export function sanitizeInput(input: string, maxLen = 1000): string {
  if (!input) return ""
  return input.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim().slice(0, maxLen)
}

export function validateEmail(email: string): boolean {
  if (/[\r\n]/.test(email)) return false
  const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
  return re.test(email)
}

export function sanitizeEmail(email: string): string {
  return email.replace(/[\r\n\t]/g, "").replace(/[,;]/g, "").trim().toLowerCase()
}

export function decodeHtmlEntities(text: string): string {
  const e: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " }
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, (m) => e[m] || m)
}

export const MIN_SUBMISSION_TIME_MS = 500

export function detectGibberish(text: string): { isGibberish: boolean; reason?: string } {
  if (!text || text.length < 10) return { isGibberish: false }
  if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(text)) return { isGibberish: true, reason: "random characters" }
  if (/([qwerty]{7,}|[asdfgh]{7,}|[zxcvbn]{7,})/i.test(text)) return { isGibberish: true, reason: "keyboard mashing" }
  return { isGibberish: false }
}

export function detectSpam(text: string): { isSpam: boolean; matchedKeyword?: string } {
  const t = text.toLowerCase()
  const keywords = [
    "seo services","seo service","seo "," seo","link building","backlinks","increase traffic",
    "boost your ranking","top of google","digital marketing","social media marketing","marketing agency",
    "marketing services","promote your business","advertise your","grow your business","click here",
    "limited time offer","free trial","earn money online","we can help you","we offer",
    "our services include","we specialize in","i came across your website","i noticed your website",
    "improve your website","collaboration opportunity","partnership opportunity","business proposal",
    "website redesign","web design services","website development","web development","app development",
    "software development","google ads","ppc services","adwords","paid advertising","ecommerce services",
    "outsource","offshore team","interested in our services","would like to offer","lead generation",
    "visitor traffic","scale your traffic","scale their traffic","local promotion","price per lead",
    "lead flow","traffic service","more clicks","conversions",
    // Greek
    "υπηρεσίες seo","κατασκευή ιστοσελίδων","κατασκευή ιστοσελίδας","προώθηση ιστοσελίδας",
    "προώθηση ιστοσελίδων","ψηφιακό μάρκετινγκ","διαφήμιση google","διαφημίσεις google",
    "facebook ads","διαφήμιση facebook","social media διαχείριση","διαχείριση social media",
    "αύξηση επισκεψιμότητας","αύξηση πωλήσεων","προσφορά συνεργασίας","πρόταση συνεργασίας",
    "βελτίωση ιστοσελίδας","ανακατασκευή ιστοσελίδας","δωρεάν δοκιμή","δωρεάν εκτίμηση",
    "χωρίς δέσμευση","καλέστε τώρα","περιορισμένη προσφορά","ειδική προσφορά","μοναδική ευκαιρία",
  ]
  for (const k of keywords) {
    if (t.includes(k)) return { isSpam: true, matchedKeyword: k }
  }
  if ((text.match(/https?:\/\//gi) || []).length > 2) return { isSpam: true, matchedKeyword: "multiple links" }
  return { isSpam: false }
}
