"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FormField } from "@/components/form-field"
import { ServiceSelector } from "@/components/booking/service-selector"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { TimeSelector } from "@/components/booking/time-selector"
import { BookingSummary } from "@/components/booking/booking-summary"
import { getServiceBySlug } from "@/lib/services-data"
import { isValidUkMobile } from "@/lib/validation"
import type { ServiceSlug } from "@/lib/types"

const customerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .refine(isValidUkMobile, "Enter a valid UK mobile number"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  address: z.string().trim().optional(),
  postcode: z.string().trim().optional(),
  details: z.string().trim().optional(),
})

type CustomerFormValues = z.infer<typeof customerSchema>

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
  const [confirmedBooking, setConfirmedBooking] = useState<{
    serviceName: string
    date: string
    time: string
    customerName: string
  } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const service = serviceSlug ? getServiceBySlug(serviceSlug) ?? null : null

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
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

  const onSubmit = handleSubmit((values) => {
    if (!serviceSlug || !service || !date || !time) {
      setScheduleError(
        "Please choose a service, date and time before confirming."
      )
      return
    }
    setScheduleError(null)
    setConfirmedBooking({
      serviceName: service.name,
      date: date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time,
      customerName: `${values.firstName} ${values.lastName}`,
    })
    setDialogOpen(true)
    reset()
    setServiceSlug(null)
    setDate(undefined)
    setTime(null)
  })

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10"
      >
        <div className="flex flex-col gap-10 lg:col-span-2">
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                id="firstName"
                label="First Name"
                required
                error={errors.firstName?.message}
              >
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
              </FormField>

              <FormField
                id="lastName"
                label="Last Name"
                required
                error={errors.lastName?.message}
              >
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
              </FormField>

              <FormField
                id="mobileNumber"
                label="Mobile Number"
                required
                error={errors.mobileNumber?.message}
              >
                <Input
                  id="mobileNumber"
                  type="tel"
                  autoComplete="tel"
                  placeholder="07700 900123"
                  aria-invalid={!!errors.mobileNumber}
                  {...register("mobileNumber")}
                />
              </FormField>

              <FormField
                id="email"
                label="Email Address"
                required
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </FormField>

              <FormField id="address" label="Address" error={errors.address?.message}>
                <Input id="address" autoComplete="street-address" {...register("address")} />
              </FormField>

              <FormField id="postcode" label="Postcode" error={errors.postcode?.message}>
                <Input id="postcode" autoComplete="postal-code" {...register("postcode")} />
              </FormField>

              <FormField
                id="details"
                label="Additional Details / Description of Work"
                className="sm:col-span-2"
                error={errors.details?.message}
              >
                <Textarea
                  id="details"
                  rows={4}
                  placeholder="Let us know more about the job..."
                  {...register("details")}
                />
              </FormField>
            </div>
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
            disabled={isSubmitting}
            className="w-full rounded-full text-base font-semibold"
          >
            Confirm Booking
          </Button>
        </div>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <CircleCheck className="size-6 text-primary" aria-hidden="true" />
            </div>
            <DialogTitle>Booking Request Received</DialogTitle>
            <DialogDescription>
              Thanks{confirmedBooking ? `, ${confirmedBooking.customerName}` : ""}.
              GJDS Maintenance will review your request and confirm your
              appointment shortly.
            </DialogDescription>
          </DialogHeader>
          {confirmedBooking ? (
            <dl className="flex flex-col gap-2 rounded-lg border bg-secondary/40 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Service</dt>
                <dd className="font-medium">{confirmedBooking.serviceName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-medium">{confirmedBooking.date}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Time</dt>
                <dd className="font-medium">{confirmedBooking.time}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{confirmedBooking.customerName}</dd>
              </div>
            </dl>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
