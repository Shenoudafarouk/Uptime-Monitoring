var kafka = require('kafka-node'),

    consumerClient = new kafka.KafkaClient();

var offset = new kafka.Offset(consumerClient);

offset.fetch([{ topic: 'userAccountTopic', partition: 0, time: -1 }], function (err, data) {
    console.log(data)
    var latestOffset = data['userAccountTopic']['0'][0];
});

var userAccountConsumer = new kafka.Consumer(
    consumerClient,
    [
        { topic: 'userAccountTopic', partition: 0, fromOffset: -1 }
    ],
    {
        autoCommit: true
    }
);

module.exports=  userAccountConsumer 