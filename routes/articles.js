const express = require("express");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articlesController");

const {
  validateArticleBody,
  validateObjectId,
} = require("../middleware/validation");

const articlesRouter = express.Router();

articlesRouter.get("/", getArticles);
articlesRouter.post("/", validateArticleBody, createArticle);
articlesRouter.delete("/:_id", validateObjectId, deleteArticle);

module.exports = articlesRouter;
