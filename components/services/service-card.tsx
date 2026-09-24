import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconBox } from "@/components/shared/icon-box"
import type { Service } from "@/types/service"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group flex h-full flex-col justify-between gap-6 rounded-xl border shadow-sm transition-shadow hover:shadow-md">
      <div>
        <CardHeader className="justify-items-center gap-4 text-center lg:justify-items-start lg:text-left">
          <IconBox icon={service.icon} />
          <h3 className="text-xl font-semibold">{service.name}</h3>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <p className="max-w-sm text-muted-foreground">{service.shortDescription}</p>
          <ul className="flex w-full flex-col gap-1.5">
            {service.commonJobs.map((job) => (
              <li
                key={job.label}
                className="flex items-start justify-center gap-2 text-sm text-foreground/90 lg:justify-start"
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {job.label}
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardContent className="pt-0">
        <Button
          render={<Link href={`/book-service?service=${service.slug}`} />}
          nativeButton={false}
          className="w-full rounded-[5px]"
        >
          Request a Quote
        </Button>
      </CardContent>
    </Card>
  )
}
