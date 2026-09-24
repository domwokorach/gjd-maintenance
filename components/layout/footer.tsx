"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Mail, Phone, Wrench } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons"
import { TermsModal } from "@/components/footer/terms-modal"
import { CookiePolicyModal } from "@/components/footer/cookie-policy-modal"
import { siteConfig } from "@/config/site"
import { mainNavigation, footerLegalLinks } from "@/config/navigation"
import { cn } from "@/lib/utils"

const footerLinkClasses = cn(
  "w-fit rounded-[5px] text-sm text-white/70 outline-none transition-colors",
  "hover:text-white active:text-white",
  "focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#5B7CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] dark:focus-visible:ring-offset-[#071426]"
)

const socialLinkClasses = cn(
  "flex size-10 items-center justify-center rounded-[5px] border border-white/15 text-white/80 outline-none transition-colors",
  "hover:border-white/30 hover:bg-white/10 hover:text-white active:bg-white/15",
  "focus-visible:border-white/30 focus-visible:bg-white/10 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[#5B7CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3A] dark:focus-visible:ring-offset-[#071426]"
)

export function Footer() {
  const year = new Date().getFullYear()
  const [termsOpen, setTermsOpen] = useState(false)
  const [cookieOpen, setCookieOpen] = useState(false)
  const termsTriggerRef = useRef<HTMLButtonElement>(null)
  const cookieTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <footer className="border-t border-white/10 bg-[#0B1F3A] text-white dark:bg-[#071426]">
      <Container className="grid grid-cols-1 gap-10 py-12 text-center sm:grid-cols-2 lg:grid-cols-4 lg:py-16 lg:text-left">
        <div className="flex flex-col items-center gap-3 lg:items-start">
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

        <nav aria-label="Footer navigation" className="flex flex-col items-center gap-2 lg:items-start">
          <span className="mb-1 text-sm font-semibold text-white">Navigation</span>
          {mainNavigation.map((link) => (
            <Link key={link.href} href={link.href} className={footerLinkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Legal and support" className="flex flex-col items-center gap-2 lg:items-start">
          <span className="mb-1 text-sm font-semibold text-white">Legal &amp; Support</span>
          <button
            type="button"
            ref={termsTriggerRef}
            onClick={() => setTermsOpen(true)}
            className={cn(footerLinkClasses, "text-center lg:text-left")}
          >
            Terms &amp; Conditions
          </button>
          <button
            type="button"
            ref={cookieTriggerRef}
            onClick={() => setCookieOpen(true)}
            className={cn(footerLinkClasses, "text-center lg:text-left")}
          >
            Cookie Policy
          </button>
          {footerLegalLinks.map((link) => (
            <Link key={link.href} href={link.href} className={footerLinkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <span className="mb-1 text-sm font-semibold text-white">Get in touch</span>
            <a href={`mailto:${siteConfig.email}`} className={cn(footerLinkClasses, "flex items-center gap-2")}>
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className={cn(footerLinkClasses, "flex items-center gap-2")}
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 lg:items-start">
            <span className="text-sm font-semibold text-white">Follow us</span>
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GJDS Maintenance on Facebook (opens in a new tab)"
                className={socialLinkClasses}
              >
                <FacebookIcon className="size-[18px]" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GJDS Maintenance on Instagram (opens in a new tab)"
                className={socialLinkClasses}
              >
                <InstagramIcon className="size-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-2 py-5 text-center text-sm text-white/60 lg:flex-row lg:justify-between lg:text-left">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </div>

      <TermsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        restoreFocusRef={termsTriggerRef}
      />
      <CookiePolicyModal
        open={cookieOpen}
        onClose={() => setCookieOpen(false)}
        restoreFocusRef={cookieTriggerRef}
      />
    </footer>
  )
}
