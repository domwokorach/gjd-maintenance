import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconBox } from "@/components/shared/icon-box"
import { siteConfig } from "@/config/site"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: siteConfig.serviceArea,
  },
]

export function ContactDetails() {
  return (
    <Card className="order-1 h-fit rounded-xl border bg-secondary/40 shadow-sm lg:order-2">
      <CardHeader className="text-center lg:text-left">
        <h3 className="text-lg font-semibold">Contact information</h3>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 lg:items-stretch">
        {contactDetails.map((item) => {
          const content = (
            <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:text-left">
              <IconBox icon={item.icon} size="md" />
              <div className="flex min-w-0 flex-col break-words">
                <span className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            </div>
          )

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              className="rounded-lg -m-1 p-1 hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {content}
            </a>
          ) : (
            <div key={item.label}>{content}</div>
          )
        })}
      </CardContent>
    </Card>
  )
}
