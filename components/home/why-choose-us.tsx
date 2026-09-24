import { ClipboardCheck, MessageCircle, ShieldCheck, Timer } from "lucide-react"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { IconBox } from "@/components/shared/icon-box"

const reasons = [
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

export function WhyChooseUs() {
  return (
    <Section variant="muted" border="top">
      <SectionHeading
        eyebrow="Why GJDS"
        title="Why Choose Us?"
        align="center"
        className="mx-auto"
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-3 rounded-xl border bg-background p-6 text-center shadow-sm"
          >
            <IconBox icon={item.icon} />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
