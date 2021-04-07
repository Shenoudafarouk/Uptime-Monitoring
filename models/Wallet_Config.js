const mongoose = require("mongoose");

const WalletConfigSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  PurchasedCoins: {
    type: Number,
  },
  AcquiredCoins: {
    type: Number,
  },
  lastTransactionDate: {
    type: Date,
  },
});

WalletConfigSchema.pre('save', async function (next) {
  try{
      const wallet = this
      const message = JSON.stringify({
          "balance": parseInt(wallet.totalPoints)
      })
      payloads = [{
          topic: 'graphQLSubscriptionTopic',
          messages: `{"channel":"wallet${wallet.userId}","wallet":${message}}`
      }, ];
      producer.send(payloads, function (err, data) {
          console.log(data);
      });
      //
      if (wallet.isNew) {

          const data = JSON.stringify({
              wallet: wallet.toJSON()
          })

          payloads = [{
              topic: 'walletTopic',
              messages: `{"event":"CREATE_USER_WALLET","data":${data}}`
          }, ];

          producer.send(payloads, function (err, data) {
              console.log("data", data);
          });

      } else {
          const data = JSON.stringify({
              wallet: wallet.toJSON()
          })

          payloads = [{
              topic: 'walletTopic',
              messages: `{"event":"UPDATE_USER_WALLET","data":${data}}`
          }, ];

          producer.send(payloads, function (err, data) {
              console.log("data", data);
          });
      }
      return next()
  }catch(error){
      console.log("kafka failed to send",error.message)
      next()
  }

});


module.exports = mongoose.model("wallet_config", WalletConfigSchema);
