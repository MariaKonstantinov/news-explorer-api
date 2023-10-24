const Article = require("../models/article");

const BadReqError = require("../errors/BadReqError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const { ERROR_MESSAGE } = require("../utils/constants");

// GET
const getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

// POST
const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadReqError(ERROR_MESSAGE.INCORRECT_ARTICLE_DATA));
      } else {
        next(err);
      }
    });
};

// DELETE
const deleteArticle = (req, res, next) => {
  const articleId = req.params._id;
  const userId = req.user._id;

  Article.findById(articleId)
    .orFail(new NotFoundError(ERROR_MESSAGE.ARTICLE_NOT_FOUND))
    .select("+owner")
    .then(async (article) => {
      const { owner } = article;
      if (userId == owner) {
        const data = await Article.findByIdAndRemove(articleId);
        return res.send(data);
      }
      next(new ForbiddenError(ERROR_MESSAGE.FORBIDDEN));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
