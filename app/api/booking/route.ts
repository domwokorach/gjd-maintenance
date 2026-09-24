import { NextResponse } from "next/server"
import { submitBooking } from "@/actions/booking-actions"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ status: "error", message: "Invalid request body." }, { status: 400 })
  }

  const result = await submitBooking(body)

  return NextResponse.json(result, {
    status: result.status === "success" ? 200 : 400,
  })
}
