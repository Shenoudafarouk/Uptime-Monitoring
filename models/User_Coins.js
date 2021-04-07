const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventFactory = require("../Events/EventFactory");
const {
  producer
} = require("../config/kafka")

const UserCoinsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  actualAmount: {
    type: String,
    required: true,
  },
  remainingAmount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["AC", "PC"],
  },
  source: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

UserCoinsSchema.pre("save", async function (next) {

  let coins = this;
  if (this.isNew && this.type == "AC") {

    let eventClass = EventFactory.getEventInstance("redisPublisher")

    let coinsProps = {
      key: {
        userCoinsId: coins._id.toString(),
        userId: coins.userId,
        eventName: "EXPIRE-COINS",
        timestamp: new Date(coins.expirationDate).getTime(),
      },
      timestamp: new Date(coins.expirationDate).getTime(),
    }

    await eventClass.send(coinsProps)
  }

  next()
})

module.exports = mongoose.model('UserCoins', UserCoinsSchema);

