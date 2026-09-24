import type { Metadata } from "next"
import { LegalPage } from "@/components/shared/legal-page"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Accessibility | GJDS Maintenance",
  description: "Our commitment to making the GJDS Maintenance website accessible to everyone.",
}

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      intro="We want everyone to be able to use this website, whatever device or assistive technology they rely on."
    >
      <section>
        <h2>Our approach</h2>
        <p>
          We build this site with semantic HTML, keyboard-navigable controls,
          visible focus states and sufficient colour contrast in both light
          and dark mode. We test key journeys — browsing services and booking
          an appointment — with a keyboard alone.
        </p>
      </section>

      <section>
        <h2>Known limitations</h2>
        <p>
          We&apos;re continuing to improve this site. If you come across
          anything that&apos;s difficult to use with a screen reader,
          keyboard, or other assistive technology, please let us know.
        </p>
      </section>

      <section>
        <h2>Get in touch</h2>
        <p>
          Contact us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>{siteConfig.phone}</a>{" "}
          if you have feedback on the accessibility of this site.
        </p>
      </section>
    </LegalPage>
  )
}
