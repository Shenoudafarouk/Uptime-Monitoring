const User = require('../models/user')
const Wallet = require('../models/Wallet_Config')
const UserCoins = require('../models/User_Coins');
const Wallet_Transaction = require('../models/Wallet_Transaction')
const Exchange_Rate = require('../models/Exchang_Rate')
const {
    getStatusAndErrorMessage,
    getSystemMessageForAllLanguages,
    getTooliMessage,
    AfterSMSAction,
    userUpdateAddedEvent
} = require("../util/utils")
const {
    convertToCoins
} = require("../util/pricePoints")
var {
    WORLD_WIDE
} = require('../config/constants/general')
const User_Account = require('../models/User_Account')
const Account_Config = require('../models/Account_Config')
const { sendEmail } = require("../util/mail-manager")
const { sendSMS } = require("../util/sms-manger")
//const UserAccountTypeOperations = require("../services/UserAccountTypeOperations");

module.exports.getWalletInfo = async function (req, res) {

    try {
        const userId = req.query.userId
        const language = req.query.language

        const user = await User.findById(userId)
        if (!user) {
            const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", language)
            return res.status(400).send({
                status: "USER_NOT_EXISTS",
                ...message
            })
        }
        const walletInfo = await Wallet.findOne({
            userId
        })

        return res.send({
            status: "OK",
            result: {
                ...walletInfo._doc,
                totalPoints: parseInt(walletInfo.totalPoints)
            }
        })
    } catch (error) {
        console.log("walletUserController.js====>getWalletInfo", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}



module.exports.getWalletTransactions = async function (req, res) {

    try {
        const userId = req.body.userId
        const language = req.query.language
        let limit = req.body.limit;
        let page = req.body.page;


        const user = await User.findById(userId)
        if (!user) {
            const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", language)
            return res.status(400).send({
                status: "USER_NOT_EXISTS",
                ...message
            })
        }
        const userAccount = await User_Account.findOne({ userId: user._id })
        if (userAccount.accountId === process.env.VIP_ACCOUNT_ID) {
            return res.status(200).send({
                status: "OK",
                result: []
            })
        }

        let count = await (await Wallet_Transaction.find({
            userId: userId
        })).length

        const walletTransactions = await Wallet_Transaction.find({
            userId: userId
        }).sort({
            creationDate: -1
        }).limit(limit).skip(limit * page).lean();

        let formattedWalletTrx = [];

        for (let index = 0; index < walletTransactions.length; index++) {
            const element = walletTransactions[index];
            formattedWalletTrx.push({
                id: element._id,
                description: element.transactionDescription[language],
                title: element.transactionTitle[language],
                transactionType: element.transactionType.toUpperCase(),
                amount: parseInt(element.amountInPoints),
                createDate: element.creationDate
            })

        }
        return res.send({
            status: "OK",
            result: formattedWalletTrx,
            totalCount: count
        })
    } catch (error) {
        console.log("walletUserController.js====>getWalletTransactions", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}

module.exports.addCredit = async function (req, res) {

    try {
        const {
            userId,
            paidPrice,
            currency,
            paymentReferenceSource,
            paymentReferenceId,
            skipTransaction
        } = req.body
        const {
            language
        } = req.query

        const user = await User.findById(userId)
        if (!user) {
            const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", language)
            return res.send({
                status: "USER_NOT_EXISTS",
                ...message
            })
        }
        const userWallet = await Wallet.findOne({
            userId
        })
        const {
            amountInCoins
        } = await convertToCoins(paidPrice, currency)
        /**
         *  upgrade account type with paypall creates a wallet transaction in the background
         *  and it shouldn't be seen by the user I am sending the flag only from
         *  order managment service excutePayment with scope (upgrade_account)
         */

        if (!skipTransaction) {
            //  create wallet transaction
            const walletTrxDescriptionObject = getSystemMessageForAllLanguages("wallet_transaction_description_for_wallet_topup_action")
            for (const language in walletTrxDescriptionObject) {
                walletTrxDescriptionObject[language] = walletTrxDescriptionObject[language]
                    .replace("<currency>", currency)
                    .replace("<charge amount>", paidPrice)
            }
            let walletTransaction = new Wallet_Transaction({
                userId: user._id,
                walletId: userWallet._id,
                amountInPoints: amountInCoins,
                transactionType: 'credit',
                creationDate: new Date(),
                transactionDescription: walletTrxDescriptionObject,
                transactionTitle: getSystemMessageForAllLanguages("wallet_transaction_title_for_wallet_topup_action"),
                paymentReferenceSource: paymentReferenceSource,
                paymentReferenceId: paymentReferenceId
            })
            await walletTransaction.save();
        }

        userWallet.totalPoints = parseInt(userWallet.totalPoints + amountInCoins)
        await userWallet.save()
        //        userUpdateAddedEvent(userId, "WALLET_COINS_ADDED", "coins", userWallet.totalPoints)

        return res.send({
            status: "OK",
            result: { ...userWallet, addedCrdit: amountInCoins }
        })
    } catch (error) {
        console.log("walletUserController.js ====> addCredit", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}

module.exports.addCoins = async function (req, res) {

    try {
        const { userId, coins, paidPrice, currency, paymentReferenceSource,
            paymentReferenceId, paymentDate, skipTransaction
        } = req.body
        const { language } = req.query

        const user = await User.findById(userId)
        if (!user) {
            const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", language)
            return res.send({
                status: "USER_NOT_EXISTS",
                ...message
            })
        }
        const userWallet = await Wallet.findOne({ userId })
        // const { amountInCoins } = await convertToCoins(paidPrice, currency)
        /**
         *  upgrade account type with paypall creates a wallet transaction in the background
         *  and it shouldn't be seen by the user I am sending the flag only from
         *  order managment service excutePayment with scope (upgrade_account)
         */

        if (!skipTransaction) {
            //  create wallet transaction
            const walletTrxDescriptionObject = getSystemMessageForAllLanguages("wallet_transaction_description_for_wallet_topup_action")
            for (const language in walletTrxDescriptionObject) {
                walletTrxDescriptionObject[language] = walletTrxDescriptionObject[language]
                    .replace("<currency>", currency)
                    .replace("<charge amount>", paidPrice)
            }
            let walletTransaction = new Wallet_Transaction({
                userId: user._id,
                walletId: userWallet._id,
                amountInPoints: coins,
                transactionType: 'credit',
                creationDate: new Date(),
                transactionDescription: walletTrxDescriptionObject,
                transactionTitle: getSystemMessageForAllLanguages("wallet_transaction_title_for_wallet_topup_action"),
                paymentReferenceSource: paymentReferenceSource,
                paymentReferenceId: paymentReferenceId
            })
            await walletTransaction.save();
        }

        userWallet.totalPoints = parseInt(userWallet.totalPoints + coins)
        await userWallet.save()
        userUpdateAddedEvent(userId, "WALLET_COINS_ADDED", "coins", userWallet.totalPoints)

        let userAccount = await User_Account.findOne({ userId: userId }).lean();

        let nextRenewalAccount = await Account_Config.findById(userAccount.nextRenewalAccount);

        const countryId = user.country || WORLD_WIDE

        let price = nextRenewalAccount.price.find(price => price.countryId === countryId)

        if (!price || price.countryId !== countryId) {
            price = nextRenewalAccount.price.find(price => price.countryId === WORLD_WIDE)
        }

        /* if (new Date(userAccount.endDate).toISOString().split("T")[0] == new Date().toISOString().split("T")[0] && price.amount <= userWallet.totalPoints)
            new UserAccountTypeOperations().renew(userAccount.userId, user.language); */


        if (user.email) {
            sendEmail(user.email, "ADD COINS", undefined, {
                subject: 'tooli_user_payment_email_title_payment_receipt_received',
                body: 'tooli_user_payment_email_body_payment_receipt_received',
                footer: "all_email_footer",
                language: language
            }, {
                    "@var_first_name": user.firstName,
                    "@var_payment_price": paidPrice,
                    "@var_payment_currency": currency,
                    "@var_payment_date": new Date(paymentDate).toLocaleDateString("en-US"),
                    "@var_reference_number": paymentReferenceId
                })
        }

        if (user.mobile) {
            const smsMessage = getTooliMessage("tooli_user_payment_sms_body_payment_receipt_received", user.language)
            sendSMS(
                user.mobile,
                smsMessage.message.toString("utf8")
                    .replace("@var_payment_price", paidPrice)
                    .replace("@var_payment_currency", currency)
                    .replace("@var_payment_date", new Date(paymentDate).toLocaleDateString("en-US"))
                    .replace("@var_reference_number", paymentReferenceId),
                (sucess, error) => AfterSMSAction(sucess, error, user)
            );
        }

        return res.send({
            status: "OK",
            result: { ...userWallet, addedCrdit: coins }
        })
    } catch (error) {
        console.log("walletUserController.js ====> addCredit", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}


module.exports.getExchangeRate = async function (req, res) {

    try {
        const {
            currency
        } = req.body
        const {
            language
        } = req.query

        const rate = await Exchange_Rate.findOne({
            currencyCode: currency
        })

        return res.send({
            status: "OK",
            rate: rate.rate
        })

    } catch (error) {
        console.log("walletUserController.js ====> getExchangeRate", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}

module.exports.coinsToCurrency = async function (req, res) {

    try {
        const {
            userId,
            coins
        } = req.body
        const {
            language
        } = req.query
        let rate
        const _userDB = await User.findById(userId)
        rate = await Exchange_Rate.findOne({
            countryCode: _userDB.country
        })
        if (!rate) {
            rate = await Exchange_Rate.findOne({
                countryCode: "US"
            })
        }
        return res.send({
            status: "OK",
            result: {
                price: (coins * rate.rate) / 100,
                currencyCode: rate.currencyCode
            }
        })

    } catch (error) {
        console.log("walletUserController.js ====> coinsToCurrency", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}


module.exports.getExchangeRatev2 = async function (req, res) {

    try {

        const rates = await Exchange_Rate.find({}).lean()
        const result = rates.map((rate) => {
            const id = rate._id
            delete rate.__v
            delete rate.modifiedDate
            delete rate._id
            return {
                ...rate,
                id
            }
        })
        return res.send({
            status: "OK",
            result: result
        })

    } catch (error) {
        console.log("walletUserController.js ====> getExchangeRatev2", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}

module.exports.getAcquiredCoins = async function (req, res) {

    try {
        const userId = req.query.userId
        const language = req.query.language

        const user = await User.findById(userId)
        if (!user) {
            const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", language)
            return res.status(400).send({
                status: "USER_NOT_EXISTS",
                ...message
            })
        }
        const userCoins = await UserCoins.find({
            userId
        });

        if (userCoins.length < 1) {
            return res.send({
                status: "OK",
                result: []
            })
        }

        const acquiredCoins = userCoins.map((item) => {
            return {
                source: item.source,
                expirationDate: item.expirationDate,
                amount: item.remainingAmount
            }
        });

        return res.send({
            status: "OK",
            result: acquiredCoins
        })
    } catch (error) {
        console.log("walletUserController.js====>getAcquiredCoins", error);
        let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
        res.status(500).json({
            status: "SERVER_ERROR",
            ...message
        });
    }
}