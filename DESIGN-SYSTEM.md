# Design System

Reference for the visual language already in use across the GJDS Maintenance site. Update this file as the design evolves — it should describe what's actually in `app/globals.css` and `components/ui/`, not an aspirational system.

## Color tokens

Defined as CSS variables in `app/globals.css` (`:root` for light, `.dark` for dark mode), consumed via Tailwind's `@theme inline` mapping:

- `background` / `foreground` — page background and default text
- `primary` / `primary-foreground` — brand color, used for CTAs and key actions
- `secondary` / `secondary-foreground` — muted sections (e.g. hero backgrounds, footer)
- `accent` / `accent-foreground` — icon boxes, selected states, hover backgrounds
- `muted` / `muted-foreground` — secondary text and subtle backgrounds
- `destructive` — form errors
- `card`, `popover`, `border`, `input`, `ring` — component surfaces and focus states

All colors are defined in OKLCH. Never hardcode hex values in components — use the Tailwind color classes (`bg-primary`, `text-muted-foreground`, etc).

## Radius scale

`--radius` (0.75rem) is the base; `--radius-sm` through `--radius-4xl` scale from it. Use the Tailwind `rounded-*` utilities that map to these (`rounded-lg`, `rounded-xl`, `rounded-full` for pills/buttons).

## Typography

- Font: Geist Sans (`--font-geist-sans`), Geist Mono for code/mono contexts.
- Headings use `font-bold tracking-tight`, with `text-balance` on hero/section titles to avoid ragged wraps.
- Body copy defaults to `text-muted-foreground` at `text-base`/`text-lg` for supporting text.

## Layout conventions

- Page width: `Container` (`components/layout/container.tsx`) applies `mx-auto max-w-(--breakpoint-xl) px-4 sm:px-6 lg:px-8`.
- Section spacing: `Section` (`components/shared/section.tsx`) wraps `Container` with `py-14 lg:py-20`, plus `variant="muted"` and `border` props for banner-style sections.
- Cards: `rounded-xl border shadow-sm`, hover states add `hover:shadow-md`.

## Component conventions

- Icon-in-a-box pattern (service cards, "why choose us", summaries, contact details) is centralized in `components/shared/icon-box.tsx` — don't recreate the `flex size-* items-center justify-center rounded-lg bg-accent text-accent-foreground` pattern inline.
- Primary CTA buttons: `rounded-full text-base font-semibold`, full width on mobile (`w-full sm:w-auto`) — see `components/shared/form-submit-button.tsx` for the form-submit variant.
- shadcn/ui primitives (`components/ui/`) stay generic — no business logic or copy baked in.

## Motion

Reusable keyframes live in `styles/animations.css`, imported into `app/globals.css`. Keep animations subtle (short duration, small translate/opacity) and prefer Tailwind's built-in transition utilities for simple hover/focus states.
