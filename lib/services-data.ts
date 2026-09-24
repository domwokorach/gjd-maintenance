import { Grid2x2, PaintRoller, CookingPot, TreePine } from "lucide-react"
import type { Service } from "@/lib/types"

export const services: Service[] = [
  {
    slug: "tile-maintenance",
    name: "Tile Maintenance",
    shortDescription:
      "Repairs, regrouting and reseals for kitchen, bathroom and floor tiling.",
    description:
      "From a single cracked tile to a full regrout, we keep your tiled surfaces looking sharp and watertight.",
    icon: Grid2x2,
    bookCta: "Book Tile Maintenance",
    tasks: [
      { label: "Replacing damaged tiles" },
      { label: "Loose tile repair" },
      { label: "Regrouting" },
      { label: "Silicone/seal replacement" },
      { label: "Minor wall and floor tile repairs" },
    ],
  },
  {
    slug: "plastering",
    name: "Plastering",
    shortDescription:
      "Small repairs and patching to leave your walls and ceilings smooth and ready to decorate.",
    description:
      "We handle the small plastering jobs that are easy to put off, from hairline cracks to patched-up walls.",
    icon: PaintRoller,
    bookCta: "Book Plastering",
    tasks: [
      { label: "Small plaster repairs" },
      { label: "Cracks and damaged areas" },
      { label: "Wall patching" },
      { label: "Surface preparation" },
      { label: "Minor finishing work" },
    ],
  },
  {
    slug: "kitchen-maintenance",
    name: "Kitchen Maintenance",
    shortDescription:
      "Keeping cupboards, units and worktops working properly and looking their best.",
    description:
      "Sticking doors, loose handles or a worktop that has seen better days — we sort the everyday kitchen niggles.",
    icon: CookingPot,
    bookCta: "Book Kitchen Maintenance",
    tasks: [
      { label: "Kitchen unit adjustments" },
      { label: "Cupboard and cabinet repairs" },
      { label: "Handles and hinges" },
      { label: "Worktop maintenance" },
      { label: "Minor kitchen repairs" },
    ],
  },
  {
    slug: "garden-shed",
    name: "Back Garden & Garden Shed",
    shortDescription:
      "Shed repairs, timber care and general upkeep for your back garden.",
    description:
      "Sheds, fences and timber structures need looking after — we keep your garden safe, sound and tidy.",
    icon: TreePine,
    bookCta: "Book Garden Service",
    tasks: [
      { label: "Garden shed maintenance" },
      { label: "Shed repairs" },
      { label: "Door and hinge adjustments" },
      { label: "Timber maintenance" },
      { label: "Minor garden structures" },
      { label: "General back-garden maintenance" },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
