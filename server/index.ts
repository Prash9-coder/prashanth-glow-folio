import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { setupVite, log } from "./vite.js";
import { connectDB } from "./db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed origins
const allowedOrigins = [
  "https://prashanth-port-folio.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED ORIGIN:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

(async () => {
  try {
    console.log("🚀 Starting server...");
    console.log("📍 Environment:", process.env.NODE_ENV);

    await connectDB();
    console.log("✅ Database connected");

    registerRoutes(app);
    console.log("✅ Routes registered");

    // API 404 handler
    app.use("/api/*", (req, res) => {
      console.log("❌ API route not found:", req.path);
      return res.status(404).json({ error: "API route not found" });
    });

    // ✅ ONLY setup Vite in development
    if (process.env.NODE_ENV !== "production") {
      console.log("🔧 Setting up Vite dev server...");
      await setupVite(app);
      console.log("✅ Vite setup complete");
    } else {
      // Production: Simple health check endpoint
      app.get("/", (req, res) => {
        res.json({
          status: "OK",
          message: "Portfolio API Running",
          timestamp: new Date().toISOString()
        });
      });
    }

    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      log(`🔥 Server running on port ${PORT}`);
      log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      log(`🌐 CORS enabled for: ${allowedOrigins.join(", ")}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();