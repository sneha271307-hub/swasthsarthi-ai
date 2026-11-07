const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const searchRoutes = require("./routes/search");
const schemeRoutes = require("./routes/schemes");
const intentRoutes = require("./routes/intent");
const explainRoutes = require("./routes/explain");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
           "http://localhost:5174",
  })
);
app.use(express.json());

app.use("/api/search", searchRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/intent", intentRoutes);
app.use("/api/explain", explainRoutes);

// Connect MongoDB
connectDB();

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SwasthSarthi API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});