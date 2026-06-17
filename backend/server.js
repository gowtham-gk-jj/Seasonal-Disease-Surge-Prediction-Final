const dns = require("dns");

// Fix MongoDB Atlas DNS issues
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ──────────────────────────────────────────────────────────
// Database Connection
// ──────────────────────────────────────────────────────────
connectDB();

// ──────────────────────────────────────────────────────────
// Security Middleware
// ──────────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// ──────────────────────────────────────────────────────────
// Body Parsers
// ──────────────────────────────────────────────────────────
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ──────────────────────────────────────────────────────────
// Logger
// ──────────────────────────────────────────────────────────
app.use(morgan("dev"));

// ──────────────────────────────────────────────────────────
// Rate Limiter
// ──────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

// ──────────────────────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────────────────────

app.use(
  "/api/predictions",
  require("./routes/predictions")
);

app.use(
  "/api/districts",
  require("./routes/districts")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboard")
);

// NM Hackathon APIs

app.use(
  "/api/map-data",
  require("./routes/mapRoutes")
);

app.use(
  "/api/shap",
  require("./routes/shapRoutes")
);

// ✅ Validation Route Fixed
app.use(
  "/api/validation",
  require("./routes/validationRoutes")
);

app.use(
  "/api/data-sources",
  require("./routes/dataSourceRoutes")
);

app.use(
  "/api/alerts",
  require("./routes/alertRoutes")
);

// ──────────────────────────────────────────────────────────
// Root Route
// ──────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project:
      "Disease Surge Prediction System",
    version: "1.0.0",
    status: "Running",
  });
});

// ──────────────────────────────────────────────────────────
// Health Check
// ──────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date(),
  });
});

// ──────────────────────────────────────────────────────────
// 404 Route Handler
// ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ──────────────────────────────────────────────────────────
// Global Error Handler
// ──────────────────────────────────────────────────────────
app.use(errorHandler);

// ──────────────────────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────────────────────
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});

module.exports = app;