"use client"

import { cn } from "@/lib/utils"
import { timeSlots } from "@/data/time-slots"

interface TimeSelectorProps {
  value: string | null
  onChange: (value: string) => void
}

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose a time"
      className="grid grid-cols-3 gap-2 sm:grid-cols-5"
    >
      {timeSlots.map((time) => {
        const selected = value === time
        return (
          <button
            key={time}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(time)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/60"
            )}
          >
            {time}
          </button>
        )
      })}
    </div>
  )
}
