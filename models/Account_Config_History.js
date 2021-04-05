var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var accountConfigHistorySchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    originalAccountConfigId: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    modifiedDate: {
      type: Date,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountDescription: {
      type: String,
      required: true,
    },
    accountCategoryName: {
      type: String,
      required: true,
    },
    accountCategoryId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    availableWatchingHours: {
      type: Number,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    price: [
      {
        amount: { type: Number, required: true },
        countryId: { type: String, required: true },
        _id: false,
      },
    ],
    EPG: {
      type: Boolean,
      required: true,
      default: true,
    },
    maxPlaybackDuration: {
      type: Number,
      required: true,
      default: 2,
    },
    maxLiveQuality: {
      type: String,
      required: true,
      enum: ["SD", "HD", "FULL_HD"],
    },
    chatEnabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    availableAdsTypes: [
      {
        type: String,
        enum: ["NONE", "STREAM_ADS", "VOD_ADS", "APP_ADS"],
        required: true,
      },
    ],
    availableSupportTypes: [
      {
        type: String,
        enum: ["OFFLINE", "ONLINE_STANDARD", "ONLINE_PREMIUM"],
        required: true,
      },
    ],
    unlocks: {
      type: Number,
      require: true,
    },
    subscribedVODType: {
      type: String,
      require: true,
      enum: ["STANDARD", "FREE", "VIP", "PREMIUM"],
    },
    subscribedLiveTVBouquet: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
    },
    maxPrivateChatRooms: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      required: true,
    },
    isAvailableToMarket: {
      type: Boolean,
      default: false,
    },
    accountTypeLevel: {
      type: Number,
      required: true,
    },
    marketingDescription: {
      categoryDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      liveTvBouquetDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      epgDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      playbackDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      liveTvQualityDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      chattingDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      creatingChattingRoomDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      vodTitleTypeDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      adsDecription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      supportDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
      renewalDescription: {
        value: {
          type: String,
          required: true,
        },
        flag: {
          type: Boolean,
          required: true,
        },
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "account_config_history",
  accountConfigHistorySchema
);
