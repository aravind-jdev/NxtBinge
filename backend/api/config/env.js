import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const BASE_URL = process.env.BASE_URL;
export const TMDB_API_KEY = process.env.TMDB_API_KEY;

// 🚨 Safety check (optional but recommended)
if (!BASE_URL || !TMDB_API_KEY) {
  console.error("❌ Missing environment variables. Check your .env file.");
  process.exit(1);
}