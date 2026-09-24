import Link from "next/link"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/services/service-card"
import { Button } from "@/components/ui/button"
import { services } from "@/config/services"

export function ServicesPreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow="What we do"
        title="Maintenance services for every part of the home"
        description="Choose from our core maintenance services below, or get in touch if you're not sure what your job needs."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 rounded-[5px] border bg-secondary/40 p-8 text-center">
        <h3 className="text-xl font-semibold">
          Need something else repaired?
        </h3>
        <p className="max-w-xl text-muted-foreground">
          We handle many other small repairs, replacements and maintenance
          jobs around the home. If you can&apos;t see the service you need,
          contact us and tell us what needs fixing.
        </p>
        <Button
          render={<Link href="/contact" />}
          nativeButton={false}
          size="lg"
          className="rounded-[5px]"
        >
          Ask About a Repair
        </Button>
      </div>
    </Section>
  )
}
