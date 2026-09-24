import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { DesktopNavigation } from "@/components/layout/desktop-navigation"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1F3A] dark:bg-[#071426]">
      <Container className="flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label="GJD Maintenance home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/images/gjd-maintenance-logo.png"
            alt="GJD Maintenance"
            width={690}
            height={518}
            priority
            className="h-auto w-[100px] object-contain sm:w-[115px] lg:w-[130px]"
          />
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden text-white hover:bg-white/10 hover:text-white md:inline-flex" />
          <Button
            render={<Link href="/book-service" />}
            nativeButton={false}
            className="hidden rounded-[5px] md:inline-flex"
          >
            Book Now
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
