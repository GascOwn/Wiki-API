const mongoose = require("mongoose");

const articleSchema = {
  title: {
    type: String,
    required: [true, "article must have a title."]
  },
  content: {
    type: String,
    required: [true, "article can't be empty"]
  }
};

const Article = mongoose.model("Article", articleSchema);

exports.Article = Article;
