import type { ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormSubmitButtonProps {
  children: ReactNode
  pending?: boolean
  className?: string
  fullWidthOnMobile?: boolean
}

export function FormSubmitButton({
  children,
  pending = false,
  className,
  fullWidthOnMobile = true,
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className={cn(
        "rounded-[5px] text-base font-semibold",
        fullWidthOnMobile && "w-full sm:w-auto",
        className
      )}
    >
      {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </Button>
  )
}
