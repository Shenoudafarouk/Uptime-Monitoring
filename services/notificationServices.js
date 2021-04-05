const User_Push_Notification = require("../models/userPushNotifications")
const urls = require("../config/url").urls
const rp = require("request-promise")

const {
    getStatusAndErrorMessage
} = require('../util/utils');
const axios = require("axios")

module.exports.prepareAccountNotificationParams = function (valuesName, valuesCategoryName, language, userId) {

    const formatedName = {
        en: valuesName.en + " " + valuesCategoryName.en,
        fr: valuesName.fr + " " + valuesCategoryName.fr,
        ar: valuesName.ar + " " + valuesCategoryName.ar
    }

    return {
        userIds: [userId],
        notificationSubject: "all_notification_title_account_type_module_account_type_upgraded_successfully_now",
        notificationBody: "all_notification_body_account_type_module_account_type_upgraded_successfully_now",
        language: language,
        usePushNotification: true,
        replace: {
            "@ACCOUNT_TYPE_NAME": formatedName,
        }
    }
}

module.exports.prepareAccountLaterNotificationParams = function (valuesName, valuesCategoryName, language, userId, endDate) {

    const formatedName = {
        en: valuesName.en + " " + valuesCategoryName.en,
        fr: valuesName.fr + " " + valuesCategoryName.fr,
        ar: valuesName.ar + " " + valuesCategoryName.ar
    }

    return {
        userIds: [userId],
        notificationSubject: "all_notification_title_account_type_module_account_type_upgraded_successfully_later",
        notificationBody: "all_notification_body_account_type_module_account_type_upgraded_successfully_later_within_different_account",
        language: language,
        usePushNotification: true,
        replace: {
            "@ACOUNT_TYPE_NAME": formatedName,
            "@ACOUNT_TYPE_DATE": {
                en: new Date(endDate).toISOString().split("T")[0],
                fr: new Date(endDate).toISOString().split("T")[0],
                ar: new Date(endDate).toISOString().split("T")[0],
            }
        }
    }
}

module.exports.prepareRentVodNotificationParams = function (userId, language, notificationDescription) {

    return {

        userIds: [userId],
        notificationSubject: "all_notification_title_rent_title_successfully",
        notificationBody: "all_notification_body_rent_title_successfully",
        language: language,
        usePushNotification: true,
        replace: {
            "<Title Name>": {
                en: notificationDescription,
                ar: notificationDescription,
                fr: notificationDescription,
            }
        }
    }
}


module.exports.sendNotification = function ({
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

    axios.post(`${urls.sendNotification}?language=${language}`, {
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
        action: {
            type: "DEEP_LINK",
            url: `${process.env.NOTIFICATION_URL}/notifications`,
        }
    })
}


module.exports.updateDeviceTokenService = async function ({
    deviceToken,
    deviceName,
    deviceId,
    devicePlatform,
    userId,
    language,
    isLoggedIn = true,
    tokenType
}) {

    let userPushNotification = await User_Push_Notification.findOne({
        deviceId: deviceId
    })
    // if the userNotification document doesn't exist create it
    if (!userPushNotification) {
        userPushNotification = await new User_Push_Notification({
            deviceId: deviceId,
            devicePlatform: devicePlatform,
            deviceToken: deviceToken,
            userId: userId,
            deviceName: deviceName,
            creationDate: new Date(),
            modifiedDate: new Date()
        }).save()
        // update if it does exist 
    } else {
        userPushNotification.platform = devicePlatform;
        userPushNotification.deviceToken = deviceToken || userPushNotification.deviceToken;
        userPushNotification.deviceName = deviceName;
        userPushNotification.modifiedDate = new Date();
        await userPushNotification.save();
    }
    // update the aws endpoint
    switch (tokenType) {
        case "APPLE_PROD":
            channel = "APNS"
            break;
        case "APPLE_DEVELOP":
            channel = "APNS_SANDBOX"
            break;
        case "AMAZON_OS":
            channel = "ADM"
            break;
        case "ANDROID":
            channel = "GCM"
            break;
        default:
            channel = undefined
            break;
    }

    return {
        statusCode: 200,
        body: {
            status: "OK",
            message: "Success"
        }
    };

}
