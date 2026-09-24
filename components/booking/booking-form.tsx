"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { getServiceBySlug } from "@/config/services"
import { Button } from "@/components/ui/button"
import { ServiceSelector } from "@/components/booking/service-selector"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { TimeSelector } from "@/components/booking/time-selector"
import { CustomerDetails } from "@/components/booking/customer-details"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { BookingSteps } from "@/components/booking/booking-steps"
import { useBookingProgress } from "@/hooks/use-booking"
import { buildBookingSummary, type BookingSummaryView } from "@/lib/booking"
import { submitBooking } from "@/actions/booking-actions"
import {
  customerDetailsSchema,
  type CustomerDetailsInput,
} from "@/validations/booking-schema"
import type { ServiceSlug } from "@/types/service"

interface BookingFormProps {
  initialServiceSlug: ServiceSlug | null
}

export function BookingForm({ initialServiceSlug }: BookingFormProps) {
  const [serviceSlug, setServiceSlug] = useState<ServiceSlug | null>(
    initialServiceSlug
  )
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | null>(null)
  const [scheduleError, setScheduleError] = useState<string | null>(null)
  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingSummaryView | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const service = serviceSlug ? getServiceBySlug(serviceSlug) ?? null : null
  const currentStep = useBookingProgress({ serviceSlug, date, time })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerDetailsInput>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      address: "",
      postcode: "",
      details: "",
    },
  })

  const firstName = useWatch({ control, name: "firstName" })
  const lastName = useWatch({ control, name: "lastName" })

  const onSubmit = handleSubmit((customer) => {
    if (!serviceSlug || !service || !date || !time) {
      setScheduleError(
        "Please choose a service, date and time before confirming."
      )
      return
    }
    setScheduleError(null)

    startTransition(async () => {
      const result = await submitBooking({
        service: serviceSlug,
        date,
        time,
        ...customer,
      })

      if (result.status === "error") {
        setScheduleError(result.message)
        return
      }

      setConfirmedBooking(
        buildBookingSummary({ service: serviceSlug, date, time, customer })
      )
      setDialogOpen(true)
      reset()
      setServiceSlug(null)
      setDate(undefined)
      setTime(null)
    })
  })

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10"
      >
        <div className="flex flex-col gap-10 lg:col-span-2">
          <BookingSteps currentStep={currentStep} />

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">1. Choose Service</h2>
            <ServiceSelector value={serviceSlug} onChange={setServiceSlug} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">2. Select Date</h2>
            <BookingCalendar value={date} onChange={setDate} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">3. Select Time</h2>
            <TimeSelector value={time} onChange={setTime} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">4. Customer Details</h2>
            <CustomerDetails register={register} errors={errors} />
          </section>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24">
          <BookingSummary
            service={service}
            date={date}
            time={time}
            customerName={`${firstName ?? ""} ${lastName ?? ""}`.trim()}
          />
          {scheduleError ? (
            <p className="text-sm font-medium text-destructive">
              {scheduleError}
            </p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || isPending}
            className="w-full rounded-[5px] text-base font-semibold"
          >
            Confirm Booking
          </Button>
        </div>
      </form>

      <BookingConfirmation
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        booking={confirmedBooking}
      />
    </>
  )
}
