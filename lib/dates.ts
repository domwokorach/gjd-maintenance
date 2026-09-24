export function formatFriendlyDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function startOfToday(): Date {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export function isPastDate(date: Date): boolean {
  return date < startOfToday()
}
