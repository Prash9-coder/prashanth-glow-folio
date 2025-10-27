import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [express] ${message}`);
}

export async function setupVite(app: Express) {
  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      root: path.resolve(process.cwd(), "client"),
      cacheDir: path.resolve(process.cwd(), "node_modules/.vite"),
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "client/src"),
          "@shared": path.resolve(process.cwd(), "shared"),
          "@assets": path.resolve(process.cwd(), "client/public"),
        },
      },
    });

    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      // Only handle GET requests for HTML pages
      if (req.method !== "GET" || req.path.startsWith("/api")) {
        return next();
      }

      const url = req.originalUrl;

      try {
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "client/index.html"),
          "utf-8"
        );

        template = await vite.transformIndexHtml(url, template);

        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    return app;
  } catch (error) {
    log(`Error setting up Vite: ${error}`);
    throw error;
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  app.use((_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
