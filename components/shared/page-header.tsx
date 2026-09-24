import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Section variant="muted" border="bottom" containerClassName="py-14 lg:py-20">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
    </Section>
  )
}
