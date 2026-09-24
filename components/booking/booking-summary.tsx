import { CalendarDays, Clock, User, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Service } from "@/lib/types"

interface BookingSummaryProps {
  service: Service | null
  date: Date | undefined
  time: string | null
  customerName?: string
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wrench
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    </div>
  )
}

export function BookingSummary({
  service,
  date,
  time,
  customerName,
}: BookingSummaryProps) {
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">Booking Summary</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <SummaryRow
          icon={Wrench}
          label="Service"
          value={service ? service.name : "Not selected yet"}
        />
        <SummaryRow
          icon={CalendarDays}
          label="Date"
          value={
            date
              ? date.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not selected yet"
          }
        />
        <SummaryRow icon={Clock} label="Time" value={time ?? "Not selected yet"} />
        <SummaryRow
          icon={User}
          label="Customer"
          value={customerName?.trim() ? customerName : "Not entered yet"}
        />
      </CardContent>
    </Card>
  )
}
