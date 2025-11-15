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

// CORS
const FRONTEND = "https://prashanth-port-folio.vercel.app";

app.use(
  cors({
    origin: FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

(async () => {
  try {
    await connectDB();

    console.log("REGISTER ROUTES CALLED");
    registerRoutes(app);

    // SAFEST fallback
    app.use((req, res, next) => {
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
      }
      next();
    });

    // ⚠️⚠️⚠️ VITE MUST BE ATTACHED LAST ⚠️⚠️⚠️
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
