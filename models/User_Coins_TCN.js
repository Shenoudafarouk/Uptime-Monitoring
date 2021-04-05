const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserCoinsTcnSchema = new Schema({
  walletTransactionId: {
    type: String,
    required: true,
  },
  userCoinsId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ["DEBIT", "CREDIT"],
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  coinsType: {
    type: String,
    enum: ["AC", "PC"],
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model('UserCoinsTCN', UserCoinsTcnSchema)
