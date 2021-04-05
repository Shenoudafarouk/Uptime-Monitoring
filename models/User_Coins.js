const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  ExpirationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('UserCoins', UserCoinsSchema);

