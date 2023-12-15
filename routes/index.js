const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");

const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/not-found");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
