import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/shared/section"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactDetails } from "@/components/contact/contact-details"

export const metadata: Metadata = {
  title: "Contact Us | GJDS Maintenance",
  description:
    "Get in touch with GJDS Maintenance for home maintenance and repair enquiries.",
}

export default function ContactPage() {
  return (
    <Section>
      <ContactHero />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        <Card className="order-2 rounded-xl border shadow-sm lg:order-1 lg:col-span-2">
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>

        <ContactDetails />
      </div>
    </Section>
  )
}
