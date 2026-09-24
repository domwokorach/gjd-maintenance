import type { Metadata } from "next"
import { LegalPage } from "@/components/shared/legal-page"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Complaints | GJDS Maintenance",
  description: "How to raise a complaint with GJDS Maintenance.",
}

export default function ComplaintsPage() {
  return (
    <LegalPage
      title="Complaints"
      intro="We aim to get every job right first time. If something's gone wrong, here's how to let us know."
    >
      <section>
        <h2>How to complain</h2>
        <p>
          Email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or
          call{" "}
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>{siteConfig.phone}</a>{" "}
          with your name, booking details, and a description of the issue.
        </p>
      </section>

      <section>
        <h2>What happens next</h2>
        <p>
          We&apos;ll acknowledge your complaint within 2 working days and
          aim to resolve it within 10 working days. If a job needs to be
          revisited, we&apos;ll agree a convenient time with you.
        </p>
      </section>
    </LegalPage>
  )
}
