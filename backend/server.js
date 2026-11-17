const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const searchRoutes = require("./routes/search");
const schemeRoutes = require("./routes/schemes");
const intentRoutes = require("./routes/intent");
const explainRoutes = require("./routes/explain");

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.FRONTEND_URLS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SwasthSarthi API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// ===============================
// API ROUTES
// ===============================

app.use("/api/search", searchRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/intent", intentRoutes);
app.use("/api/explain", explainRoutes);

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message.startsWith("CORS blocked")) {
    return res.status(403).json({
      success: false,
      message: "CORS Error: Origin not allowed",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB first
    await connectDB();

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();