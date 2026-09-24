"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { services } from "@/lib/services-data"
import type { ServiceSlug } from "@/lib/types"

interface ServiceSelectorProps {
  value: ServiceSlug | null
  onChange: (value: ServiceSlug) => void
}

export function ServiceSelector({ value, onChange }: ServiceSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose a service"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {services.map((service) => {
        const Icon = service.icon
        const selected = value === service.slug

        return (
          <button
            key={service.slug}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(service.slug)}
            className={cn(
              "flex items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-accent/60 ring-1 ring-primary"
                : "border-border"
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="font-semibold">{service.name}</span>
              <span className="text-sm text-muted-foreground">
                {service.shortDescription}
              </span>
            </div>
            <div
              className={cn(
                "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input"
              )}
            >
              {selected ? <Check className="size-3.5" aria-hidden="true" /> : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}
