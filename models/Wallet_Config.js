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
  AccquiredCoins: {
    type: Number,
  },
  lastTransactionDate: {
    type: Date,
  },
});


module.exports = mongoose.model("wallet_config", WalletConfigSchema);
