// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import existing user routes
import userRoutes from "../Backend/routes/userRoutes.js";

// import new todo routes
import todoRoutes from "../Backend/routes/todoRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);          // /api/register, /api/login
app.use("/api/todos", todoRoutes);    // /api/todos/...

// Simple health-check route
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.log("Mongo Error:", err));
