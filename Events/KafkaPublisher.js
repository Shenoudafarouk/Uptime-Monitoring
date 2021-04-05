const { producer } = require("../config/kafka");

class KafkaPublisher {

    send(payloads) {

        producer.send(payloads, function (err, data) {
            if (err) console.log(err);

            console.log(data);
        });
    }

}


module.exports = KafkaPublisher;