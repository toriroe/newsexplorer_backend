const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");
const { handleAuthorization } = require("../middlewares/auth");

// get info about logged-in user (email and name)
router.get("/me", handleAuthorization, getCurrentUser);

module.exports = router;
