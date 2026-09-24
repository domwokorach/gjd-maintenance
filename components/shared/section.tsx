import type { ReactNode } from "react"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  /** Adds the muted/bordered treatment used for hero and banner sections. */
  variant?: "default" | "muted"
  border?: "none" | "top" | "bottom"
}

export function Section({
  children,
  className,
  containerClassName,
  variant = "default",
  border = "none",
}: SectionProps) {
  return (
    <section
      className={cn(
        variant === "muted" && "bg-secondary/40",
        border === "top" && "border-t",
        border === "bottom" && "border-b",
        className
      )}
    >
      <Container className={cn("py-14 lg:py-20", containerClassName)}>
        {children}
      </Container>
    </section>
  )
}
