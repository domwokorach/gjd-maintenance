import Link from "next/link"
import { Mail, Phone, Wrench } from "lucide-react"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"
import { mainNavigation } from "@/config/navigation"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#0B1F3A] text-white dark:bg-[#071426]">
      <Container className="grid gap-10 py-12 lg:grid-cols-3 lg:py-16">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#5B7CFF] text-white dark:bg-[#6E8BFF]">
              <Wrench className="size-5" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-white/70">
            Reliable maintenance and repair services for homes and
            properties across {siteConfig.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2">
          <span className="mb-1 text-sm font-semibold text-white">Navigation</span>
          {mainNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-white/70 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="mb-1 text-sm font-semibold text-white">Get in touch</span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-sm text-white/60">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
