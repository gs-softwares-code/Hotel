# AURA GLOBAL HOSPITALITY CONGLOMERATE
## Enterprise Edge-Native Architecture Manual & Runbook

### 1. Architectural Philosophy & Zero-SaaS Directives
The Aura codebase is built with zero external dependencies (no Supabase, Firebase, Sanity, Contentful, Auth0, or Clerk). It operates natively on Cloudflare Pages/Workers or Vercel Edge with zero code alterations.

- **Frontend & App Engine:** Next.js 14 App Router, React Server Components (RSC), Server Actions.
- **Styling & Design System:** Tailwind CSS with Corporate Luxury palette (Deep Navy `#0b1426`, Warm Gold `#cf9e38`).
- **Database & ORM:** Drizzle ORM configured for Cloudflare D1 (SQLite at the edge) and Vercel/Hyperdrive Postgres.
- **Headless CMS:** Self-contained role-based CMS inside `/(admin)/cms` with direct DB operations.
- **Edge Storage:** Native R2 / Vercel Blob file streaming (`/src/lib/storage.ts`).
- **Edge KV & Flags:** `/src/lib/flags.ts` and `/src/lib/cache.ts`.
- **Authentication:** Lucia Auth with Drizzle adapter and Web Crypto PBKDF2 hashing (`/src/lib/crypto.ts`).
- **Internationalization:** `next-intl` edge routing (`en`, `fr`, `zh`).

---

### 2. A.E.G.I.S. Routing Architecture
- **A (Authority & Governance):**
  - `/investors`: SEC regulatory dispatches, XBRL data, live mock ticker (`$AURA`).
  - `/esg`: Net-Zero environmental audits, renewable microgrid indices.
  - `/newsroom`: Official executive releases and corporate disclosures.
- **E (Enterprise Offerings):**
  - `/brands/[slug]`: Ultra-luxury brand pillars (`aura-reserve`, `aura-regency`, `aura-horizon`).
  - `/loyalty/dashboard`: Aura Privilege Ambassador member lounge.
  - `/b2b/portal`: IATA/CLIA/Virtuoso travel agent reservation & commission gateway.
- **G (Global Reach):**
  - `/destinations/[region]/[country]`: Strict query filtering to display only `PUBLISHED` sanctuaries.
  - `/careers`: Executive talent acquisition.
- **I / S (S.C.A.L.E. Custom CMS):**
  - `/cms/login`: Staff authentication via Lucia Auth.
  - `/cms/dashboard`: Executive KPI portfolio control center.
  - `/cms/properties`: Live inventory table, status toggle (`DRAFT` / `PUBLISHED`), and direct R2 image upload.
  - `/cms/content`: Press releases and regulatory dispatches with instant Next.js edge ISR purge (`revalidatePath`).

---

### 3. Database Migration Runbook

#### Cloudflare D1 (Edge Production)
1. **Create the D1 database instance:**
   ```bash
   wrangler d1 create aura-production-db
   ```
2. **Apply migrations locally:**
   ```bash
   npx wrangler d1 execute aura-production-db --local --file=./src/db/migrations/0000_chemical_warhawk.sql
   ```
3. **Deploy migrations to the Global Edge:**
   ```bash
   npx wrangler d1 execute aura-production-db --remote --file=./src/db/migrations/0000_chemical_warhawk.sql
   ```

#### Vercel / Postgres
1. **Set environment variable:**
   `DATABASE_URL="postgres://username:password@ep-host.region.pooler.postgres.vercel-storage.com/neondb"`
2. **Execute Drizzle Migration:**
   ```bash
   npm run db:migrate
   ```

---

### 4. Production Build Verification
Build status verified cleanly:
- 16 distinct routes compiled and traced (`/[locale]`, `/destinations`, `/investors`, `/esg`, `/newsroom`, `/loyalty`, `/b2b`, `/cms/*`).
- Next.js dynamic edge middleware (`src/middleware.ts`) handling sub-path i18n routing and RBAC session intercepts.
- Clean compilation output with zero fatal TypeScript or build errors.

