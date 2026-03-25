# 🎬 NxtBinge – Movie Recommendation Backend

A scalable and production-ready **Node.js + Express backend API** that powers a movie recommendation system using the **TMDB API**.

Built with clean architecture, optimized performance, and real-world backend practices.

---

## 🚀 Features

- 🎲 Random Movie Generator
- 🔍 Search Movies
- 🎭 Filter Movies (genre, rating, year, language)
- 📺 Trending Movies
- 🎬 Movie Details
- 🎞 Movie Trailers

---

## 🧠 Tech Stack

- Node.js
- Express.js
- Axios
- Dotenv
- Express Rate Limit

---

## 🏗 Architecture

This backend follows a **layered architecture**:


Routes → Controllers → Services → External API (TMDB)
↓
Utils


### 📁 Folder Structure


backend/
│
├── controllers/
│ └── movieController.js
│
├── routes/
│ └── movies.js
│
├── services/
│ └── tmdbService.js
│
├── utils/
│ ├── random.js
│ ├── formatter.js
│ ├── cache.js
│ └── asyncHandler.js
│
├── middleware/
│ ├── errorMiddleware.js
│ └── rateLimiter.js
│
├── config/
│ └── env.js
│
├── .env
├── package.json
└── server.js


---

## 🔌 API Base URL


http://localhost:5000/api/v1/movies


---

## 📡 API Endpoints

### 🎲 Random Movie

GET /random


---

### 🔍 Search Movies

GET /search?query=batman


---

### 🎭 Filter Movies

GET /filter?genre=28&rating=7&year=2020&language=en


---

### 📺 Trending Movies

GET /trending


---

### 🎬 Movie Details

GET /:id


---

### 🎞 Movie Trailers

GET /:id/videos


---

## 📦 Sample Response

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

Your call 🎬