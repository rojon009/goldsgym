import { contact } from "@/lib/content";

/** Same prefill as contact section by default; pass a custom message to override. */
export function whatsappConversationUrl(
  message: string | undefined = contact.whatsappPrefillMessage,
): string | undefined {
  const waNumber = contact.phone.replace(/\D/g, "");
  if (!waNumber) return undefined;
  const prefill = message?.trim();
  return prefill
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(prefill)}`
    : `https://wa.me/${waNumber}`;
}
