const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const models = require("../models/articles-model");


const router = express.Router();

module.exports = router;

const Article = models.Article;

// Requests targeting all articles

router.route("/")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });

  })

  .post(function(req, res) {

    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    article.save(function(err) {
      if (!err) {
        res.send("article saved succesfully!");
      } else {
        res.send(err);
      };
    });

  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("All articles deleted succesfully.");
      } else {
        res.send(err);
      };
    });
  });

// Requests handling one article

router.route("/:articleTitle")

  .get(function(req, res) {

    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (!err) {
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    });
  })

  .put(function(req, res) {
    Article.updateOne({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content,
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Document updated successfully!");
        } else {
          res.send(err);
        };
      });
  })

  .patch(function(req, res) {
    Article.updateOne({
      title: req.params.articleTitle
    }, {
      $set: req.body
    }, function(err) {
      if (!err) {
        res.send("Document updated successfully!");
      } else {
        res.send(err);
      };
    });
  })
  
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (!err) {
        res.send("Document deleted successfully!");
      } else {
        res.sennd(err);
      };
    });
  });
