var urls = {};

// default localhost
urls = {
    saveFromCloud: `http://localhost:${process.env.MEDIA_SERVICE_PORT}/v1/saveFromCloud`,
    mediaServiceBaseUrl: `${process.env.MEDIA_SERVICE_BASE_URL}`,
    uploadLocalImgToS3: "http://localhost:8001/externalMedia/upload/image/uploadFromLocal",
    assignPromotionToUser: 'http://localhost:3010/promotions/v1/assignPromotionToUser',
    generateNewArabSatCode: 'http://localhost:3002/subscription/v1/generateNewArabSatCode',
    userInfoSubscription: 'http://localhost:3002/subscription/v1/userInfoSubscription',
    countUserNotification: 'http://localhost:3009/notification/v1/countUserNotification',
    countUserUnusedPromo: 'http://localhost:3010/promotions/v1/countUserUnusedPromo',
    createNotification: 'http://localhost:3009/notification/v1/createNotification',
    royalLogin: 'http://tooli.org/api/access/v2/login.php',
    randomcodedealar: 'http://tooli.org/api/access/v2/randomcodedealar.php',
    newsFeedService: 'http://localhost:3016/feeds',
    rocketChatApi: `${process.env.ROCKET_CHAT_URL}`,
    createDefaultSubscription: 'http://localhost:3002/subscription/v1.1/createDefaultSubscription?language=en',
    updateSubscriptionsRestrictedFlag: 'http://localhost:3002/subscription/v1.1/updateSubscriptionsRestrictedFlag?language=en',
    updateChannelFavoriteCount: 'http://localhost:3145/channel/v1/updateChannelFavoriteCount',
    getUserSubs: 'http://localhost:3002/subscription/v1.1/getUserSubscriptions',
    getUserSubscribedChannels: 'http://localhost:3002/subscription/v1.1/getUserSubscribedChannels',
    getChannelSchedule: 'http://localhost:3145/epg/v1/getChannelSchedule',
    channelRunningShowDetails: 'http://localhost:3145/epg/v1/channelRunningShowDetails',
    getChannelsBasicAndEPGInfo: 'http://localhost:3145/channel/v1/getChannelsBasicAndEPGInfo',
    addUserToFireStore: 'http://localhost:3456/firestore/addUserToFirebase',
    getUserLocation: "http://api.ipinfodb.com/v3/ip-country",
    updateNotificationEndPoint: "http://localhost:3009/user/updateEndpoint",
    getBouquetDetails: "http://localhost:3145/bouquet/v3/getBouquetDetails",
    sendEmail: "http://localhost:3888/email/v1/sendEmail",
    createBulkTokens: 'http://localhost:3223/tooliToLogiciel/playToken/createBulkTokens',
    createLog: "http://localhost:3021/logging/createLog",
    localizeidBouquets: "http://localhost:3145/bouquet/v3/getLocalizedBouquets",
    sendNotification: "http://localhost:3009/admin/addAdminNotification",
    updateNotificationCount: "http://localhost:3009/admin/updateNotificationCount",
    getExchangeRate: "http://data.fixer.io/api/latest",
    androidConsoleLogin: "https://accounts.google.com/o/oauth2/token",
    applePurchaseSandBox: "https://sandbox.itunes.apple.com/verifyReceipt",
    applePurchaseProduction: "https://buy.itunes.apple.com/verifyReceipt",
    addToContinueWatchList: "http://localhost:3070/continueWatch/addToContinueWatchList",
    addToContinueWatchListV3: "http://localhost:3070/vodUser/v3/addToContinueWatchList",
    getMPTitle: "http://localhost:3070/title/v1/getMPTitle",
    filterChannals: "http://localhost:3145/channel/v1.1/filterChannals",
    deleteImageAllSizes: "http://localhost:8001/externalMedia/upload/s3/deleteImageAllSizes",
    //addons
    getBouquetChannels: "http://localhost:3145/bouquet/v3/getBouquetChannels",
    searchChannelsAndCategories: "http://localhost:3145/channel/v1.1/searchChannelsAndCategories",
    getNoonSubscription: "http://localhost:5050/noon/getUserSubscription",
    excuteSubscriptionImage: "http://localhost:5050/noon/excuteSubscriptionImage",
    
}




exports.urls = urls; //add on exports