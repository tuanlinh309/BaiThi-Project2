# Project 2 — Frontend + Backend + SQLite

Quick starter to run locally.

Requirements
- Node.js 14+

Setup

```bash
npm install
```

Run

```bash
npm start
# or for development with auto-reload (if you installed dev deps):
npm run dev
```

Open http://localhost:3000 in your browser. The app serves `index.html` and provides a small REST API:

- `GET /api/items` — get all items
- `POST /api/items` — create item { title }
- `DELETE /api/items/:id` — delete item

Database
- A SQLite file `data.db` will be created next to the project when the server runs. Add it to `.gitignore`.
