const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDB");
const app = express();
app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
require("dotenv").config();

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server listening on PORT: ", 8000);
  connectToMongoDB();
});
