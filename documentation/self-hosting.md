# Self-Hosting (Docker Compose)

This project is designed to be self-hostable with a single Docker Compose command.

## Prereqs

- Docker Desktop or Docker Engine + Compose v2
- An OpenRouter API key (required for AI scoring and summaries)
- RXResume credentials (only if you want PDF exports)

## 1) Clone and set up environment

```bash
cp .env.example .env
```

Open `.env` and set at least:
- `OPENROUTER_API_KEY`

Optional but commonly used:
- `RXRESUME_EMAIL`, `RXRESUME_PASSWORD` (for CV PDF generation)
- `UKVISAJOBS_EMAIL`, `UKVISAJOBS_PASSWORD` (if you want to scrape UKVisaJobs)
- `BASIC_AUTH_USER`, `BASIC_AUTH_PASSWORD` (read-only public, auth required for writes)

## 2) Provide a base resume JSON

The container mounts a base resume JSON at `resume-generator/base.json`.

- Create or copy your exported RXResume JSON to:
  - `resume-generator/base.json`

If you do not plan to generate PDFs, you can still provide a minimal JSON file to satisfy the mount.

## 3) Start the stack

```bash
docker compose up -d --build
```

This will build a single container that runs the API, UI, scrapers, and resume generator.

## 4) Access the app

- Dashboard: http://localhost:3005
- API: http://localhost:3005/api
- Health: http://localhost:3005/health

## Persistent data

`./data` is bind-mounted into the container. It stores:
- SQLite DB: `data/jobs.db`
- Generated PDFs: `data/pdfs/`

## Common issues

- First build is slow: Playwright + Camoufox download Firefox during the image build.
- Scraping can be blocked by target sites (LinkedIn/Indeed/UKVisa). Retry or adjust sources.
- Missing `resume-generator/base.json` will break PDF generation (and the mount).

## Updating

```bash
git pull
docker compose up -d --build
```
