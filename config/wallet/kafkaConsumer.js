var kafka = require('kafka-node'),

    consumerClient = new kafka.KafkaClient();

var offset = new kafka.Offset(consumerClient);

offset.fetch([{ topic: 'walletTopic', partition: 0, time: -1 }], function (err, data) {
    console.log(data)
    var latestOffset = data['walletTopic']['0'][0];
});

var walletConsumer = new kafka.Consumer(
    consumerClient,
    [
        { topic: 'walletTopic', partition: 0, fromOffset: -1 }
    ],
    {
        autoCommit: true
    }
);

module.exports= walletConsumer 