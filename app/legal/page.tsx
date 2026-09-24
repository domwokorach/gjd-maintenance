import type { Metadata } from "next"
import { LegalPage } from "@/components/shared/legal-page"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Legal | GJDS Maintenance",
  description: "Legal and company information for GJDS Maintenance.",
}

export default function LegalInformationPage() {
  return (
    <LegalPage title="Legal Information">
      <section>
        <h2>Company details</h2>
        <p>
          {siteConfig.name} operates from {siteConfig.address} and provides
          home maintenance and repair services across{" "}
          {siteConfig.serviceArea}.
        </p>
      </section>

      <section>
        <h2>Insurance</h2>
        <p>
          We carry public liability insurance covering all work carried out
          by our tradespeople. Proof of cover is available on request.
        </p>
      </section>

      <section>
        <h2>Related policies</h2>
        <p>
          See our Terms &amp; Conditions and Cookie Policy in the site
          footer for the terms that apply when you use this website or book
          a service with us.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about our legal or company details can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
