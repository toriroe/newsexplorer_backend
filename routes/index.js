const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");

const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
