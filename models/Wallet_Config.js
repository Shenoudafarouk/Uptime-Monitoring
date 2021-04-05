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
  balance: {
    // in USD
    type: Number,
    required: true,
  },
  lastTransactionDate: {
    type: Date,
  },
});

module.exports = mongoose.model("wallet_config", WalletConfigSchema);
