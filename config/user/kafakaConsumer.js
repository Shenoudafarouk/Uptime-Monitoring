var kafka = require('kafka-node'),

    consumerClient = new kafka.KafkaClient();

var offset = new kafka.Offset(consumerClient);

offset.fetch([{ topic: 'userTopic', partition: 0, time: -1 }], function (err, data) {
    console.log(data)
    var latestOffset = data['userTopic']['0'][0];
});

var userConsumer = new kafka.Consumer(
    consumerClient,
    [
        { topic: 'userTopic', partition: 0, fromOffset: -1 }
    ],
    {
        autoCommit: true
    }
);

module.exports = userConsumer ;