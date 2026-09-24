import type { Metadata } from "next"
import Link from "next/link"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"

export const metadata: Metadata = {
  title: "Thank You | GJDS Maintenance",
  description: "Thanks for getting in touch with GJDS Maintenance.",
}

export default function ThankYouPage() {
  return (
    <Section containerClassName="flex flex-col items-center gap-4 text-center py-24">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <CircleCheck className="size-6 text-primary" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold tracking-tight">Thank you</h1>
      <p className="max-w-md text-muted-foreground">
        We&apos;ve received your request and will be in touch shortly to
        confirm the details.
      </p>
      <Button render={<Link href="/" />} nativeButton={false} className="rounded-full">
        Back to Home
      </Button>
    </Section>
  )
}
