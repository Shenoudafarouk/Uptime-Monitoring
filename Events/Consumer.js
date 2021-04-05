const userConsumer = require("../config/user/kafakaConsumer")
const userAccountConsumer = require("../config/accountTypes/kafkaConsumer")
const walletConsumer =  require("../config/wallet/kafkaConsumer")

const userHandleEvents =  require("../replicaSets/user/handleEvents")
const userAccountHandleEvents =  require("../replicaSets/accountTypes/handleEvents")
const walletHandleEvents =  require("../replicaSets/wallet/handleEvents")

userConsumer.on('message', function (message, error) {

    if (error)
        console.log(error);
        
    let event = JSON.parse(message.value);
    userHandleEvents.handler(event.event, event.data)
});



userAccountConsumer.on('message', function (message, error) {

    if (error)
        console.log(error);

    let event = JSON.parse(message.value);
    userAccountHandleEvents.handler(event.event, event.data)
});

walletConsumer.on('message', function (message, error) {

    if (error)
        console.log(error);

    let event = JSON.parse(message.value);
    walletHandleEvents.handler(event.event, event.data)
});



module.exports = { userConsumer, userAccountConsumer, walletConsumer};



