const path = require("path")
const util = require('util');
const fs = require('fs')
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const axios = require("axios")
const {
    localizationStatus,
    localizationMessage
} = require('../config/messageFilePath');
const Exchange_Rate = require('../models/Exchang_Rate');
const Exchange_Rate_localized = require('../models/Exchange_Rate_Localized')
const User = require('../models/user')
const urls = require("../config/url").urls
const rp = require("request-promise")
const AWS = require('aws-sdk');
const request = require('request');
const { result } = require("lodash");
const { numberToArabic } = require('number-to-arabic')
var { WORLD_WIDE } = require('../config/constants/general')
const {
    producer
} = require("../config/kafka")
const geoip = require('geoip-lite')


const getStatusAndErrorMessage = function (key, language = "en") {

    return {
        message: localizationStatus[language].get(key) ? localizationStatus[language].get(key).replace(/\\/g, "") : "NO MESSAGE FOUND..."
    };

};
module.exports.getStatusAndErrorMessage = getStatusAndErrorMessage

module.exports.getTooliMessage = function (key, language = "en") {

    let message = localizationMessage[language].get(key) ? localizationMessage[language].get(key) : "NO MESSAGE FOUND..."
    message = message.replace(/\\/g, "");
    return {
        message: message ? message : "NO MESSAGE FOUND..."
    };

};
module.exports.uploadToS3FromUrl = function (url, bucket, key, callback) {
    request({
        url: url,
        encoding: null
    }, function (err, res, body) {
        if (err)
            return callback(err, res);

        new AWS.S3().putObject({
            Bucket: bucket,
            Key: key,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body // buffer
        }, callback);
    })
}




function getValueofLevel(object, path) {
    Object.keys(path).forEach(key => {
        if (object[path[key]] === undefined) {
            object[path[key]] = {}
        }
        object = object[path[key]]
    })
    return object
}

function fromString(path, obj = self, separator = '.') {
    var properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

module.exports.loadSupportedLanguages = async function () {
    const languagesFile = await readFile(`${process.env.LANGUAGE_FILE_PATH}`, 'utf8');
    const languagesJson = JSON.parse(languagesFile);
    return languagesJson.languages
}


module.exports.getSystemMessageForAllLanguages = function (key, languages = ["en", "ar", "fr"]) {
    const values = {}
    for (const language of languages) {
        values[language] = getStatusAndErrorMessage(key, language).message
    }
    return values
}

module.exports.getUserLocationLogic = async function (req) {
    try {
        const ip = req.headers["x-real-ip"] || req.headers["x-forwarded-for"]
        const geo = geoip.lookup(ip);
        if (!geo) return null
        return {
            country: geo.country,
            region: geo.region,
            ip: ip,
            city: geo.city,
            lat: geo.ll[0],
            lng: geo.ll[1]
        }

    } catch (error) {
        console.error('userController.js --> getUserLocation(req, res)', error);
        let message = await getStatusAndErrorMessage("SERVER_ERROR", req.query.language);
        return {
            status: 500,
            message: message
        };
    }

}

module.exports.coinsToCurrency = function (rate, coins) {
    const price = (coins * rate) / 100;
    return { price };
};

module.exports.getExchangeRate = async function (countryCode, language = "en") {
    try {
        let rate = await Exchange_Rate.findOne({ countryCode: countryCode })
    if (!rate) {
        rate = await Exchange_Rate.findOne({
            countryCode: "US"
        });
    }
    //const currency = rate.currencyCode;
    const rateNum = rate.rate;
    let currencyLocalized = await Exchange_Rate_localized.findOne({ countryCode: rate.countryCode });
    const currency = currencyLocalized.currencyCode[language];
    return { rate: rateNum, currency };
    } catch (err){
        console.log(err);
    }
};


const intToStrings = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
    "11": "eleven",
    "12": "twelve"
}
let translation = {
    en: {
        "and": " and ",
        "one day": "1 day",
        "two days": "2 days",
        "three days": "3 days",
        "four days": "4 days",
        "five days": "5 days",
        "six days": "6 days",
        "one week": "1 week",
        "two weeks": "2 weeks",
        "three weeks": "3 weeks",
        "one month": "1 month",
        "two month": "2 months",
        "three month": "3 months",
        "four month": "4 months",
        "five month": "5 months",
        "six month": "6 months",
        "seven month": "7 months",
        "eight month": "8 months",
        "nine month": "9 months",
        "ten month": "10 months",
        "eleven month": "11 months",
        "twelve month": "12 months",
    },
    ar: {

        "one day”": "١ يوم",
        "two days": "٢ يوم",
        "three days": "٣ يوم",
        "four days": "٤ يوم",
        "five days": "٥ يوم",
        "six days": "٦ يوم",
        "one week": "١ أسبوع",
        "two weeks": "٢ أسبوع",
        "three weeks": "٣ أسبوع",
        "one month": "١ شهر",
        "two month": "٢ شهر",
        "three month": "٣ شهر",
        "four month": "٤ شهر",
        "five month": "٥ شهر",
        "six month": "٦ شهر",
        "seven month": "٧ شهر",
        "eight month": "٨ شهر",
        "nine month": "٩ شهر",
        "ten month": "١٠ شهر",
        "eleven month": "١١ شهر",
        "twelve month": "١٢ شهر",
        "and": " و "
    },
    fr: {
        "and": " et ",
        "one day": "1 jour",
        "two days": "2 jours",
        "three days": "3 jours",
        "four days": "4 jours",
        "five days": "5 jours",
        "six days": "6 jours",
        "one week": "1 semaine",
        "two weeks": "2 semaines",
        "three weeks": "3 semaines",
        "one month": "1 mois",
        "two month": "2 mois",
        "three month": "3 mois",
        "four month": "4 mois",
        "five month": "5 mois",
        "six month": "6 mois",
        "seven month": "7 mois",
        "eight month": "8 mois",
        "nine month": "9 mois",
        "ten month": "10 mois",
        "eleven month": "11 mois",
        "twelve month": "12 mois",
    }
}


