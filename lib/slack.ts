const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID

interface NotificationData {
  formType: string
  name: string
  email: string
  fields: Record<string, string>
  message?: string
  isSpam?: boolean
  spamReason?: string
  sourceUrl?: string
  submittedAt?: string
  ipAddress?: string
}

export async function sendSlackNotification(data: NotificationData): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) { console.error("SLACK_WEBHOOK_URL not configured"); return false }

  const emoji = data.isSpam ? "⚠️" : "📋"
  const title = data.isSpam
    ? `Spam Detected — ${data.formType}`
    : `New ${data.formType} submitted`

  const sectionFields = [
    { type: "mrkdwn", text: `*Name:*\n${data.name}` },
    { type: "mrkdwn", text: `*Email:*\n${data.email}` },
    ...Object.entries(data.fields).map(([k, v]) => ({ type: "mrkdwn", text: `*${k}:*\n${v}` })),
  ]

  const fieldChunks: (typeof sectionFields)[] = []
  for (let i = 0; i < sectionFields.length; i += 10) fieldChunks.push(sectionFields.slice(i, i + 10))

  const blocks: object[] = [
    { type: "header", text: { type: "plain_text", text: `${emoji} ${title}`, emoji: true } },
    ...fieldChunks.map((fields) => ({ type: "section", fields })),
  ]

  if (data.message) blocks.push({ type: "section", text: { type: "mrkdwn", text: `*Message:*\n${data.message}` } })

  blocks.push({
    type: "section",
    fields: [
      { type: "mrkdwn", text: `*Source:*\n${data.sourceUrl ?? ""}` },
      { type: "mrkdwn", text: `*Submitted:*\n${data.submittedAt ?? new Date().toISOString()}` },
    ],
  })

  const contextParts = [`🌐 IP: ${data.ipAddress ?? "Unknown"}`]
  if (data.isSpam && data.spamReason) contextParts.push(`🚫 Spam: ${data.spamReason}`)
  blocks.push({ type: "context", elements: contextParts.map((t) => ({ type: "mrkdwn", text: t })) })

  try {
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel: SLACK_CHANNEL_ID, blocks }),
    })
    return res.ok
  } catch (err) {
    console.error("Slack error:", err)
    return false
  }
}
