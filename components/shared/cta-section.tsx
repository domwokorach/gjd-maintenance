import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CtaSectionProps {
  title: string
  description?: string
  buttonLabel: string
  buttonHref: string
}

export function CtaSection({
  title,
  description,
  buttonLabel,
  buttonHref,
}: CtaSectionProps) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h2 className="max-w-2xl text-3xl font-bold text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-primary-foreground/80 sm:text-lg">
            {description}
          </p>
        ) : null}
        <Button
          render={<Link href={buttonHref} />}
          nativeButton={false}
          size="lg"
          variant="secondary"
          className="w-full rounded-full text-base font-semibold sm:w-auto"
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}
