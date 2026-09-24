import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { BOOKING_STEPS } from "@/hooks/use-booking"

interface BookingStepsProps {
  currentStep: number
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <ol className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {BOOKING_STEPS.map((label, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep

        return (
          <li key={label} className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                isComplete
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                    ? "border-primary text-primary"
                    : "border-input text-muted-foreground"
              )}
            >
              {isComplete ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
            </span>
            <span
              className={cn(
                "font-medium",
                isCurrent || isComplete ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
