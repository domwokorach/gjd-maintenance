"use client"

import { CalendarDays } from "lucide-react"
import { enGB } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { formatFriendlyDate, startOfToday } from "@/lib/dates"

interface BookingCalendarProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

export function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <Calendar
        mode="single"
        selected={value}
        onSelect={onChange}
        disabled={{ before: startOfToday() }}
        locale={enGB}
        className="w-full rounded-xl border bg-card p-3 shadow-sm sm:w-fit"
      />
      <div className="flex items-center gap-2 rounded-xl border bg-accent/50 px-4 py-3 text-sm sm:flex-col sm:items-start sm:gap-1">
        <CalendarDays className="size-4 text-primary sm:hidden" aria-hidden="true" />
        <span className="font-medium text-muted-foreground">
          Selected date
        </span>
        <span className="font-semibold">
          {value ? formatFriendlyDate(value) : "No date selected yet"}
        </span>
      </div>
    </div>
  )
}
