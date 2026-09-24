import type { ReactNode } from "react"
import { Section } from "@/components/shared/section"

interface LegalPageProps {
  title: string
  intro?: string
  children: ReactNode
}

export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <Section containerClassName="max-w-3xl py-16 lg:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
      <div className="mt-8 flex flex-col gap-6 text-sm leading-6 text-[#3F4145] dark:text-[#CBD5E1] [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline">
        {children}
      </div>
    </Section>
  )
}
