import { z } from "zod"
import { UK_MOBILE_REGEX } from "@/lib/constants"

export const bookingSchema = z.object({
  service: z.string().trim().min(1, "Please choose a service"),
  date: z.coerce.date({ error: "Please choose a date" }),
  time: z.string().trim().min(1, "Please choose a time"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .refine(
      (value) => UK_MOBILE_REGEX.test(value.replace(/[\s-]/g, "")),
      "Enter a valid UK mobile number"
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address"),
  address: z.string().trim().optional(),
  postcode: z.string().trim().optional(),
  details: z.string().trim().optional(),
})

export type BookingFormInput = z.infer<typeof bookingSchema>

export const customerDetailsSchema = bookingSchema.pick({
  firstName: true,
  lastName: true,
  mobileNumber: true,
  email: true,
  address: true,
  postcode: true,
  details: true,
})

export type CustomerDetailsInput = z.infer<typeof customerDetailsSchema>
