import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/shared/form-field"
import type { CustomerDetailsInput } from "@/validations/booking-schema"

interface CustomerDetailsProps {
  register: UseFormRegister<CustomerDetailsInput>
  errors: FieldErrors<CustomerDetailsInput>
}

export function CustomerDetails({ register, errors }: CustomerDetailsProps) {
  return (
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
  )
}
