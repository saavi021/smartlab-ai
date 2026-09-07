require("dotenv").config({
    path: __dirname + "/.env",
  });
  
  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  
  const authRoutes = require("./routes/auth");
  const reportRoutes = require("./routes/reports");
  
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  async function connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
  
      console.log("MongoDB connected successfully.");
    } catch (error) {
      console.error("MongoDB connection failed.");
      console.error(error.message);
  
      process.exit(1);
    }
  }
  
  app.get("/", (req, res) => {
    res.json({
      message: "SmartLab AI backend is running!",
    });
  });
  
  app.use("/api/auth", authRoutes);
  app.use("/api/reports", reportRoutes);
  
  const PORT = process.env.PORT || 5001;
  
  async function startServer() {
    await connectDatabase();
  
    app.listen(PORT, "127.0.0.1", () => {
      console.log(
        `Backend running on http://127.0.0.1:${PORT}`
      );
    });
  }
  
  startServer();