import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({
  id,
  label,
  required,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
