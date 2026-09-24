export function isValidUkMobile(value: string): boolean {
  const digitsOnly = value.replace(/[\s-]/g, "")
  return /^(\+44\d{10}|0\d{10})$/.test(digitsOnly)
}
