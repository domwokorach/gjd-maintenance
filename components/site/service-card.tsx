import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Service } from "@/lib/types"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Card className="group flex h-full flex-col justify-between gap-6 rounded-xl border shadow-sm transition-shadow hover:shadow-md">
      <div>
        <CardHeader className="gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Icon className="size-6" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold">{service.name}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{service.shortDescription}</p>
        </CardContent>
      </div>
      <CardContent className="pt-0">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          View Service
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </CardContent>
    </Card>
  )
}
