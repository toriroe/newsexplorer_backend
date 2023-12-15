const User = require("../models/user");

const NotFoundError = require("../errors/not-found");
const ConflictError = require("../errors/conflict");
const UnauthorizedError = require("../errors/unauthorized");
const BadRequestError = require("../errors/bad-request");

const createUser = (req, res, next) => {
  // const { email, name, password } = req.body;
  // User.findOne({ email }).then((emailFound) => {
  //   if (emailFound) {
  //     throw new ConflictError("Email already exists");
  //   } else {
  //     User.create({ name, email, password }).then((user) => {});
  //   }
  // });
};

const login = () => {};

const getCurrentUser = (req, res, next) => {
  // const userId = req.user._id;
  // User.findById(userId)
  //   .then((user) => {
  //     if (!user) {
  //       throw new NotFoundError("No user with matching ID found");
  //     }
  //     res.send(user);
  //   })
  //   .catch(next);
};

module.exports = { createUser, login, getCurrentUser };
