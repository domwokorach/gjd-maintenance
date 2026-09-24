import Link from "next/link"
import { Mail, Phone, Wrench } from "lucide-react"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"
import { mainNavigation } from "@/config/navigation"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-secondary/40">
      <Container className="grid gap-10 py-12 lg:grid-cols-3 lg:py-16">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="size-5" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Reliable maintenance and repair services for homes and
            properties across {siteConfig.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2">
          <span className="mb-1 text-sm font-semibold">Navigation</span>
          {mainNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="mb-1 text-sm font-semibold">Get in touch</span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </Container>
      <div className="border-t">
        <Container className="py-5 text-sm text-muted-foreground">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
