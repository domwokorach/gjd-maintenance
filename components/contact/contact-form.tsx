"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
import { FormField } from "@/components/shared/form-field"
import { FormSubmitButton } from "@/components/shared/form-submit-button"
import { services } from "@/config/services"
import { contactSchema, type ContactFormInput } from "@/validations/contact-schema"
import { submitContact } from "@/actions/contact-actions"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
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

  const onSubmit = handleSubmit((values) => {
    setSubmitError(null)
    startTransition(async () => {
      const result = await submitContact(values)
      if (result.status === "error") {
        setSubmitError(result.message)
        return
      }
      setSubmitted(true)
      reset()
    })
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

      {submitError ? (
        <p className="text-center text-sm font-medium text-destructive lg:text-left">{submitError}</p>
      ) : null}

      <div className="flex justify-center lg:justify-start">
        <FormSubmitButton pending={isSubmitting || isPending}>
          Send Message
        </FormSubmitButton>
      </div>
    </form>
  )
}
