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
