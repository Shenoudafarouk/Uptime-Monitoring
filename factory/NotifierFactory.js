const MailService = require("../services/MailService")
const SmsService = require("../services/SmsService")

class NotifierFactory {

    getNotifierObject(type) {

        if (type == 'SEND_EMAIL')
            return new MailService();

        else if (type == 'SEND_SMS')
            return new SmsService()
    }

}

module.exports = NotifierFactory