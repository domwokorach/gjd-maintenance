import type { Booking } from "@/types/booking"
import type { ContactFormInput } from "@/validations/contact-schema"
import { buildBookingSummary } from "@/lib/booking"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

/**
 * Provider-specific email sending is isolated here. Local and staging
 * submissions can be exercised without email credentials. Production
 * submissions must report failure when delivery is unavailable.
 */
function isEmailConfigured(): boolean {
  return Boolean(env.RESEND_API_KEY && env.BOOKING_EMAIL)
}

export async function sendBookingEmail(booking: Booking): Promise<void> {
  const summary = buildBookingSummary(booking)

  if (!isEmailConfigured()) {
    if (env.APP_ENV === "production") {
      logger.error("booking notification unavailable: email is not configured")
      throw new Error("Booking email is not configured")
    }
    logger.info("booking notification not sent (no email provider configured)", {
      service: summary.serviceName,
      date: summary.date,
    })
    return
  }

  logger.error("booking notification unavailable: email delivery is not implemented")
  throw new Error("Booking email delivery is not implemented")
}

export async function sendContactEmail(contact: ContactFormInput): Promise<void> {
  if (!isEmailConfigured()) {
    if (env.APP_ENV === "production") {
      logger.error("contact notification unavailable: email is not configured")
      throw new Error("Contact email is not configured")
    }
    logger.info("contact enquiry not sent (no email provider configured)", {
      serviceRequired: contact.serviceRequired,
    })
    return
  }

  logger.error("contact notification unavailable: email delivery is not implemented")
  throw new Error("Contact email delivery is not implemented")
}
