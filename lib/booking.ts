import { getServiceBySlug } from "@/config/services"
import { formatFriendlyDate } from "@/lib/dates"
import type { Booking } from "@/types/booking"

export interface BookingSummaryView {
  serviceName: string
  date: string
  time: string
  customerName: string
}

export function buildBookingSummary(booking: Booking): BookingSummaryView {
  const service = getServiceBySlug(booking.service)

  return {
    serviceName: service?.name ?? "Unknown service",
    date: formatFriendlyDate(booking.date),
    time: booking.time,
    customerName: `${booking.customer.firstName} ${booking.customer.lastName}`,
  }
}
