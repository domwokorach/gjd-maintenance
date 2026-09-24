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
          className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none lg:px-3"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
