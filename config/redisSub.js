const redis = require("redis");
const RedisReceiver = require("../Events/RedisReceiver")
/*
 * Redis server configuration
 */
const CONF = { db: 0 }

const subscriber = redis.createClient(CONF)

subscriber.on("connect", () => {
    console.log("Redis subscriber client connected!");
    new RedisReceiver().handleFailure()
});

subscriber.on("error", (error) => {
    console.error("Redis not connected!", error);
});

subscriber.psubscribe("__keyspace@0__:*")

new RedisReceiver().receive(subscriber)

module.exports.subscriber = subscriber;
