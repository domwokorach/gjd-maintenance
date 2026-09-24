import { ServiceDetails } from "@/components/services/service-details"
import type { Service } from "@/types/service"

interface ServiceGridProps {
  services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="flex flex-col gap-8">
      {services.map((service) => (
        <ServiceDetails key={service.slug} service={service} />
      ))}
    </div>
  )
}
