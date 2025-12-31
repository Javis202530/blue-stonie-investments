# Repo-specific Copilot instructions

This file gives AI coding agents the essential, discoverable knowledge needed to be productive in this project.

## Big picture
- Single-process Node.js backend serving static frontend files. Backend entrypoint is inside `backened` and listens on port 5000.
- Routes are mounted with prefixes in [backened/server.js](backened/server.js): `/api/auth`, `/api/invest`, `/api/dashboard`, `/api/admin`.
- Data is persisted with SQLite (`backened/database.db`) — schema created at startup in [backened/database.js](backened/database.js).
- Background job: [backened/cron.js](backened/cron.js) runs a daily profit calculation and updates user balances.

## Key files
- [backened/server.js](backened/server.js) — app bootstrap and route mounting.
- [backened/package.json](backened/package.json) — run scripts and dependencies (run `npm start` inside `backened`).
- [backened/database.js](backened/database.js) — DB init and table definitions (users, investments, withdrawals).
- [backened/cron.js](backened/cron.js) — scheduled job updating balances from `investments`.
- [backened/routes](backened/routes) — API controllers; examine `auth.js`, `investment.js`, `dashboard.js`, `admin.js`, `withdraw.js` for patterns.
- [backened/middleware/auth.js](backened/middleware/auth.js) — currently a TEMP placeholder (permits admin unconditionally); `isAdmin.js` expects `req.user.role`.
- Frontend: `auth.js` (root) calls `http://localhost:5000/api/auth` for register/login.

## Important patterns & surprises
- Authentication is not implemented with JWT yet. `auth.js` (middleware) is a stub that sets `isAdmin = true`. Treat auth changes cautiously.
- DB access uses `sqlite3` callback API; routes often call `db.run`, `db.get`, `db.all` directly. Keep SQL and parameter order consistent.
- Some route files are incomplete/fragile: `backened/routes/withdraw.js` lacks `require`/exports and references `authMiddleware` — check before editing.
- Investment rules are hard-coded in [backened/routes/investment.js](backened/routes/investment.js) (tiered daily profit calculation). Use these exact thresholds if adding features.

## Developer workflows (how to run/debug)
- Start backend from the `backened` folder:

```powershell
cd backened
npm install
npm start
```

- Server listens on port `5000`. Frontend JS expects `http://localhost:5000/api/auth` (see `auth.js`).
- DB file is `backened/database.db` — inspect with any SQLite client. Cron job runs inside the same process (node-cron).

## What the AI should do first when making changes
- Prefer minimal, targeted edits (fix route logic or small bug) rather than broad refactors.
- When changing auth, update `backened/middleware/auth.js`, add JWT handling, and update routes that assume `req.user`.
- When editing DB schema, migrate carefully — export `database.db` and preserve existing columns used by routes (`balance`, `profit`, `daily_profit`).

## Examples (quick references)
- Mount points: see [backened/server.js](backened/server.js).
- Create investment logic/tolerances: see [backened/routes/investment.js](backened/routes/investment.js).
- Daily profit job: see [backened/cron.js](backened/cron.js) — runs `UPDATE users SET balance = balance + ?` per investment.

If any section is unclear or you'd like more detail (tests, CI, or migration steps), tell me which area to expand.
