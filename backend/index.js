const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDB");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
require("dotenv").config();
const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');
const responseRoutes = require('./routes/response');

// // Auth routes
// const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
app.use('/survey', surveyRoutes);
app.use('/response', responseRoutes);
app.listen(8000, () => {
  console.log("Server listening on PORT: ", 8000);
  connectToMongoDB();
});
