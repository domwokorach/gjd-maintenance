import Link from "next/link"
import { Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNavigation } from "@/components/site/mobile-navigation"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/book-service", label: "Book Service" },
  { href: "/contact", label: "Contact Us" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>

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
      </div>
    </header>
  )
}
