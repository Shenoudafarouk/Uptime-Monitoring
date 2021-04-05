const redis = require("redis");
const Promise = require("bluebird");
const redisAsync = Promise.promisifyAll(redis);
/*
 * Redis server configuration
 */
const CONF = { db: 0 }

const pub = redisAsync.createClient(CONF)


pub.on("connect", () => {
    console.log("Redis publisher client connected!");
});
pub.on("error", (error) => {
    console.error("Redis not connected!", error);
});


pub.config('set', 'notify-keyspace-events', 'KEA')

module.exports.publisher = pub;
