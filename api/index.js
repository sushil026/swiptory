const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const updateRoutes = require("./routes/updateRoutes");
require("dotenv").config();

const app = express();
mongoose.set("strictQuery", true);

app.use(
  cors({
    credentials: true,
    origin: "https://swiptory-jade.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization", "other-header"],
  })
);
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

app.get("/health", async (req, res) => {
  res.status(200).json("Server is up and running");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", authRoutes);
app.use("/api", storyRoutes);
app.use("/api/update", updateRoutes);
