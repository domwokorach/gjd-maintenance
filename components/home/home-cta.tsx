import { CtaSection } from "@/components/shared/cta-section"

export function HomeCTA() {
  return (
    <CtaSection
      title="Need something repaired or maintained?"
      description="Tell us what needs doing and pick a time that works for you — we'll take care of the rest."
      buttonLabel="Book Your Service"
      buttonHref="/book-service"
    />
  )
}
