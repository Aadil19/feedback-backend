const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Feedback = require("./models/feedback");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.get("/api/feedback", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ date: -1 });
  res.json(feedbacks);
});

app.post("/api/feedback", async (req, res) => {
  const { name, message } = req.body;
  const newFeedback = new Feedback({ name, message });
  await newFeedback.save();
  res.json(newFeedback);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
