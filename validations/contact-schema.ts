import { z } from "zod"
import { UK_MOBILE_REGEX } from "@/lib/constants"

export const contactSchema = z.object({
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
  serviceRequired: z.string().optional(),
  message: z.string().trim().min(1, "Please add a message"),
})

export type ContactFormInput = z.infer<typeof contactSchema>
