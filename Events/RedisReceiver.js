const RedisPublisher = require("./RedisPublisher")
const ExpireEvents = require("../Events/redis/ExpireEvents");

class RedisReveiver {

    receive(subscriber) {

        subscriber.on("pmessage", async function (pattern, channel, message) {

            if (message == "expired") {

                let key = channel.split("_")[4]
                key = key.substring(1)

                let eventData = JSON.parse(key)

                if (eventData.eventName == "EXPIRE-COINS") {

                    ExpireEvents.expireCoins(eventData)

                }
            }
        });

    }

    async handleFailure() {

        let redisPublisher = new RedisPublisher()
        let currentTimestamp = new Date().getTime();

        let eventQueue = await redisPublisher.get("eventQueue");
        
        if (!eventQueue || !JSON.parse(eventQueue).length)
            return []

        eventQueue = JSON.parse(eventQueue);

        console.log(eventQueue);
        
        if (eventQueue && eventQueue.length) {

            for (let index = 0; index < eventQueue.length; index++) {

                const element = eventQueue[index];

                if (element.timestamp < currentTimestamp) {
                    ExpireEvents.expireCoins(element)
                    eventQueue[index] = 0
                }
            }

            eventQueue = eventQueue.filter(item => item);

            redisPublisher.set({ key: "eventQueue", value: JSON.stringify(eventQueue) })
        }
    }
}

module.exports = RedisReveiver;