//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const articles = require("./routes/articles");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use("/articles", articles);

// Connection to database

mongoose.connect("mongodb://localhost:27017/wikidb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
