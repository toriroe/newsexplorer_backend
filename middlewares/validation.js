const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// validate user and news article IDs when they are accessed
const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

// validate URLs for article images and links
const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// validate news article body when an article is saved
const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'the "link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'the "image" field must be a valid url',
    }),
  }),
});

// validate user info body when a user is created
const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// validate authentication when a user logs in
const validateLoginAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports = {
  validateArticleBody,
  validateUserInfoBody,
  validateLoginAuthentication,
  validateId,
};
