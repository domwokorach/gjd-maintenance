"use client"

import type { RefObject } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface TermsModalProps {
  open: boolean
  onClose: () => void
  restoreFocusRef?: RefObject<HTMLElement | null>
}

export function TermsModal({ open, onClose, restoreFocusRef }: TermsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      restoreFocusRef={restoreFocusRef}
      title="Terms & Conditions"
      description={`Last updated ${new Date().getFullYear()}`}
      footer={
        <Button type="button" onClick={onClose} className="rounded-[5px]">
          I Understand
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <p>
          These terms and conditions govern your use of {siteConfig.name}&apos;s
          website and booking services. By requesting a quote, booking a
          service, or otherwise using this site, you agree to the terms set
          out below.
        </p>

        <section className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-foreground">1. Our services</h3>
          <p>
            {siteConfig.name} provides home maintenance and repair services,
            including bathroom, kitchen, walls & ceilings, floors & tiles,
            doors & windows, fixtures & fittings, general repairs and garden
            works, across {siteConfig.serviceArea}. Quotes provided before a
            job begins are estimates and may be revised if the scope of work
            changes once work is underway.
          </p>
        </section>

        <section className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-foreground">2. Bookings &amp; cancellations</h3>
          <p>
            Bookings made through this site are provisional until confirmed
            by our team. We ask for at least 24 hours&apos; notice to
            reschedule or cancel an appointment where possible, so we can
            offer the slot to another customer.
          </p>
        </section>

        <section className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-foreground">3. Pricing &amp; payment</h3>
          <p>
            Prices are confirmed in writing before work begins. Payment is
            due on completion of the work unless otherwise agreed in
            writing.
          </p>
        </section>

        <section className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-foreground">4. Liability</h3>
          <p>
            We carry public liability insurance and take reasonable care on
            every job. We are not liable for pre-existing faults in a
            property that are discovered, but not caused, during our work.
          </p>
        </section>

        <section className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-foreground">5. Contact</h3>
          <p>
            Questions about these terms can be sent to{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Modal>
  )
}
