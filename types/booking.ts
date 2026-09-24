import type { ServiceSlug } from "@/types/service"

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingCustomerDetails {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  address?: string
  postcode?: string
  details?: string
}

export interface Booking {
  service: ServiceSlug
  date: Date
  time: string
  customer: BookingCustomerDetails
}
