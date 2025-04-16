type WebhookChannel = "auth" | "site";

type MessageType = "info" | "success" | "warning" | "error" | "update";

interface WebhookMessage {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    timestamp?: string;
    footer?: {
      text: string;
      icon_url?: string;
    };
  }>;
}

const WEBHOOK_URLS: Record<WebhookChannel, string> = {
  auth: "https://discord.com/api/webhooks/1362071129946067205/oPM8ZIDBUKlTNdUm9RuVHd5KyMbtzuOJUKebPd4JNEHtii8MtJdp6hED3YW8ScneQH54",
  site: "https://discord.com/api/webhooks/1362072167109365902/Cu9xj1UFlKtZAgeUgSQnPEuaj6iUi6iThNMEpGEO3hNld4Yxyz5lCuIxbpNaGn_u4pMa",
};

const MESSAGE_STYLES: Record<MessageType, { color: number; icon: string }> = {
  info: { color: 0x3498db, icon: "ℹ️" },
  success: { color: 0x2ecc71, icon: "✅" },
  warning: { color: 0xf39c12, icon: "⚠️" },
  error: { color: 0xe74c3c, icon: "❌" },
  update: { color: 0x9b59b6, icon: "🔄" },
};

/**
 * Send a message to a Discord webhook
 *
 * @param channel - The webhook channel to send to
 * @param message - The message to send
 *
 * @returns Promise that resolves when the message is sent
 */
export async function sendDiscordWebhook(
  channel: WebhookChannel,
  message: WebhookMessage
): Promise<Response> {
  const webhookUrl = WEBHOOK_URLS[channel];

  if (!webhookUrl) {
    throw new Error(`Webhook URL for channel "${channel}" not found`);
  }

  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

/**
 * Send a formatted message to Discord
 *
 * @param channel - The webhook channel to send to
 * @param type - The message type (determines styling)
 * @param title - The title of the message
 * @param description - The message description/content
 * @param fields - Optional fields to include in the embed
 *
 * @returns Promise that resolves when the message is sent
 */
export async function sendFormattedMessage(
  channel: WebhookChannel,
  type: MessageType,
  title: string,
  description: string,
  fields?: Array<{ name: string; value: string; inline?: boolean }>
): Promise<Response> {
  const style = MESSAGE_STYLES[type];

  return sendDiscordWebhook(channel, {
    embeds: [
      {
        title: `${style.icon} ${title}`,
        description,
        color: style.color,
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: `Mint Cashback - ${
            type.charAt(0).toUpperCase() + type.slice(1)
          }`,
        },
      },
    ],
  });
}

/**
 * Send an error message with formatted details
 *
 * @param channel - The webhook channel to send to
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 *
 * @returns Promise that resolves when the message is sent
 */
export async function sendErrorToDiscord(
  channel: WebhookChannel,
  error: Error,
  context?: string
): Promise<Response> {
  return sendFormattedMessage(
    channel,
    "error",
    "Error Occurred",
    error.message,
    [
      {
        name: "Stack",
        value: (error.stack || "No stack trace").substring(0, 1000),
      },
      ...(context
        ? [
            {
              name: "Context",
              value: context,
            },
          ]
        : []),
    ]
  );
}

/**
 * Send an auth event notification
 *
 * @param action - The auth action (login, register, etc.)
 * @param userId - The user ID
 * @param details - Additional details about the auth event
 * @param success - Whether the auth action was successful
 */
export async function sendAuthEvent(
  action: string,
  userId: string,
  details?: Record<string, any>,
  success: boolean = true
): Promise<Response> {
  const type = success ? "success" : "error";
  const fields = details
    ? Object.entries(details).map(([key, value]) => ({
        name: key,
        value: JSON.stringify(value, null, 2),
        inline: true,
      }))
    : undefined;

  return sendFormattedMessage(
    "auth",
    type,
    `${action} ${success ? "Successful" : "Failed"}`,
    `User ID: ${userId}`,
    fields
  );
}
