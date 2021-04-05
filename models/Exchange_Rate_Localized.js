const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeRateLocalizedSchema = new Schema({
    country: {
        type: String
    },
    countryCode: {
        type: String,
        required: true
    },
    currencyCode: {//iso-4217
        en: {
            type: String,
            required: true,
        },
        ar: {
            type: String,
            required: true,
        },
        fr: {
            type: String,
            required: true,
        }
    }
});



module.exports = mongoose.model("exchange_Rate_Localized", exchangeRateLocalizedSchema);
