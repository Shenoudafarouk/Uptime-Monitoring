const eventTypes = require('../../config/events');
const accountTypesReplica = require("./accountTypesReplica")

class EventsHandler {

    handler(eventType, eventData) {

        if (eventType == eventTypes.CREATE_ACCOUNT_TYPE_EVENT) {

            accountTypesReplica.createAccountType(eventData);
        }

        else if (eventType == eventTypes.UPDATE_ACCOUNT_TYPE_EVENT) {

            accountTypesReplica.updateAccountType(eventData)
        }

        else if (eventType == eventTypes.CREATE_ACCOUNT_CONFIG_EVENT) {

            accountTypesReplica.createAccountConfig(eventData)
        }

        else if (eventType == eventTypes.UPDATE_ACCOUNT_CONFIG_EVENT) {

            accountTypesReplica.updateAccountConfig(eventData)
        }
    }
}

module.exports = new EventsHandler();