const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// get info about logged-in user (email and name)
router.get("/me", getCurrentUser);

module.exports = router;
