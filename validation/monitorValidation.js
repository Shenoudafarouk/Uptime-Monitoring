const joi = require("joi");

module.exports.createValidation = async function (req, res, next) {
  try {
    const bodySchema = joi.object().keys({
      website: joi.string().required()
    });

    const bodyValidation = bodySchema.validate(req.body, { allowUnknown: true});
    const validationError = bodyValidation.error;

    if (validationError) {
      return res.status(400).send({
        status: "BAD_REQUEST",
        message: validationError.details[0].message
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: "SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};