# 🚀 Project Love Rocky

> A retro mission-control dashboard for U.S. space launches, live orbital tracking, aerospace news, and industry jobs — built with Next.js 15 and a pixel-art UI.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛰️ **Live Launch Board** | Real-time U.S. launch schedule pulled from Launch Library 2, filtered to every American launch site |
| ⏱️ **Live Countdown** | Ticking T-minus countdowns on every mission card, updated every second client-side |
| 📡 **Mission Tracker** | Interactive orbital HUD with replay scrubber, telemetry readouts (altitude, speed, downrange), and Earth/Solar view toggle |
| 📰 **News Feed** | Aggregated RSS headlines from NASA, JPL, SpaceNews, NASASpaceflight, Ars Technica, and Space.com |
| 💼 **Jobs Board** | Live aerospace job listings pulled from public Greenhouse and Lever boards across Rocket Lab, Axiom Space, Relativity Space, Firefly, and more |
| 🏢 **Company Pages** | Per-company pages combining launches, jobs, and news mentions |

---

## 🖥️ Pages

```
/             → Mission control home — featured launch countdown + news + jobs
/launches     → Full U.S. launch board (upcoming + recent, filterable)
/launches/[id]→ Individual launch detail
/tracker      → Interactive orbital tracker with live mission context
/news         → Full aggregated news feed with search
/jobs         → Aerospace job listings with search/filter
/companies/[slug] → Per-company hub
```

---

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** — App Router, server components, API routes
- **[React 19](https://react.dev/)** — UI with client components for live countdowns and tracker
- **[TypeScript](https://www.typescriptlang.org/)** — Full type safety
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Zod](https://zod.dev/)** — Runtime schema validation on all API responses
- **[Launch Library 2](https://thespacedevs.com/llapi)** — Live launch data
- **Greenhouse + Lever APIs** — Live job board data
- **RSS/Atom feeds** — Live news aggregation

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/project-love-rocky.git
cd project-love-rocky
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and configure:

```env
# Use the dev endpoint during development (separate rate limit pool)
LAUNCH_LIBRARY_API_BASE=https://lldev.thespacedevs.com/2.3.0

# Optional: add your free API key from https://ll.thespacedevs.com/
# for higher rate limits in production
LAUNCH_LIBRARY_API_KEY=

NEXT_PUBLIC_SITE_NAME=Project Love Rocky
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 API Keys

| Service | Rate limit (no key) | Get a key |
|---|---|---|
| Launch Library 2 | 15 req/hour | [ll.thespacedevs.com](https://ll.thespacedevs.com/) — free tier available |
| Greenhouse Jobs | No key needed | Public board API |
| Lever Jobs | No key needed | Public board API |
| News RSS | No key needed | Public feeds |

> **Tip:** During development use `https://lldev.thespacedevs.com/2.3.0` as the API base — it's a dedicated dev endpoint with a separate rate limit.

---

## ⚙️ Configuration

### Custom news feeds

Add or swap RSS feeds via `NEWS_FEEDS_JSON` in your `.env.local`:

```json
[
  { "label": "NASA",            "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss", "category": "Agency"   },
  { "label": "SpaceNews",       "url": "https://spacenews.com/feed/",                    "category": "Industry" },
  { "label": "NASASpaceflight", "url": "https://www.nasaspaceflight.com/feed/",           "category": "Launch"   }
]
```

### Custom job boards

Add companies via `JOB_SOURCES_JSON` in your `.env.local` (supports Greenhouse and Lever):

```json
[
  { "company": "Rocket Lab",       "type": "greenhouse", "token": "rocketlab"       },
  { "company": "Axiom Space",      "type": "greenhouse", "token": "axiomspace"      },
  { "company": "Firefly Aerospace","type": "lever",      "token": "fireflyaerospace"}
]
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/              # API route handlers (launches, news, jobs, tracker)
│   ├── launches/         # Launch board + detail pages
│   ├── tracker/          # Interactive orbital tracker
│   ├── news/             # News aggregation page
│   ├── jobs/             # Jobs listing page
│   ├── companies/[slug]/ # Per-company hub
│   └── page.tsx          # Home / mission control dashboard
├── components/
│   ├── countdown-display.tsx  # Live ticking countdown (client component)
│   ├── launch-card.tsx        # Mission card with countdown
│   ├── tracker-console.tsx    # Interactive orbital HUD
│   ├── pixel-ui.tsx           # Design system (PixelPanel, PixelButton, StatusLight)
│   └── app-shell.tsx          # Site navigation
└── lib/
    ├── launches.ts       # Launch Library 2 integration
    ├── jobs.ts           # Greenhouse + Lever job board adapters
    ├── news.ts           # RSS/Atom feed parser
    ├── tracker.ts        # Mission telemetry model
    ├── demo-data.ts      # Fallback data when API is unavailable
    └── types.ts          # Shared TypeScript types
```

---

## 🗺️ Roadmap

- [ ] Canvas/SVG orbital renderer with real TLE data
- [ ] Persistent bookmarks and launch alerts via Supabase
- [ ] Push notifications for T-minus countdowns
- [ ] Company admin config (per-company accent colors, feeds, boards)
- [ ] Full-text search across launches, news, and jobs

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
