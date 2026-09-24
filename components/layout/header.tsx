import Link from "next/link"
import { Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { DesktopNavigation } from "@/components/layout/desktop-navigation"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { siteConfig } from "@/config/site"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-5" aria-hidden="true" />
          </span>
          <span>
            {siteConfig.shortName}
            <span className="text-primary"> Maintenance</span>
          </span>
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/book-service" />}
            nativeButton={false}
            className="hidden rounded-full md:inline-flex"
          >
            Book Now
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
