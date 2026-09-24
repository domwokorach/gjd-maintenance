import type { SVGProps } from "react"

/**
 * lucide-react dropped brand/logo icons a while back, so Facebook and
 * Instagram glyphs are hand-drawn here to match lucide's stroke style
 * (24x24 viewBox, round caps/joins, currentColor) rather than pulling in a
 * separate icon package for two icons.
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 9.5V7a1 1 0 0 1 1-1h2V3h-2.5A3.5 3.5 0 0 0 11 6.5V9.5H9V13h2v8h3v-8h2.5l.5-3.5H14Z" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}
