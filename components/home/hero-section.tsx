import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { HeroHeadline } from "@/components/hero/HeroHeadline"
import { MaintenanceDotBackground } from "@/components/backgrounds/maintenance-dot-background"

const highlights = [
  "Vetted, local tradespeople",
  "Clear pricing, no surprises",
  "Book a time that suits you",
]

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-black/10 bg-[#F7F4ED] dark:border-white/10 dark:bg-[#0B1120]">
      <MaintenanceDotBackground />

      <Container className="relative z-10">
        <div className="grid gap-10 py-14 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] lg:items-center lg:gap-12 lg:py-0 xl:gap-16">
          <div className="min-w-0 max-w-[720px]">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
                <Hammer className="size-4 text-primary" aria-hidden="true" />
                Local home maintenance you can trust
              </span>
              <div className="relative max-w-[700px]">
                <HeroHeadline />
              </div>
              <p className="max-w-xl text-base leading-7 text-black/70 sm:text-lg dark:text-muted-foreground">
                Professional maintenance and repair services for homes and
                properties. From tiles and plastering to kitchens and garden
                sheds, book the help you need at a convenient time.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button
                  render={<Link href="/book-service" />}
                  nativeButton={false}
                  size="lg"
                  className="w-full rounded-[5px] text-base font-semibold sm:w-auto"
                >
                  Book a Service
                </Button>
                <Button
                  render={<Link href="/services" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="w-full rounded-[5px] text-base font-semibold sm:w-auto"
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
          </div>

          <div className="relative flex min-h-[420px] min-w-0 items-end justify-center lg:min-h-[560px] lg:justify-end lg:translate-x-4 xl:translate-x-8">
            <div className="relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[620px] xl:max-w-[720px]">
              <div
                aria-hidden="true"
                className="absolute -inset-x-6 -inset-y-10 z-1 opacity-80 blur-3xl [background:radial-gradient(closest-side,#F7F4ED_55%,transparent_100%)] dark:[background:radial-gradient(closest-side,#0B1120_55%,transparent_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-1/4 -z-10 hidden rounded-full bg-[#5B7CFF]/10 blur-3xl dark:block"
              />
              <div
                className="absolute inset-x-[10%] bottom-2 z-1 h-6 rounded-full bg-foreground/10 blur-xl"
                aria-hidden="true"
              />
              <Image
                src="/images/maintenance-engineer.png"
                alt="Maintenance engineer holding a wrench and giving a thumbs up"
                width={1374}
                height={1145}
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="relative z-10 h-auto w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
