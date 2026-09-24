"use server"

import { bookingSchema, type BookingFormInput } from "@/validations/booking-schema"
import { sendBookingEmail } from "@/lib/email"
import type { Booking } from "@/types/booking"
import type { ServiceSlug } from "@/types/service"

export type BookingActionState =
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof BookingFormInput, string>> }

export async function submitBooking(
  input: BookingFormInput
): Promise<BookingActionState> {
  const parsed = bookingSchema.safeParse(input)

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof BookingFormInput, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof BookingFormInput
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    }
  }

  const booking: Booking = {
    service: parsed.data.service as ServiceSlug,
    date: parsed.data.date,
    time: parsed.data.time,
    customer: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      mobileNumber: parsed.data.mobileNumber,
      email: parsed.data.email,
      address: parsed.data.address,
      postcode: parsed.data.postcode,
      details: parsed.data.details,
    },
  }

  // Booking is confirmed by email for now; persist to a database here once one is added.
  try {
    await sendBookingEmail(booking)
  } catch {
    return {
      status: "error",
      message: "We couldn't submit your booking right now. Please try again later.",
    }
  }

  return { status: "success" }
}
