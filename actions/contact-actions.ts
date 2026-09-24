"use server"

import { contactSchema, type ContactFormInput } from "@/validations/contact-schema"
import { sendContactEmail } from "@/lib/email"

export type ContactActionState =
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormInput, string>> }

export async function submitContact(
  input: ContactFormInput
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse(input)

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormInput
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    }
  }

  try {
    await sendContactEmail(parsed.data)
  } catch {
    return {
      status: "error",
      message: "We couldn't send your message right now. Please try again later.",
    }
  }

  return { status: "success" }
}
