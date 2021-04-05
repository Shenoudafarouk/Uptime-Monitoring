const KafkaPublisher = require("../Events/KafkaPublisher")
const RedisPublisher = require("../Events/RedisPublisher")

class EventFactory {

    getEventInstance(type) {
        
        if (type == 'redisPublisher')
            return new RedisPublisher()

        if (type == 'kafkaPublisher')
            return new KafkaPublisher()
    }
}

module.exports = new EventFactory()