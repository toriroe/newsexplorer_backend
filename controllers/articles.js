const Article = require("../models/article");

const NotFoundError = require("../utils/errors/not-found");
const BadRequestError = require("../utils/errors/bad-request");
const ForbiddenError = require("../utils/errors/forbidden");

const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => {
      res.status(201).send({ data: article });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation Error"));
      } else {
        next(err);
      }
    });
};

const removeArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => new NotFoundError("Error from removeArticle"))
    .then((article) => {
      if (userId !== article.owner.toString()) {
        throw new ForbiddenError("User not authorized to remove article");
      }
      return Article.findByIdAndRemove(articleId)
        .orFail(() => new NotFoundError("Error from removeArticle"))
        .then((removedArticle) => res.send(removedArticle))
        .catch(next);
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports = { addArticle, removeArticle, getArticles };
