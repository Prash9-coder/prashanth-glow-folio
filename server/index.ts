import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import { connectDB } from "./db";

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
      if (!origin || allowedOrigins.includes(origin)) {
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

// EXPRESS 5 SAFE OPTIONS (REGEX, NO WILDCARDS)
app.options(/^\/api\//, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  res.sendStatus(200);
});

(async () => {
  try {
    await connectDB();
    console.log("REGISTER ROUTES CALLED");

    registerRoutes(app);

    // API Fallback (NO WILDCARD)
    app.use(/^\/api\//, (req, res) => {
      return res.status(404).json({ error: "API route not found" });
    });

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
