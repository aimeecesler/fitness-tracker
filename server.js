const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// app.get("/api/config", (req, res) => {
//   res.json({
//     success: true,
//   });
// });

app.use(apiRoutes);
app.use(htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
