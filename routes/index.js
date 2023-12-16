const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");

const { createUser, login } = require("../controllers/users");
const {
  validateUserInfoBody,
  validateLoginAuthentication,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found");

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.post("/signin", validateLoginAuthentication, login);
router.post("/signup", validateUserInfoBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
