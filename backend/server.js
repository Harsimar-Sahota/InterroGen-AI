// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// DB connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");

// Middleware
const { protect } = require("./middlewares/authMiddleware");

// Controllers
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

// Create Express App
const app = express();

/* --------------------------------------------------
   CORS Middleware
-------------------------------------------------- */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* --------------------------------------------------
   Connect to Database (but NOT during testing)
-------------------------------------------------- */
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

/* --------------------------------------------------
   Body Parser
-------------------------------------------------- */
app.use(express.json());

/* --------------------------------------------------
   API Routes
-------------------------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// AI Routes (protected)
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

/* --------------------------------------------------
   Static Files (uploads)
-------------------------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* --------------------------------------------------
   Export the app (IMPORTANT for testing)
-------------------------------------------------- */
module.exports = app;

/* --------------------------------------------------
   Start Server (only when running normally)
   - Prevents Jest/Supertest double-start problems
-------------------------------------------------- */
if (require.main === module && process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}
