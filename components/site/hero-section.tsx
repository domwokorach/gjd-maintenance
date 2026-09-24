import Link from "next/link"
import { CheckCircle2, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  "Vetted, local tradespeople",
  "Clear pricing, no surprises",
  "Book a time that suits you",
]

export function HeroSection() {
  return (
    <section className="border-b bg-secondary/40">
      <div className="mx-auto grid max-w-(--breakpoint-xl) gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
            <Hammer className="size-4 text-primary" aria-hidden="true" />
            Local home maintenance you can trust
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Reliable Home Maintenance, Done Properly
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Professional maintenance and repair services for homes and
            properties. From tiles and plastering to kitchens and garden
            sheds, book the help you need at a convenient time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/book-service" />}
              nativeButton={false}
              size="lg"
              className="w-full rounded-full text-base font-semibold sm:w-auto"
            >
              Book a Service
            </Button>
            <Button
              render={<Link href="/services" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="w-full rounded-full text-base font-semibold sm:w-auto"
            >
              View Services
            </Button>
          </div>
          <ul className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-accent/40 to-secondary shadow-sm lg:aspect-square">
          <div className="grid grid-cols-2 gap-4 p-8 sm:gap-6 sm:p-10">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 p-6 text-center shadow-sm backdrop-blur">
              <span className="text-3xl font-bold text-primary">4</span>
              <span className="text-sm text-muted-foreground">
                Core maintenance services
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 p-6 text-center shadow-sm backdrop-blur">
              <span className="text-3xl font-bold text-primary">7</span>
              <span className="text-sm text-muted-foreground">
                Days a week booking
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 p-6 text-center shadow-sm backdrop-blur">
              <span className="text-sm font-medium">
                Trusted by homeowners across Shrewsbury and surrounding areas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
