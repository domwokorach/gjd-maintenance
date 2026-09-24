"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/config/site"
import { mainNavigation } from "@/config/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-11 text-white hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-72 flex-col gap-0 border-white/10 bg-[#0B1F3A] p-0 text-white dark:bg-[#071426]"
      >
        <SheetHeader className="border-b border-white/10 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg text-white">
            <Wrench className="size-5 text-[#5B7CFF] dark:text-[#6E8BFF]" aria-hidden="true" />
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col gap-1 px-4 py-6"
        >
          {mainNavigation.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-5">
          <SheetClose
            nativeButton={false}
            render={
              <Button
                render={<Link href="/book-service" />}
                nativeButton={false}
                size="lg"
                className="flex-1"
              />
            }
          >
            Book Now
          </SheetClose>
          <ThemeToggle className="size-11 text-white hover:bg-white/10 hover:text-white" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