module.exports.formatDuration = function (days, language) {
    let formatDuration = "";
    var months = parseInt(days / 30);
    days = days - months * 30;
    var weeks = parseInt(days / 7);
    days = days - weeks * 7;
    let formattedMonth = intToStrings[months.toString()] + " month"
    let formattedWeek = (weeks > 0 ? intToStrings[weeks.toString()] + " week" + (weeks > 1 ? "s " : "") : "")
    let formattedDay = (days > 0 ? intToStrings[parseInt(days).toString()] + " day" + (days > 1 ? "s" : "") : "")

    if (months)
        formatDuration += translation[language][formattedMonth];

    if (weeks)
        formatDuration += formatDuration.length ? translation[language]["and"] + translation[language][formattedWeek] : translation[language][formattedWeek]

    if (days)
        formatDuration += formatDuration.length ? translation[language]["and"] + translation[language][formattedDay] : translation[language][formattedDay]

    return formatDuration
}

module.exports.AfterSMSAction = function (sucess, error, userDB) {
    console.log(sucess, error, userDB)
    if (sucess) {
        // sucess
        userDB.smsCount = userDB.smsCount + 1;
        userDB.smsReceiptStatusHistory.push(sucess.messages[0]);
    } else {
        //failer
        //one came success send but an error occured from balance account 
        //one came error from Hmac Header
        if (typeof error.message == 'string') {
            userDB.smsReceiptStatusHistory.push({ stringResponse: error.message });
        } else {
            //json message
            userDB.smsReceiptStatusHistory.push(error.message.messages);
        }
    }
}

module.exports.allowedSubscriptionTitles = function (subscribedAccountType) {
    let allowedTitles = []
    switch (subscribedAccountType.toUpperCase()) {
        case "FREE": {
            allowedTitles = ["FREE"]
        }
            break;
        case "STANDARD": {
            allowedTitles = ["FREE", "STANDARD"]
        }
            break;
        case "PREMIUM": {
            allowedTitles = ["FREE", "STANDARD", "PREMIUM"]
        }
            break;
        case "VIP": {
            allowedTitles = ["FREE", "STANDARD", "PREMIUM", "VIP"]
        }
    }

    return allowedTitles;

}

