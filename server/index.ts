import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { connectDB } from "./db";

const app = express();

// ----------------------------------
// 🟢 BODY PARSER (MUST BE FIRST)
// ----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------------
// 🟢 ALLOWED FRONTEND ORIGINS
// ----------------------------------
const allowedOrigins = [
  "https://prashanth-port-folio.vercel.app", // production
  "http://localhost:5173",                   // dev
  "http://localhost:3000"
];

// ----------------------------------
// 🟢 FIXED CORS MIDDLEWARE
// ----------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow tools like Postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED ORIGIN:", origin);
      return callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

// 🟢 Allow preflight OPTIONS requests
app.options("/api/*", cors());

// ----------------------------------
// 🟢 START SERVER
// ----------------------------------
(async () => {
  try {
    await connectDB();
    console.log("REGISTER ROUTES CALLED");

    // Register API routes
    registerRoutes(app);

    // API fallback
    app.use("/api/*", (req, res) => {
      return res.status(404).json({ error: "API route not found" });
    });

    // ----------------------------------
    // 🟢 VITE MUST BE LAST — DEBUG FIX
    // ----------------------------------
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
