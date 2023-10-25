const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const { ObjectId } = require("mongoose").Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message("Please enter a valid email")
      .messages({
        "string.required": "Email is required",
        "string.email": "Please enter a valid email",
      }),
    password: Joi.string().required().min(8).messages({
      "string.required": "Password is required",
      "string.min": "Please lengthen this password to 8 characters or more",
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "name is required",
      "string.min": "Please lengthen this text to 2 characters or more",
      "string.max": "Please lengthen this text to 30 characters or less",
    }),
    email: Joi.string().required().email().messages({
      "string.required": "Email is required",
      "string.email": "Please enter a valid email",
    }),
    password: Joi.string().required().min(8).messages({
      "string.required": "Password is required",
      "string.min": "Please lengthen this password to 8 characters or more",
    }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.required": "keyword is required",
    }),
    title: Joi.string().required().messages({
      "string.required": "title is required",
    }),
    text: Joi.string().required().messages({
      "string.required": "text is required",
    }),
    date: Joi.string().required().messages({
      "string.required": "date is required",
    }),
    source: Joi.string().required().messages({
      "string.required": "source is required",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.required": "URL is required",
      "string.uri": "Please enter a valid URL",
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.required": "Image is required",
      "string.uri": "Please enter a valid URL for picture",
    }),
  }),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message("Sorry, it is invalid id");
      }),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
  validateArticleBody,
  validateObjectId,
};
