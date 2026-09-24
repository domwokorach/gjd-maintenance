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

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-72 flex-col gap-0 p-0">
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <Wrench className="size-5 text-primary" aria-hidden="true" />
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
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        <div className="border-t px-4 py-5">
          <SheetClose
            nativeButton={false}
            render={
              <Button
                render={<Link href="/book-service" />}
                nativeButton={false}
                size="lg"
                className="w-full rounded-full"
              />
            }
          >
            Book Now
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
