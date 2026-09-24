import { ClipboardCheck, MessageCircle, ShieldCheck, Timer } from "lucide-react"
import { HeroSection } from "@/components/site/hero-section"
import { SectionHeading } from "@/components/site/section-heading"
import { ServiceCard } from "@/components/site/service-card"
import { CtaSection } from "@/components/site/cta-section"
import { services } from "@/lib/services-data"

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description:
      "We turn up when we say we will and treat your home with care and respect.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Workmanship",
    description:
      "Every job is finished to a high standard, whether it's big or small.",
  },
  {
    icon: Timer,
    title: "Convenient Booking",
    description:
      "Book online in minutes and choose a date and time that suits you.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "You'll always know what's happening and when to expect us.",
  },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
      </section>

      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Why GJDS"
            title="Why Choose Us?"
            align="center"
            className="mx-auto"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm"
                >
                  <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaSection
        title="Need something repaired or maintained?"
        description="Tell us what needs doing and pick a time that works for you — we'll take care of the rest."
        buttonLabel="Book Your Service"
        buttonHref="/book-service"
      />
    </>
  )
}
