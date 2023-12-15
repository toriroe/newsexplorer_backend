const router = require("express").Router();

const {
  addArticle,
  removeArticle,
  getArticles,
} = require("../controllers/articles");

// Get all articles saved by user
router.get("/", getArticles);

// Add article to list of saved articles
router.post("/", addArticle);

// Remove article from saved articles by _id
router.delete("/:articleId", removeArticle);

module.exports = router;
