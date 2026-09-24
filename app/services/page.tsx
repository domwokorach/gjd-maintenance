import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { ServicesHero } from "@/components/services/services-hero"
import { ServiceGrid } from "@/components/services/service-grid"
import { CtaSection } from "@/components/shared/cta-section"
import { services } from "@/config/services"

export const metadata: Metadata = {
  title: "Our Maintenance Services | GJDS Maintenance",
  description:
    "Bathroom, kitchen, walls & ceilings, floors & tiles, doors & windows, fixtures & fittings, general repairs and garden maintenance from GJDS Maintenance.",
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <Section>
        <ServiceGrid services={services} />
      </Section>

      <CtaSection
        title="Not sure which service you need?"
        description="Get in touch and we'll help you work out what needs doing."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  )
}
