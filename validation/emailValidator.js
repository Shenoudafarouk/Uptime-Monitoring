const joi = require('joi');

module.exports.sendEmailValidator = function (query, body) {
    const querySchema = joi.object().keys({
        language: joi.string().optional().default("en")
    });

    const bodySchema = joi.object().keys({
        to: joi.string().required(),
        subject: joi.string().required(),
        msg: joi.string().required(),
        parameter: joi.string().required()
    });
    
    // validate both query and body schemas and return error, if there is, returned by any one of them
    var querySchemaValidation = querySchema.validate(query, { allowUnknown: true });
    var bodySchemaValidation = bodySchema.validate(body, { allowUnknown: true });

    if (querySchemaValidation.error) return querySchemaValidation;
    else return bodySchemaValidation;
};
