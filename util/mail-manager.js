const nodemailer = require('nodemailer');
var fs = require('fs');
const path = require('path');
let User = require('../models/user');
let {
    sendSMS
} = require('./sms-manger');
const {
    sendEmailValidator
} = require('../validation/emailValidator');
const {
    getTooliMessage
} = require('../util/utils')

var sendEmail = (to, subject, text, emailData, parameters, done) => {
    console.log(parameters);

    console.log('send ُEmail');
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            // service: 'gmail',
            auth: {
                user: 'no-reply@tooli.tv',
                pass: 'T00li@123'
            } // generated ethereal user
        });

        // setup email data with unicode symbols
        let mailOptions = {};
        if (text) {
            mailOptions = {
                from: '"Tooli TV" <no-reply@tooliserver.com>',
                to,
                subject,
                text
            };
        } else {

            let userLang = emailData.language;
            let subjectKey = emailData.subject;
            let bodyKey = emailData.body;
            let footerKey = emailData.footer;

            let localizedSubject = getTooliMessage(subjectKey, userLang).message
            let body = getTooliMessage(bodyKey, userLang).message
            let footer = getTooliMessage(footerKey, userLang).message
            let fileName = getFileName(subject);
            let data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');

            data = data.replace(`@${subjectKey}`, localizedSubject),
                data = data.replace(`@${bodyKey}`, body),
                data = data.replace(`@${footerKey}`, footer)

            for (let param in parameters)
                data = data.replace(param, parameters[param]);

            mailOptions = {
                from: '"Tooli TV" <no-reply@tooliserver.com>',
                to,
                subject: localizedSubject,
                html: data
            };
            // html: { path: './templateinlined.html' } 
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                done && done(new Error(JSON.stringify(error)));
                console.log(error);
                return
            }
            done && done();
            console.log('Email sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
};

var sendEmailAPI = function (req, res) {
    const {
        error
    } = sendEmailValidator(req.query, req.body);
    if (error) {
        return res.status(400).send({
            status: "BAD_REQUEST",
            message: error.details[0].message
        });
    }
    try {
        if (!req.body.to.includes('@')) { //contain userId
            User.findById(req.body.to).exec().then(_userDB => {
                sendEmail(_userDB.email, req.body.subject, req.body.msg, req.body.parameter);
            });
        } else {
            sendEmail(req.body.to, req.body.subject, req.body.msg, req.body.parameter);
        }
        res.status(200).json({
            status: "OK"
        });
    } catch (err) {
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: err.message
        });
    }
};

function getFileName(subject) {

    console.log(subject.toUpperCase());

    switch (subject.toUpperCase()) {
        case 'WELCOME TO TOOLI':
            return 'AfterRegister.html'

        case 'RENEW ACCOUNT SUCCESS':
            return "afterAccountRenewal.html"

        case 'WELCOME TO TOOLI.SOCIAL USER':
            return 'AfterRegisterSocial.html'

        case 'VERIFY YOUR EMAIL':
            return 'VerifyEmail.html'

        case 'RECEIVING A PROMOTION':
            return 'ReceivingPromotion.html'

        case 'RESET YOUR PASSWORD':
            return 'ForgetPassword.html'

        case 'PAYMENT RCECIVED':
            return 'AfterBuyingSubscription.html'

        case 'NO DEFAULT ACCOUNT TYPE':
            return 'NODefaultAccountType.html'

        case 'GET LINK TO ACCOUNT DEFAULT':
            return 'LinkToSubscripedCategoryDefault.html'

        case 'GET LINK TO ACCOUNT PREMIUM':
            return 'LinkToSubscripedCategoryPremium.html'

        case 'GET LINK TO ACCOUNT UPGRADE':
            return 'LinkToSubscripedCategoryUpgrade.html'

        case 'RENT VOD':
            return 'rentVod.html';

        case 'RENT TITLE ENDED':
            return 'RentTitleEnded.html'

        case 'BUY ADDON LATER':
            return 'BuyAddonLater.html'

        case 'BUY ADDON NOW':
            return 'BuyAddonNow.html'

        case 'BUY ADDON ONCE':
            return 'BuyAddonOnce.html'

        case 'ADD COINS':
            return 'AddCoins.html'

        case 'SUBSCRIPTION DISCOUNT':
            return 'subscriptionDiscount.html'


        default:
            return 'AfterRegister.html'

    }
}

module.exports = {
    sendEmail,
    sendEmailAPI
};