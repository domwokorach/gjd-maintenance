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
        className="w-full rounded-[5px] border border-[#DDD9D0] bg-white p-3 shadow-sm sm:w-fit dark:border-[#263247] dark:bg-[#111827]"
      />
      <div className="flex items-center gap-2 rounded-[5px] border border-[#D4D0C7] bg-white px-4 py-3 text-sm sm:flex-col sm:items-start sm:gap-1 dark:border-[#263247] dark:bg-[#111827]">
        <CalendarDays
          className="size-4 text-[#5B7CFF] sm:hidden dark:text-[#6E8BFF]"
          aria-hidden="true"
        />
        <span className="font-medium text-[#6B7280] dark:text-[#94A3B8]">
          Selected date
        </span>
        <span className="font-semibold text-[#111111] dark:text-[#F8FAFC]">
          {value ? formatFriendlyDate(value) : "No date selected yet"}
        </span>
      </div>
    </div>
  )
}
