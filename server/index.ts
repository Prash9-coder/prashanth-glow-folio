import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { connectDB } from "./db";

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------------------
// ✅ ALLOWED ORIGINS
// ------------------------------
const allowedOrigins = [
  "https://prashanth-port-folio.vercel.app", // Production frontend
  "http://localhost:5173",                   // Local development
  "http://localhost:3000",
];

// ------------------------------
// ✅ CORS FIXED COMPLETELY
// ------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ BLOCKED ORIGIN:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

// 🟢 Preflight OPTIONS support (Fixes CORS errors)
app.options("*", cors());

// ------------------------------
// Start Server
// ------------------------------
(async () => {
  try {
    await connectDB();

    console.log("REGISTER ROUTES CALLED");
    registerRoutes(app);

    // API fallback
    app.use((req, res, next) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
      }
      next();
    });

    // Vite must be attached last
    await setupVite(app);

    const PORT = Number(process.env.PORT) || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      log(`🔥 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
