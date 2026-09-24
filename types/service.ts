import type { LucideIcon } from "lucide-react"

export type ServiceSlug =
  | "bathroom-services"
  | "kitchen-services"
  | "walls-ceilings"
  | "floors-tiles"
  | "doors-windows"
  | "fixtures-fittings"
  | "general-repairs"
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
  /** Full job list shown on the service detail page. */
  tasks: ServiceTask[]
  /** Short highlight list (~5 items) shown on the compact preview card. */
  commonJobs: ServiceTask[]
  bookCta: string
}
