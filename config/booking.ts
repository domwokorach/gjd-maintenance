import { timeSlots } from "@/data/time-slots"

export const bookingConfig = {
  /** Earliest bookable day, relative to today (0 = can book today). */
  leadTimeDays: 0,
  timeSlots,
}
