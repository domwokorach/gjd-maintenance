import type { LucideIcon } from "lucide-react"

export type ServiceSlug =
  | "tile-maintenance"
  | "plastering"
  | "kitchen-maintenance"
  | "garden-shed"

export interface ServiceTask {
  label: string
}

export interface Service {
  slug: ServiceSlug
  name: string
  shortDescription: string
  description: string
  icon: LucideIcon
  tasks: ServiceTask[]
  bookCta: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface ContactFormData {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  serviceRequired?: ServiceSlug | "other"
  message: string
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