module.exports.getFormattedTime = function (time, language) {

    let timeInSecs = time * 60 * 60
    var minutesOriginal = Math.floor(timeInSecs / 60)
    var hoursOriginal;
    var daysOriginal;

    if (minutesOriginal >= 24 * 60) {

        daysOriginal = Math.floor(minutesOriginal / (60 * 24));
        hoursOriginal = Math.floor(minutesOriginal / 60) - (daysOriginal * 24)
        minutesOriginal = minutesOriginal - (daysOriginal * 24 * 60 + hoursOriginal * 60)

    }

    else if (minutesOriginal > 59) {
        hoursOriginal = Math.floor(minutesOriginal / 60);
        minutesOriginal = minutesOriginal - (hoursOriginal * 60);
    }

    let unitDays = daysOriginal > 1 ? getStatusAndErrorMessage("all_days_lbl", language).message : getStatusAndErrorMessage("all_day_lbl", language).message

    let unitHours = hoursOriginal > 1 ? getStatusAndErrorMessage("all_hours_abbreviation_lbl", language).message : getStatusAndErrorMessage("all_hour_abbreviation_lbl", language).message

    let unitMinutes = minutesOriginal > 1 ? getStatusAndErrorMessage("all_minutes_abbreviation_lbl", language).message : getStatusAndErrorMessage("all_minute_abbreviation_lbl", language).message

    let days = language === 'ar' && daysOriginal ? numberToArabic(daysOriginal) : daysOriginal;

    let hours = language === 'ar' && hoursOriginal ? numberToArabic(hoursOriginal) : hoursOriginal

    let minutes = language === 'ar' && minutesOriginal ? numberToArabic(minutesOriginal) : minutesOriginal

    let formattedDuration = "";

    if (daysOriginal) {

        formattedDuration += `${days} ${unitDays} `
    }

    if (hoursOriginal) {

        formattedDuration += `${hours} ${unitHours}`
    }

    if (minutesOriginal && !daysOriginal && !hoursOriginal) {

        formattedDuration += `${minutes} ${unitMinutes} `
    }

    return formattedDuration
}



// const translate = require('google-translate-open-api').default;

// module.exports.translation = async function (formattedDuration, language) {
//     const result = await translate(formattedDuration, {
//         tld: "com",
//         to: language,
//     });
//     const data = result.data[0];

//     return data
// }


module.exports.deleteS3ImageAllSizes = async (moduleName, imageType, imageName) => {
    try {
        // pathArray {Key:"/media/title/poster/image.jpg"}
        await axios.post(urls.deleteImageAllSizes, {
            imageName,
            moduleName,
            imageType
        });
        return;
    } catch (error) {
        console.log(error);
    }
};


module.exports.getformattedPrice = async (userId, price) => {
    let worldWidePrice;
    let formattedPrice;


    const user = await User.findOne({ _id: userId })

    const userCountry = user.country || WORLD_WIDE;

    const { rate, currency } = await this.getExchangeRate(userCountry, user.language);

    for (const item of price) {
        const { price } = this.coinsToCurrency(rate, item.amount);
        if (item.country == userCountry)
            formattedPrice = {
                coins: item.amount,
                value: parseFloat(price.toFixed(2)),
                currency: currency
            };

        if (item.country == WORLD_WIDE)
            worldWidePrice = {
                coins: item.amount,
                value: parseFloat(price.toFixed(2)),
                currency: currency
            };
    }

    return { formattedPrice, worldWidePrice }

}


module.exports.sendNotification = async function ({
    userIds,
    notificationSubject,
    notificationBody,
    usePushNotification,
    language,
    append = "",
    replace
}) {
    // send a push notification to the user
    const arMessageBody = getStatusAndErrorMessage(notificationBody, "ar")
    const frMessageBody = getStatusAndErrorMessage(notificationBody, "fr")
    const enMessageBody = getStatusAndErrorMessage(notificationBody, "en")
    const arMessageTitle = getStatusAndErrorMessage(notificationSubject, "ar")
    const frMessageTitle = getStatusAndErrorMessage(notificationSubject, "fr")
    const enMessageTitle = getStatusAndErrorMessage(notificationSubject, "en")
    if (replace !== undefined) {
        for (let key of Object.keys(replace)) {
            arMessageBody.message = arMessageBody.message.replace(key, replace[key]["ar"])
            frMessageBody.message = frMessageBody.message.replace(key, replace[key]["fr"])
            enMessageBody.message = enMessageBody.message.replace(key, replace[key]["en"])
        }
    }

    await axios.post(`${urls.sendNotification}?language=${language}`, {
        userIds: userIds,
        startDate: new Date(),
        usePushNotification: usePushNotification,
        ttl: 2630000,
        deliverdTtl: 2630000,
        notificationSubject: {
            en: enMessageTitle.message,
            ar: arMessageTitle.message,
            fr: frMessageTitle.message
        },
        notificationBody: {
            en: enMessageBody.message + append,
            ar: arMessageBody.message + append,
            fr: frMessageBody.message + append
        },
    })
}



module.exports.userUpdateAddedEvent = (userId, updateType, payloadKey, payload) => {
    let message = {
        updateType: updateType,//"BQT_SUBSCRIBED",
        payload: {}
    }

    message.payload[payloadKey] = payload

    message = JSON.stringify(message)

    let payloads = [{
        topic: 'graphQLSubscriptionTopic',
        messages: `{"channel":"userUpdateAdded${userId}","userUpdateAdded":${message}}`
    }];
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
}








