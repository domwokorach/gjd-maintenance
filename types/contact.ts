import type { ServiceSlug } from "@/types/service"

export interface ContactFormData {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  serviceRequired?: ServiceSlug | "other"
  message: string
}
