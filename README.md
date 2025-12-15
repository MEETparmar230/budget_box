# BudgetBox — Local-first Offline Personal Budgeting App (Starter)


This repo is a starter scaffold for the BudgetBox assignment: a local-first budgeting app that works offline, auto-saves every keystroke, and syncs when online.


## Features included in this starter
- Next.js 15 App Router (frontend + API in one app)
- TypeScript, React 18
- Zustand for state management
- localForage (IndexedDB) persistence via Zustand persist
- Tailwind CSS
- shadcn/ui ready (basic setup placeholder — see instructions)
- Simple REST endpoints (`/api/auth/login`, `/api/budget/sync`, `/api/budget/latest`)
- Demo login seed required: `hire-me@anshumat.org` / `HireMe@2025!`


## Quick start (local)
1. Clone and install:


```bash
git clone <repo>
cd budget_box
pnpm install
```

2. Create .env.local and set your Postgres URL:


```bash
DATABASE_URL=postgres://user:pass@host:5432/dbname
```

3. Run DB migrations / schema (run the SQL below in psql):


```bash
CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMP DEFAULT now());
CREATE TABLE IF NOT EXISTS budgets (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, month_year TEXT NOT NULL, data JSONB NOT NULL, updated_at TIMESTAMP DEFAULT now());
ALTER TABLE budgets ADD CONSTRAINT IF NOT EXISTS uniq_user_month UNIQUE (user_id, month_year);
```


4. Seed demo user (generate bcrypt hash for HireMe@2025!):


```bash
import bcrypt from 'bcrypt';
const h = await bcrypt.hash('HireMe@2025!', 10); console.log(h);
```


5. Run the app:


```bash
pnpm run dev
```

Open http://localhost:3000


---


## How to test offline behavior

1. Open the app and sign in with demo credentials.

2. Open DevTools → Application → IndexedDB to view budgetbox-storage (LocalForage).

3. Fill the budget form — every keystroke is persisted locally.

4. Turn off network (DevTools → Network → Offline) and continue editing — data persists.

5. Reconnect and click Sync to push local data to the server.


---


## How the sync works

- Local budget objects include an updatedAt ISO timestamp.

- When syncing we POST /api/budget/sync which upserts into Postgres per (user_id, month_year).

- GET /api/budget/latest fetches the latest saved server version.

- Conflict resolution: Last-Write-Wins based on updatedAt.


---


