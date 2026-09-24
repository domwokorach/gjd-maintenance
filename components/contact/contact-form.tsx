"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormField } from "@/components/form-field"
import { services } from "@/lib/services-data"
import { isValidUkMobile } from "@/lib/validation"

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .refine(isValidUkMobile, "Enter a valid UK mobile number"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  serviceRequired: z.string().optional(),
  message: z.string().trim().min(1, "Please add a message"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      serviceRequired: "",
      message: "",
    },
  })

  const onSubmit = handleSubmit(() => {
    setSubmitted(true)
    reset()
  })

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border bg-accent/40 p-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-background text-primary">
          <CircleCheck className="size-6" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Message sent</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for getting in touch. We&apos;ll get back to you as soon as
          we can.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
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

        <FormField
          id="serviceRequired"
          label="Service Required"
          className="sm:col-span-2"
          error={errors.serviceRequired?.message}
        >
          <Controller
            control={control}
            name="serviceRequired"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="serviceRequired" className="w-full">
                  <SelectValue placeholder="Select a service (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.slug} value={service.slug}>
                      {service.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          id="message"
          label="Message"
          required
          className="sm:col-span-2"
          error={errors.message?.message}
        >
          <Textarea
            id="message"
            rows={5}
            placeholder="Tell us about the job you need help with..."
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </FormField>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full rounded-full text-base font-semibold sm:w-auto"
      >
        Send Message
      </Button>
    </form>
  )
}
