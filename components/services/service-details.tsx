import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconBox } from "@/components/shared/icon-box"
import type { Service } from "@/types/service"

interface ServiceDetailsProps {
  service: Service
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <Card id={service.slug} className="scroll-mt-24 rounded-xl border shadow-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <IconBox icon={service.icon} />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{service.name}</h2>
            <p className="max-w-2xl text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>
        <Button
          render={<Link href={`/book-service?service=${service.slug}`} />}
          nativeButton={false}
          size="lg"
          className="w-full shrink-0 rounded-[5px] lg:w-auto"
        >
          {service.bookCta}
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {service.tasks.map((task) => (
            <li
              key={task.label}
              className="flex items-start gap-2 text-sm text-foreground/90"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              {task.label}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
