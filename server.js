const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
require('dotenv').config();

const app = express();

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass:process.env.DB_PASS
})
.then(() => {
  console.log('Victory is mine!');
})
.catch((err) => {
  console.log(err.message)
});

// routes
app.use(require("./routes/api.js"));

app.listen(3000, () => {
  console.log(`App running on port 3000!`);
});