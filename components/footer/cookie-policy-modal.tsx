"use client"

import * as React from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { defaultConsent, readConsent, writeConsent, type CookieConsent } from "@/lib/cookie-consent"

interface CookiePolicyModalProps {
  open: boolean
  onClose: () => void
  restoreFocusRef?: React.RefObject<HTMLElement | null>
}

export function CookiePolicyModal({ open, onClose, restoreFocusRef }: CookiePolicyModalProps) {
  const [preferences, setPreferences] = React.useState<Omit<CookieConsent, "essential">>({
    analytics: defaultConsent.analytics,
    marketing: defaultConsent.marketing,
  })

  React.useEffect(() => {
    if (!open) return
    const syncFromStorage = () => {
      const stored = readConsent()
      if (stored) {
        setPreferences({ analytics: stored.analytics, marketing: stored.marketing })
      }
    }
    syncFromStorage()
  }, [open])

  const save = (next: Omit<CookieConsent, "essential">) => {
    writeConsent(next)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      restoreFocusRef={restoreFocusRef}
      title="Cookie Policy"
      description="Choose which optional cookies we're allowed to use."
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={() => save({ analytics: false, marketing: false })}
            className="rounded-[5px]"
          >
            Reject Optional
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => save(preferences)}
            className="rounded-[5px]"
          >
            Save Preferences
          </Button>
          <Button
            type="button"
            onClick={() => save({ analytics: true, marketing: true })}
            className="rounded-[5px]"
          >
            Accept All
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <p>
          We use cookies to run this site, understand how it&apos;s used, and
          occasionally show relevant offers. Essential cookies can&apos;t be
          turned off because the site relies on them to function.
        </p>

        <div className="flex items-start justify-between gap-4 rounded-[5px] border border-border bg-card px-4 py-3">
          <div className="flex flex-col gap-1">
            <Label className="text-foreground">Essential Cookies</Label>
            <p className="text-xs text-muted-foreground">
              Required for core site features like navigation and booking. Always on.
            </p>
          </div>
          <Switch checked disabled aria-label="Essential cookies (always on)" />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-[5px] border border-border bg-card px-4 py-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="analytics-cookies" className="text-foreground">
              Analytics Cookies
            </Label>
            <p className="text-xs text-muted-foreground">
              Help us understand how visitors use the site so we can improve it.
            </p>
          </div>
          <Switch
            id="analytics-cookies"
            checked={preferences.analytics}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, analytics: checked }))
            }
            aria-label="Analytics cookies"
          />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-[5px] border border-border bg-card px-4 py-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="marketing-cookies" className="text-foreground">
              Marketing Cookies
            </Label>
            <p className="text-xs text-muted-foreground">
              Used to show more relevant offers on other sites.
            </p>
          </div>
          <Switch
            id="marketing-cookies"
            checked={preferences.marketing}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, marketing: checked }))
            }
            aria-label="Marketing cookies"
          />
        </div>
      </div>
    </Modal>
  )
}
