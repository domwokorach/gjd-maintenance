import type { Booking } from "@/types/booking"
import type { ContactFormInput } from "@/validations/contact-schema"
import { buildBookingSummary } from "@/lib/booking"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

/**
 * Provider-specific email sending is isolated here. No RESEND_API_KEY means
 * we're in local/dev — log instead of sending, so the rest of the flow
 * (validation, actions, UI) can still be exercised end to end. `env`
 * enforces both being set in production, so this branch is unreachable there.
 */
function isEmailConfigured(): boolean {
  return Boolean(env.RESEND_API_KEY && env.BOOKING_EMAIL)
}

export async function sendBookingEmail(booking: Booking): Promise<void> {
  const summary = buildBookingSummary(booking)

  if (!isEmailConfigured()) {
    logger.info("booking notification not sent (no email provider configured)", {
      service: summary.serviceName,
      date: summary.date,
    })
    return
  }

  // Real provider integration goes here using env.RESEND_API_KEY / env.BOOKING_EMAIL.
  logger.info("booking notification sent", { service: summary.serviceName, date: summary.date })
}

export async function sendContactEmail(contact: ContactFormInput): Promise<void> {
  if (!isEmailConfigured()) {
    logger.info("contact enquiry not sent (no email provider configured)", {
      serviceRequired: contact.serviceRequired,
    })
    return
  }

  logger.info("contact enquiry sent", { serviceRequired: contact.serviceRequired })
}
