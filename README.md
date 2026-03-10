# I — Your Personal Health OS

Production foundation for a secure, multilingual, RTL-first personal health operating system.

## Tech stack
- Next.js App Router + TypeScript + TailwindCSS
- NextAuth (credentials + Prisma adapter)
- Prisma ORM (SQLite for local development)
- Server Actions for secure write flows

## Project structure
- `app/` routes and layouts (`(auth)` and protected `(app)` areas)
- `features/` domain modules (auth, profile, medications, supplements, routines, metrics, documents, dashboard)
- `lib/` shared infrastructure (`prisma`, `auth`, session guards)
- `prisma/` schema + seed script
- `i18n/` translation utilities and language behavior
- `components/` reusable UI shell components

## Implemented modules
- Authentication: sign up, login, logout, protected routes, session handling
- Onboarding: date of birth, gender, body + lifestyle fields, goals
- Health profile: view/edit core body metrics
- Dashboard: real DB-backed cards (health score logic, reminders, routines, docs, insights)
- Medications: list/add/delete with scheduling fields
- Supplements: list/add/delete with category and goal
- Routines: create routines, add tasks, mark task complete
- Body metrics: log weight and body composition history
- Reminders foundation: schema + dashboard data layer
- Document upload foundation: metadata capture, file type/size validation, private key architecture placeholder

## Environment variables
Copy `.env.example` to `.env`:
- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST`
- `NEXTAUTH_URL`

## Local setup
```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Demo account (after seed):
- `demo@ihealthos.com`
- `demo12345`

## Prisma notes
- Schema lives in `prisma/schema.prisma`
- Use `npm run db:migrate` for migrations
- Use `npm run db:seed` for deterministic demo data

## Next phases
- OAuth providers + MFA
- Private object storage with signed URL issuance endpoint
- Advanced charts and insights engine
- Notifications delivery channels
- Audit logging and security event dashboards

## Merge conflict resolution (GitHub PRs)
If GitHub shows **"This branch has conflicts"**, update your branch locally:

```bash
git fetch origin
git checkout <your-branch>
git merge origin/main
# resolve files
npm run check:conflicts
```

This repository includes a conflict-marker checker:

```bash
npm run check:conflicts
```
