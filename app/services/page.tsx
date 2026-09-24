import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionHeading } from "@/components/site/section-heading"
import { CtaSection } from "@/components/site/cta-section"
import { services } from "@/lib/services-data"

export const metadata: Metadata = {
  title: "Our Maintenance Services | GJDS Maintenance",
  description:
    "Tile maintenance, plastering, kitchen maintenance and garden & shed maintenance from GJDS Maintenance.",
}

export default function ServicesPage() {
  return (
    <>
      <section className="border-b bg-secondary/40">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Services"
            title="Our Maintenance Services"
            description="Detailed, no-nonsense maintenance work carried out by people who take pride in getting it right."
          />
        </div>
      </section>

      <section className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 rounded-xl border shadow-sm"
            >
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">{service.name}</h2>
                    <p className="max-w-2xl text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <Button
                  render={<Link href={`/book-service?service=${service.slug}`} />}
                  nativeButton={false}
                  size="lg"
                  className="w-full shrink-0 rounded-full lg:w-auto"
                >
                  {service.bookCta}
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {service.tasks.map((task) => (
                    <li
                      key={task.label}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {task.label}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </section>

      <CtaSection
        title="Not sure which service you need?"
        description="Get in touch and we'll help you work out what needs doing."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  )
}
