"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /**
   * Ref to the element that opened the modal (e.g. the trigger button).
   * Preferred over capturing `document.activeElement`, since a click isn't
   * guaranteed to focus its target in every browser (notably Safari/Firefox
   * on macOS don't focus buttons on click by default).
   */
  restoreFocusRef?: React.RefObject<HTMLElement | null>
}

/**
 * Accessible, portal-rendered modal with Framer Motion fade/scale transitions.
 * Handles focus trapping, Escape-to-close, backdrop click, background-scroll
 * lock, and restoring focus to whatever triggered it on close.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  restoreFocusRef,
}: ModalProps) {
  const titleId = React.useId()
  const descriptionId = React.useId()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const previouslyFocused = React.useRef<HTMLElement | null>(null)

  // Defers portal creation until after hydration — document isn't available
  // during SSR, and this also keeps server/client markup identical.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    const markMounted = () => setMounted(true)
    markMounted()
  }, [])

  React.useEffect(() => {
    if (!open) return

    previouslyFocused.current = restoreFocusRef?.current ?? (document.activeElement as HTMLElement | null)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
      )

    const focusFrame = requestAnimationFrame(() => {
      const [first] = getFocusable()
      ;(first ?? panelRef.current)?.focus()
    })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab") return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus()
    }
  }, [open, onClose, restoreFocusRef])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-[5px] border border-border bg-popover text-popover-foreground shadow-lg outline-none",
              className
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div className="flex flex-col gap-1">
                <h2 id={titleId} className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-9 shrink-0 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-black/[0.06] hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none dark:hover:bg-white/10"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 text-sm leading-6 text-muted-foreground">
              {children}
            </div>

            {footer && (
              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border px-5 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
