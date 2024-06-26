// server/server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = require("./Routes/Router");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection 
mongoose
  .connect("mongodb://localhost:27017/bookshell", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routers
app.use("/auth", router);
app.use("/signin", router);
app.use("/admin", router);
app.use("/user", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5001, () => {
  console.log(`Server running on port 5001`);
});