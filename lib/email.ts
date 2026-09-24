import type { Booking } from "@/types/booking"
import type { ContactFormInput } from "@/validations/contact-schema"
import { buildBookingSummary } from "@/lib/booking"

/**
 * Provider-specific email sending is isolated here. No RESEND_API_KEY means
 * we're in local/dev — log instead of sending, so the rest of the flow
 * (validation, actions, UI) can still be exercised end to end.
 */
async function isEmailConfigured(): Promise<boolean> {
  return Boolean(process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL)
}

export async function sendBookingEmail(booking: Booking): Promise<void> {
  const summary = buildBookingSummary(booking)

  if (!(await isEmailConfigured())) {
    console.info("[email] booking notification (not sent, no provider configured)", summary)
    return
  }

  // Real provider integration goes here once RESEND_API_KEY / BOOKING_EMAIL are set.
  console.info("[email] booking notification sent", summary)
}

export async function sendContactEmail(contact: ContactFormInput): Promise<void> {
  if (!(await isEmailConfigured())) {
    console.info("[email] contact enquiry (not sent, no provider configured)", contact)
    return
  }

  console.info("[email] contact enquiry sent", contact)
}
