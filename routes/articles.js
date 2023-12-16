const router = require("express").Router();
const { handleAuthorization } = require("../middlewares/auth");
const {
  validateArticleBody,
  validateId,
} = require("../middlewares/validation");

const {
  addArticle,
  removeArticle,
  getArticles,
} = require("../controllers/articles");

// Get all articles saved by user
router.get("/", handleAuthorization, getArticles);

// Add article to list of saved articles
router.post("/", handleAuthorization, validateArticleBody, addArticle);

// Remove article from saved articles by _id
router.delete("/:articleId", handleAuthorization, validateId, removeArticle);

module.exports = router;
