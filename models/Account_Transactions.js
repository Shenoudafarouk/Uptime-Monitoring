const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const accountTransactionsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  accountConfigId: {
    type: String,
    required: true,
  },
  accountCategoryId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  modifiedDate: {
    type: Date,
  },
  transactionDeductedAmount: {
    type: Number,
    required: true,
  },
  transactionDescription: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: [
      "ACCOUNT_TYPE_REGISTERATION",
      "ACCOUNT_TYPE_AUTORENEW",
      "ACCOUNT_TYPE_UPGRADE",
      "ACCOUNT_TYPE_DOWNGRADE",
      "STORE_TRIAL",
      "STORE_BUY",
      "PROMOTION_FROM_ADMIN",
      "PROMOTION_FROM_CODE",
    ],
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Expired", "Consumed"],
    required: true,
  },
  vodTransactionId: {
    type: String,
    required: true,
  },
  liveTransactionId: {
    type: String,
    required: true,
  },
  terminationDate: {
    type: Date,
  },
  remainingWatchinghours: {
    type: Number,
    required: true,
  },
  availableWatchingHours: {
    type: Number,
    required: true,
  },
  unlocks: {
    type: Number,
    require: true,
  },
  remainingUnlocks: {
    type: Number,
    require: true,
  },
  accountConfiguration: {
    /// used as history filled when terminated
    accountName: {
      type: String,
    },
    accountDescription: {
      type: String,
    },
    accountCategoryName: {
      type: String,
    },
    accountCategoryId: {
      type: String,
    },
    duration: {
      type: Number,
    },
    availableWatchingHours: {
      type: Number,
    },
    remainingWatchingHours: {
      type: Number,
    },
    isDefault: {
      type: Boolean,
    },
    EPG: {
      type: Boolean,
    },
    maxPlaybackDuration: {
      type: Number,
    },
    maxLiveQuality: {
      type: String,
    },
    chatEnabled: {
      type: Boolean,
    },
    maxPrivateChatRooms: {
      type: Number,
    },
    availableAdsTypes: [
      {
        type: String,
      },
    ],
    availableSupportTypes: [
      {
        type: String,
      },
    ],
    unlocks: {
      type: Number,
    },
    remainingUnlocks: {
      type: Number,
    },
    price: {
      originalAmount: { type: Number },
      countryId: { type: String },
      deductedAmount: { type: Number },
    },
    source: {
      sourceType: { type: String },
      sourceId: { type: String },
    },
  },
  walletTransactionId: {
    type: String,
  },
});

module.exports = mongoose.model(
  "account_transactions",
  accountTransactionsSchema
);
