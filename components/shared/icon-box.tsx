import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconBoxProps {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "size-9",
  md: "size-10",
  lg: "size-12",
} as const

const iconSizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const

export function IconBox({ icon: Icon, size = "lg", className }: IconBoxProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground",
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizeClasses[size]} aria-hidden="true" />
    </div>
  )
}
