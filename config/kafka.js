// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['127.0.0.1:9092']
// })
var kafka = require('kafka-node'),
  Producer = kafka.Producer,
  client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:9092' }),
  producer = new Producer(client),
  KeyedMessage = kafka.KeyedMessage

// Imports the Google Cloud client library

//const producer = {};
module.exports = {
  producer
}
