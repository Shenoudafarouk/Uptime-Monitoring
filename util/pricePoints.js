const Exchange_Rate = require("../models/Exchang_Rate")

const USD_TO_COINS = 100

module.exports.getAmountInPoints = async function (paidPrice, countryId) {
    let searchCountryId = countryId
    if(!countrySupportPayment.includes(countryId)) searchCountryId = "US"
    const rate = await Exchange_Rate.findOne({countryCode:searchCountryId})
    console.log(rate)
    return {
        amount: paidPrice * USD_TO_COINS / rate.rate,
        currency: rate.currencyCode
    }
};

module.exports.convertToCoins = async function (paidPrice, currency) {
    const rate = await Exchange_Rate.findOne({currencyCode:currency})
    return {
        amountInCoins: paidPrice * USD_TO_COINS / rate.rate
    }
};

const priceToPoints = {
    "world wide": {
        currency: "USD",
        equals: 100
    },
    "EG": {
        currency: "EGP",
        equals: 100 / 15.79
    },
    "SA": {
        currency: "SAR",
        equals: 100 / 3.74
    }
}
const exchangeRate = {
    "USD": 100,
    "EGP": 100 / 15.79,
    "SAR": 100 / 3.74 
}

module.exports.getCurrency = function (countryId, language) {
    if (countryId === "EG") {
        if (language === "ar") {
            return "ج.م"
        } else {
            return "EGP"
        }
    } else if (countryId === "SA") {
        if (language === "ar") {
            return "ر.س"
        } else {
            return "SAR"
        }
    } else {
        if (language === "ar") {
            return "دولار"
        } else {
            return "USD"
        }
    }
}

const countrySupportPayment = module.exports.countrySupportPayment = ["EG", "SA"]