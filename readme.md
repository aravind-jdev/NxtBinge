# 🎬 NxtBinge (TMDB Movie Discovery)

NxtBinge is a full-stack movie discovery app built with a React frontend and a Node.js + Express backend API that integrates with TMDB.

It lets you:
- Browse **Trending** movies
- **Search** titles
- **Shuffle** into a random movie using TMDB lists for **genre / language / country**

Movie details show cast/crew metadata and a **Watch Trailer** modal powered by TMDB videos.

---

## Tech Stack

### Frontend
- React
- React Router
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Axios
- dotenv
- express-rate-limit

## 🏗 Architecture

The backend uses a layered architecture:

`Routes -> Controllers -> Services -> External API (TMDB)`

Implementation lives under `backend/api` with shared helpers in `backend/api/utils` and middleware in `backend/api/middleware`.

### 📁 Backend Folder Structure


```text
backend/
├── api/
│   ├── server.js
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   └── movieController.js
│   ├── routes/
│   │   └── movies.js
│   ├── services/
│   │   └── tmdbService.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── rateLimiter.js
│   └── utils/
│       ├── asyncHandler.js
│       ├── cache.js
│       ├── formatter.js
│       └── random.js
├── .env
├── package.json
└── vercel.json
```

Implementation highlights:
- In-memory caching with TTL (`backend/api/utils/cache.js`)
- IP rate limiting (`backend/api/middleware/rateLimiter.js`)
- Standardized error handling (`backend/api/middleware/errorMiddleware.js`)
- TMDB response shaping into UI-friendly payloads (`backend/api/utils/formatter.js`)

---

## Live API (used by the current frontend)

The frontend is configured to call:

`https://nxt-binge-backend.vercel.app/api/v1/movies`

For local development, use:

`http://localhost:5000/api/v1/movies`

## Backend API Reference

All endpoints are mounted under `/api/v1/movies`.

### Root (backend)

- `GET /` returns `🎬 NxtBinge API is running...`

### Random movie

- `GET /random` (optional query params: `genre`, `language`, `country`, `year`)

### Genres / Languages / Countries

- `GET /genres`
- `GET /languages`
- `GET /countries`

### Discovery

- `GET /search?query=...`
- `GET /trending`
- `GET /filter` (optional query params: `genre`, `rating`, `year`, `language`, `country`)

### Movie data

- `GET /:id` movie details (formatted for the UI, includes cast/crew)
- `GET /:id/videos` movie videos/trailers (returns TMDB `results` array)
- `GET /:id/similar` similar movies

## Response Shapes (high level)

Different endpoints wrap data differently to match what the frontend currently expects:

### `GET /random`

```json
{
  "success": true,
  "data": {
    "id": 550,
    "title": "Fight Club",
    "poster": "https://image.tmdb.org/t/p/w500/...",
    "rating": 8.4,
    "year": "1999"
  }
}
```

### List endpoints (`/search`, `/trending`, `/filter`, `/:id/similar`)

```json
{
  "success": true,
  "count": 12,
  "data": [
    { "id": 550, "title": "Fight Club", "poster": "...", "rating": 8.4, "year": "1999" }
  ]
}
```

### `GET /:id` (movie details)

Returns the formatted movie object directly (no `success` wrapper):

```json
{
  "id": 550,
  "title": "Fight Club",
  "poster": "https://image.tmdb.org/t/p/w500/...",
  "backdrop": "https://image.tmdb.org/t/p/w1280/...",
  "rating": 8.4,
  "year": "1999",
  "overview": "...",
  "runtime": 139,
  "budget": 63000000,
  "revenue": 100853753,
  "genres": ["Drama"],
  "productionCompanies": ["Fox ..."],
  "cast": [{ "id": 1, "name": "...", "character": "...", "profileImage": "..." }],
  "crew": { "directors": [], "writers": [], "producers": [] }
}
```

### `GET /:id/videos` (trailers)

Returns the TMDB `results` array directly. The frontend selects the first item where `type === "Trailer"` and embeds it via YouTube using `key`.

---

## Setup & Run (Local)

### Backend

Update `backend/.env`:
- `PORT` (default: `5000`)
- `BASE_URL` (default: `https://api.themoviedb.org/3`)
- `TMDB_API_KEY`

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will call your backend using the hardcoded base URL in `frontend/src/api/movieApi.js`.
For local development, set it to `http://localhost:5000/api/v1/movies`.

---

## Deployment Notes

- The backend is configured for Vercel via `backend/vercel.json`.
- The frontend is currently configured to use the deployed backend at `https://nxt-binge-backend.vercel.app/api/v1/movies`.

<!--

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster": "https://image.tmdb.org/t/p/w500/...",
      "rating": 8.4,
      "year": "1999"
    }
  ]
}
⚡ Key Enhancements
🧼 Clean Filter Handling
Only valid query parameters are sent to TMDB
Prevents unnecessary API noise
🧠 Async Error Handling
Centralized error middleware
No repetitive try/catch blocks
⚡ Caching System
In-memory caching for:
Trending movies
Search results
Filter results
Improves performance and reduces API calls
🛡 Rate Limiting
Limits requests per IP
Prevents API abuse
🎯 Response Shaping
Returns clean, frontend-friendly data
Removes unnecessary TMDB fields
🔐 Environment Variables

Create a .env file inside /backend:

PORT=5000
BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_api_key_here
⚙️ Installation & Setup
# Clone the repo
git clone <your-repo-url>

# Navigate to backend
cd backend

# Install dependencies
npm install

# Run development server
npm run dev
🧪 Testing

Use:

Browser
Postman
Thunder Client

Example:

http://localhost:5000/api/v1/movies/random
🩺 Health Check
GET /health

Response:

{
  "status": "OK",
  "uptime": 123.45
}
🚀 Future Enhancements
❤️ Watchlist (Database)
👤 User Authentication
🤖 AI-based Recommendations
⚡ Redis Caching
📊 Analytics & Logging
🎯 Purpose

This project demonstrates:

Clean backend architecture
API integration (TMDB)
Performance optimization (caching)
Security practices (rate limiting)
Production-ready coding patterns
👨‍💻 Author

Dante
Aspiring Game Developer & Backend Builder 🚀

⭐ Final Note

This is not just a project…

It’s a foundation for a scalable movie platform.


---

## 🧠 Loki’s honest take

This README now does 3 things:

- 📣 Explains your project clearly  
- 💼 Looks good to recruiters  
- 🧠 Shows you understand backend architecture  

---

If someone opens your repo now, they won’t think:

> “student project”

They’ll think:

> “this guy knows what he’s doing”

---

When you’re ready…

👉 **frontend** — we bring this to life visually  
👉 **ai** — we make it smart  
👉 **database** — we make it personal  

Your call 🎬 -->