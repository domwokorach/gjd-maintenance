import { useMemo } from "react"
import type { ServiceSlug } from "@/types/service"

export const BOOKING_STEPS = ["Service", "Date", "Time", "Details"] as const

interface UseBookingProgressArgs {
  serviceSlug: ServiceSlug | null
  date: Date | undefined
  time: string | null
}

/** Derives which booking step the customer is currently on, for the step indicator. */
export function useBookingProgress({
  serviceSlug,
  date,
  time,
}: UseBookingProgressArgs): number {
  return useMemo(() => {
    if (!serviceSlug) return 0
    if (!date) return 1
    if (!time) return 2
    return 3
  }, [serviceSlug, date, time])
}
