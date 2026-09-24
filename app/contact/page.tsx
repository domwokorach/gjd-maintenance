import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SectionHeading } from "@/components/site/section-heading"
import { ContactForm } from "@/components/contact/contact-form"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact Us | GJDS Maintenance",
  description:
    "Get in touch with GJDS Maintenance for home maintenance and repair enquiries.",
}

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: siteConfig.serviceArea,
  },
]

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Contact Us"
        description="Have a question or need help with a maintenance job? Send us your details and we'll get back to you."
        className="mb-10"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <Card className="order-2 rounded-xl border shadow-sm lg:order-1 lg:col-span-2">
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>

        <Card className="order-1 h-fit rounded-xl border bg-secondary/40 shadow-sm lg:order-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Contact information</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {contactDetails.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                </div>
              )

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg -m-1 p-1 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
