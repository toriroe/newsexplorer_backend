const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const NotFoundError = require("../utils/errors/not-found");
const ConflictError = require("../utils/errors/conflict");
const UnauthorizedError = require("../utils/errors/unauthorized");
const BadRequestError = require("../utils/errors/bad-request");
const SECRET_KEY = require("../utils/constants");

const { JWT_SECRET, NODE_ENV } = process.env;

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        throw new ConflictError("Email already exists");
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.create({ name, email, password: hash })
              .then((user) => {
                const token = jwt.sign(
                  { _id: user.id },
                  NODE_ENV === "production" ? JWT_SECRET : "secret-key-2023",
                  {
                    expiresIn: "7d",
                  },
                );
                res.status(201).send({ name, email, _id: user._id, token });
              })
              .catch((err) => {
                if (err.name === "ValidationError") {
                  next(new BadRequestError("Validation Error"));
                } else {
                  next(err);
                }
              });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user.id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key-2023",
        { expiresIn: "7d" },
      );
      res.send({ name: user.name, email, _id: user.id, token });
    })
    .catch((err) => {
      console.error(err);
      next(new UnauthorizedError("Error from login"));
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("No user with matching ID found");
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = { createUser, login, getCurrentUser };
