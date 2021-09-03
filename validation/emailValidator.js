const joi = require('joi');

module.exports.sendEmailValidator = function (email) {
    
    const bodySchema = joi.object().keys({
        to: joi.string().required(),
        type: joi.string().required(),
        variables: joi.object().required(),
    });
    
    // validate body schemas and return error, if there is, returned by any one of them
    var bodySchemaValidation = bodySchema.validate(email, { allowUnknown: true });

    if (bodySchemaValidation.error)
         return bodySchemaValidation;
};
