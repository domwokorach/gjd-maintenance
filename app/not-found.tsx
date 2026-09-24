import Link from "next/link"
import { Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-(--breakpoint-md) flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Wrench className="size-6" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button render={<Link href="/" />} nativeButton={false} className="rounded-full">
        Back to Home
      </Button>
    </div>
  )
}
