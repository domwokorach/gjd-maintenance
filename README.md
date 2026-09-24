This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment configuration

Copy `.env.example` to `.env.local` and fill in the values you have — secrets
are never required in development (booking/contact just log instead of
emailing when `RESEND_API_KEY`/`BOOKING_EMAIL` are unset).

| File | Committed? | Loaded when | Purpose |
| --- | --- | --- | --- |
| `.env.example` | Yes | never (reference only) | Documents every variable the app understands |
| `.env.development` | Yes | `next dev` | Non-secret dev defaults (`localhost` URLs, `LOG_LEVEL=debug`) |
| `.env.production` | Yes | `next build` / `next start` | Non-secret production defaults |
| `.env.staging.example` | Yes | never (reference only) | Values to paste into Vercel's **Preview** environment |
| `.env.local` | No (git-ignored) | always, on top of the above | Your real local secrets |

All validated through [`lib/env.ts`](./lib/env.ts) (Zod). A missing or
invalid required variable throws at startup/build time rather than failing
silently later — see `instrumentation.ts`. Only variables prefixed
`NEXT_PUBLIC_` are readable in the browser; everything else is enforced
server-only via the `server-only` package.

### Vercel

Set variables per-environment in **Project Settings → Environment
Variables**:

- **Development** — matches `.env.local`; only needed if you use `vercel dev`.
- **Preview** — paste `.env.staging.example`'s values here, using staging-only
  credentials (never point a preview deploy at production email/DB/storage).
- **Production** — real production secrets (`RESEND_API_KEY`, `BOOKING_EMAIL`,
  etc). `NEXT_PUBLIC_*` values already default correctly from
  `.env.production`, so only secrets need to be added.

Dashboard-configured variables always take precedence over the committed
`.env.*` files, so it's safe for those files to hold real (non-secret)
production URLs as fallbacks.

### API layer

- `lib/api/config.ts` — client-safe base URL/config (`NEXT_PUBLIC_*` only).
- `lib/api/client.ts` — `apiFetch()`, the shared client for calling this
  app's own `/api/*` routes (timeout + consistent error handling built in).
- `lib/api/server.ts` — `serverFetch()`, for server-only calls to third-party
  services; never import this from a client component.
- `lib/api/response.ts` — `apiSuccess()` / `apiError()`, the consistent
  `{ success, data }` / `{ success: false, error }` shape every route handler
  returns. See `/api/health` for the smallest example.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# gjd-maintenance
