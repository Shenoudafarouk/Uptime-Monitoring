const joi = require('joi');
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);



module.exports.getWalletInfoValidator = function (req, res, next) {
    try {
        const querySchema = {
            language: joi.string().required().default("en"),
            userId: ObjectId().required(),
        };


        const queryValidation = joi.validate(req.query, querySchema, { allowUnknown: false })
        //const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false })
        const validationError = queryValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.details[0].message
            });
        }
        return next()
    } catch (error) {
        console.error('walletUserValidator --> getWalletInfo.js ', error);
        return res.status(500).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
}
module.exports.addCreditValidator = function (req, res, next) {
    try {
        const querySchema = {
            language: joi.string().required().default("en")
        };
        const bodySchema = {
            userId: ObjectId().required(),
            paidPrice: joi.number().required(),
            currency: joi.string().required(),
            paymentReferenceSource: joi.string().required(),
            paymentReferenceId: joi.string().required(),
            skipTransaction: joi.boolean().optional()
        };

        const queryValidation = joi.validate(req.query, querySchema, { allowUnknown: false })
        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false })
        const validationError = queryValidation.error || bodyValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.details[0].message
            });
        }
        return next()
    } catch (error) {
        console.error('walletUserValidator --> addCreditValidator.js ', error);
        return res.status(500).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
}

module.exports.addCoinsValidator = function (req, res, next) {
    try {
        const querySchema = {
            language: joi.string().required().default("en")
        };
        const bodySchema = {
            userId: ObjectId().required(),
            paidPrice: joi.number().required(),
            coins: joi.number().required(),
            currency: joi.string().required(),
            paymentReferenceSource: joi.string().required(),
            paymentReferenceId: joi.string().required(),
            skipTransaction: joi.boolean().optional(),
            paymentDate: joi.optional()

        };

        const queryValidation = joi.validate(req.query, querySchema, { allowUnknown: true })
        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: true })
        const validationError = queryValidation.error || bodyValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.details[0].message
            });
        }
        return next()
    } catch (error) {
        console.error('walletUserValidator --> addCreditValidator.js ', error);
        return res.status(500).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
}

