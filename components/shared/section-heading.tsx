import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center"
          ? "items-center text-center"
          : "items-center text-center lg:items-start lg:text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:max-w-none">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto" : "mx-auto lg:mx-0"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
