const STORAGE_KEY = "gjds-cookie-consent"
const CONSENT_EVENT = "cookie-consent-change"

export interface CookieConsent {
  essential: true
  analytics: boolean
  marketing: boolean
}

export const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
}

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CookieConsent>
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    }
  } catch {
    return null
  }
}

export function writeConsent(consent: Omit<CookieConsent, "essential">) {
  if (typeof window === "undefined") return

  const next: CookieConsent = { essential: true, ...consent }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent<CookieConsent>(CONSENT_EVENT, { detail: next }))
}

export { CONSENT_EVENT }
