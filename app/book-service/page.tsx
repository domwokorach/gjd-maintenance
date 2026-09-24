import type { Metadata } from "next"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { BookingForm } from "@/components/booking/booking-form"
import { getServiceBySlug } from "@/config/services"
import type { ServiceSlug } from "@/types/service"

export const metadata: Metadata = {
  title: "Book a Service | GJDS Maintenance",
  description:
    "Book your home maintenance service online. Choose a service, pick a date and time, and confirm your details.",
}

export default async function BookServicePage(
  props: PageProps<"/book-service">
) {
  const searchParams = await props.searchParams
  const requestedService = searchParams.service
  const serviceParam = Array.isArray(requestedService)
    ? requestedService[0]
    : requestedService

  const initialServiceSlug = serviceParam
    ? (getServiceBySlug(serviceParam)?.slug ?? null)
    : null

  return (
    <Section>
      <SectionHeading
        eyebrow="Booking"
        title="Book a Service"
        description="Select the service, date and time that works best for you."
        className="mb-10"
      />
      <BookingForm initialServiceSlug={initialServiceSlug as ServiceSlug | null} />
    </Section>
  )
}
