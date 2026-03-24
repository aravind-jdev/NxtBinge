import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter);

// Routes
app.use("/api/v1/movies", movieRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🎬 NxtBinge API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});

import { errorHandler } from "./middleware/errorMiddleware.js";

// after routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});
app.use(errorHandler);