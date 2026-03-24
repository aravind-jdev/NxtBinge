# 🎬 Movie Recommendation Backend – Project Reference

## 📌 Project Overview

This project is a **Node.js + Express backend API** that acts as a middleware between a frontend application and the TMDB (The Movie Database) API.

Its purpose is to:

* Fetch movie data from TMDB
* Process/filter/randomize results
* Serve clean responses to the frontend
* Hide the TMDB API key securely

---

## 🧠 Core Features

1. 🎲 Random Movie Generator
2. 🎭 Filter Movies (genre, rating, year, language)
3. 🔍 Search Movies
4. 📺 Trending Movies
5. 🎬 Movie Details
6. 🎞 Movie Trailers

---

## 🏗 Architecture

The backend follows a **layered architecture**:

* **Routes** → define endpoints
* **Controllers** → handle request/response logic
* **Services** → handle external API calls (TMDB)
* **Utils** → helper functions (random, formatting)
* **Config** → environment setup

---

## 📁 Folder Structure

movie-app/
│
├── backend/
│   ├── controllers/
│   │   └── movieController.js
│   │
│   ├── routes/
│   │   └── movies.js
│   │
│   ├── services/
│   │   └── tmdbService.js
│   │
│   ├── utils/
│   │   └── random.js
│   │
│   ├── config/
│   │   └── env.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── MovieCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js (if using Vite)
│
├── .gitignore
├── package.json   ← (optional root config)
└── README.md
---

## 🔌 API Endpoints

Base URL:
http://localhost:5000/api/movies

Endpoints:

* GET /random → Get random movie

* GET /filter → Filter movies
  Example:
  /filter?genre=28&rating=7&year=2020

* GET /search → Search movies
  /search?query=batman

* GET /trending → Trending movies

* GET /:id → Movie details

* GET /:id/videos → Movie trailers

---

## 🌐 TMDB Integration

Base URL:
https://api.themoviedb.org/3

Key points:

* Uses `/discover/movie` for filtering/random
* Uses `/search/movie` for search
* Uses `/trending/movie/week` for trending
* Uses `/movie/{id}` for details
* Uses `/movie/{id}/videos` for trailers

---

## 🔐 Environment Variables (.env)

PORT=5000
BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=YOUR_API_KEY

---

## ⚙️ Key Logic

### Random Movie

* Generate random page (1–500)
* Fetch results
* Pick random movie from results

### Filtering

* Pass query params dynamically
* Remove undefined values before API call

---

## 🚨 Common Issues & Fixes

1. BASE_URL undefined
   → Ensure `.env` is loaded correctly

2. Invalid URL error
   → BASE_URL missing or incorrect

3. TMDB Error
   → Check API key or request params

4. No results
   → Filters too strict

---

## 🎯 Purpose of This Backend

* Secure API key handling
* Provide structured movie data
* Enable frontend features like:

  * Netflix-style UI
  * Letterboxd-style exploration
  * Random discovery

---

## 🚀 Future Enhancements

* Redis caching
* Rate limiting
* User authentication
* Watchlist storage (DB)
* AI-based recommendations

---

## 🧠 Summary

This project is a **scalable movie API backend** that:

* Integrates with a real-world API (TMDB)
* Uses clean architecture
* Supports multiple features for a frontend movie app

---

## 📌 How to Use This Reference

Paste this in a new chat and say:

“Continue this project from here”

Then specify:

* which file to build
* or what feature to add

---
