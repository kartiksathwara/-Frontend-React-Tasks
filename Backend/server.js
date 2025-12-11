import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "../Backend/routes/userRoutes.js";
import todoRoutes from "../Backend/routes/todoRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);          
app.use("/api/todos", todoRoutes);    
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});


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
