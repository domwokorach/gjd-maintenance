import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/services/service-card"
import { services } from "@/config/services"

export function ServicesPreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Maintenance services for every part of the home"
        description="Choose from our core maintenance services below, or get in touch if you're not sure what your job needs."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  )
}
