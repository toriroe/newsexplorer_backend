const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../utils/errors/unauthorized");
const SECRET_KEY = require("../utils/constants");

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.handleAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer: ")) {
    return next(new UnauthorizedError("Authorization Required"));
  }

  const token = authorization.replace("Bearer: ", "");
  let payload;

  try {
    console.log(NODE_ENV === "production" ? JWT_SECRET : "secret-key-2023");
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key-2023",
    );
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Invalid Token"));
  }

  req.user = payload;

  return next();
};
