import { CircleCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { BookingSummaryView } from "@/lib/booking"

interface BookingConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: BookingSummaryView | null
}

export function BookingConfirmation({
  open,
  onOpenChange,
  booking,
}: BookingConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <CircleCheck className="size-6 text-primary" aria-hidden="true" />
          </div>
          <DialogTitle>Booking Request Received</DialogTitle>
          <DialogDescription>
            Thanks{booking ? `, ${booking.customerName}` : ""}. GJDS
            Maintenance will review your request and confirm your
            appointment shortly.
          </DialogDescription>
        </DialogHeader>
        {booking ? (
          <dl className="flex flex-col gap-2 rounded-lg border bg-secondary/40 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-medium">{booking.serviceName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Date</dt>
              <dd className="font-medium">{booking.date}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Time</dt>
              <dd className="font-medium">{booking.time}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{booking.customerName}</dd>
            </div>
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
