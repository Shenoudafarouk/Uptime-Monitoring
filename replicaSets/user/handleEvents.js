const eventTypes = require('../../config/events');
const userReplica = require("./userReplica")

class EventsHandler {

    handler(eventType, eventData) {

        if (eventType == eventTypes.CREATE_USER_EVENT) {

            userReplica.create(eventData);
        }

        else if (eventType == eventTypes.UPDATE_USER_EVENT) {

            userReplica.update(eventData)
        }
    }
}

module.exports= new EventsHandler();