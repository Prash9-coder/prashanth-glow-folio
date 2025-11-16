import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { connectDB } from "./db";

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed Frontend URLs
const allowedOrigins = [
  "https://prashanth-port-folio.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ----------------------
// Connect Database
// ----------------------
(async () => {
  try {
    await connectDB();
    console.log("REGISTER ROUTES CALLED");

    registerRoutes(app);

    // API fallback
    app.use("/api/*", (req, res) => {
      res.status(404).json({ error: "API route not found" });
    });

    // Vite (static hosting)
    await setupVite(app);

    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      log(`🔥 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
