import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import {
  isRateLimited, sanitizeInput, sanitizeEmail, validateEmail,
  decodeHtmlEntities, detectSpam, detectGibberish, MIN_SUBMISSION_TIME_MS,
} from "@/lib/form-security"
import { sendSlackNotification } from "@/lib/slack"

const resend = new Resend(process.env.RESEND_API_KEY)

// ── CHANGE PER SITE ───────────────────────────────────────────────────────────
const SITE_NAME = "Azzura Villas"
const SITE_URL = "https://azzuravillas.gr"
const NOTIFY_EMAIL = "lefkadabooking@gmail.com"
const TIMEZONE = "Europe/Athens"
// ─────────────────────────────────────────────────────────────────────────────

function localDateTime() {
  return new Date().toLocaleString("en-GB", {
    timeZone: TIMEZONE, year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
  })
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    let body: Record<string, string | number>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }

    // Honeypot check
    if (body.website) {
      await sendSlackNotification({
        formType: "Booking Enquiry",
        name: String(body.name || "Bot"),
        email: String(body.email || ""),
        fields: {},
        isSpam: true,
        spamReason: `Honeypot filled: "${body.website}"`,
        sourceUrl: SITE_URL,
        submittedAt: localDateTime(),
        ipAddress: ip,
      })
      return NextResponse.json({ success: true })
    }

    // formLoadTime anti-bot check
    if (body.formLoadTime && Date.now() - Number(body.formLoadTime) < MIN_SUBMISSION_TIME_MS) {
      return NextResponse.json({ success: true })
    }

    const name = sanitizeInput(String(body.name || ""), 200)
    const email = sanitizeEmail(sanitizeInput(String(body.email || ""), 255))
    const checkin = sanitizeInput(String(body.checkin || ""), 50)
    const checkout = sanitizeInput(String(body.checkout || ""), 50)
    const guests = sanitizeInput(String(body.guests || ""), 10)
    const message = sanitizeInput(String(body.message || ""), 2000)

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    // Spam detection
    const spamCheck = detectSpam(`${name} ${message}`)
    const nameGib = detectGibberish(name)
    const msgGib = detectGibberish(message)
    const userAgent = request.headers.get("user-agent") || ""
    const isHeadless = /HeadlessChrome|PhantomJS|Puppeteer/i.test(userAgent)
    const isSpam = spamCheck.isSpam || nameGib.isGibberish || msgGib.isGibberish || isHeadless
    const spamReason = spamCheck.matchedKeyword
      ?? (isHeadless ? `Headless: ${userAgent}` : nameGib.reason ?? msgGib.reason)

    const ts = localDateTime()

    // Build extra fields for Slack
    const extraFields: Record<string, string> = {}
    if (checkin) extraFields["Check-in"] = checkin
    if (checkout) extraFields["Check-out"] = checkout
    if (guests) extraFields["Guests"] = guests

    // Always send to Slack (spam and legit)
    await sendSlackNotification({
      formType: "Booking Enquiry",
      name: decodeHtmlEntities(name),
      email,
      fields: extraFields,
      message: message || undefined,
      isSpam,
      spamReason: isSpam ? spamReason : undefined,
      sourceUrl: SITE_URL,
      submittedAt: ts,
      ipAddress: ip,
    })

    // Only send email for non-spam
    if (!isSpam) {
      const lines = [
        `Hello ${SITE_NAME} team,`,
        "",
        "A new inquiry has been submitted via your website. Don't forget to reply:",
        "",
        "--- Booking Enquiry Details ---",
        `Name: ${decodeHtmlEntities(name)}`,
        `Email: ${email}`,
        checkin ? `Check-in: ${checkin}` : "",
        checkout ? `Check-out: ${checkout}` : "",
        guests ? `Number of Guests: ${guests}` : "",
        message ? `Message: ${decodeHtmlEntities(message)}` : "",
        "",
        SITE_URL,
        ts,
        `IP Address: ${ip}`,
      ].filter(Boolean)

      const { error } = await resend.emails.send({
        from: "MYQO <mailer@myqo.com>",
        to: NOTIFY_EMAIL,
        subject: `${SITE_NAME} | New Booking Enquiry from ${decodeHtmlEntities(name)}`,
        text: lines.join("\n"),
        replyTo: email,
      })

      if (error) console.error("Resend error:", error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    )
  }
}
