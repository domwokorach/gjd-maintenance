import Link from "next/link"
import { mainNavigation } from "@/config/navigation"

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {mainNavigation.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-md px-2.5 py-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none lg:px-3"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
