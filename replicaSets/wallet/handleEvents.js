const eventTypes = require('../../config/events');
const walletReplica = require("./walletReplica")

class EventsHandler {

    handler(eventType, eventData) {

        if (eventType == eventTypes.CREATE_USER_WALLET_EVENT) {

            walletReplica.create(eventData)
        }
        if (eventType == eventTypes.UPDATE_USER_WALLET_EVENT) {

            walletReplica.update(eventData)
        }
    }
}

module.exports = new EventsHandler();