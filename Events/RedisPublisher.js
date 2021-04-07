const { publisher } = require("../config/redisPub")

const { promisify } = require("util");
const getAsync = promisify(publisher.get).bind(publisher);

class RedisPublisher {

    async get(key) {

        return await getAsync(key)
    }

    set(event) {

        publisher.set(event.key, event.value)

    }

    async send(payloads) {

        let key = JSON.stringify(payloads.key)
        let timestamp = payloads.timestamp;

        let queue = await this.get("eventQueue")

        if (!queue || !JSON.parse(queue).length) {

            queue = JSON.stringify([JSON.parse(key)])
        }

        else {
            JSON.parse(queue).push(key)
        }

        publisher.set("eventQueue", queue)

        //publisher.set(key, "1")

        publisher.pexpireat(key, timestamp)
    }
}

module.exports = RedisPublisher;