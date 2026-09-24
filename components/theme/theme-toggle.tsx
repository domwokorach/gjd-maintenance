"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/**
 * Single-click Light/Dark toggle — no menu, no "System" option in the UI.
 * System preference is only used to pick the theme on a visitor's first
 * load (via ThemeProvider's defaultTheme="system"); any click after that
 * sets an explicit choice that next-themes persists to localStorage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  // Avoids a hydration mismatch: resolvedTheme is only known once next-themes
  // has read the persisted/system preference on the client, and toggling
  // icons before then would render a value the server never rendered.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const markMounted = () => setMounted(true)
    markMounted()
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const label = isDark ? "Switch to light mode" : "Switch to dark mode"

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={label}
            onClick={toggleTheme}
            disabled={!mounted}
            className={cn(
              "size-11 shrink-0 rounded-[5px] border border-input transition-colors focus-visible:border-ring dark:border-[#263247]",
              className
            )}
          />
        }
      >
        {mounted && isDark ? (
          <Sun className="size-5 transition-opacity duration-150" aria-hidden="true" />
        ) : (
          <Moon className="size-5 transition-opacity duration-150" aria-hidden="true" />
        )}
        <span className="sr-only">{label}</span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
