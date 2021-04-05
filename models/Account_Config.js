var mongoose = require("mongoose");
var {
  maxLiveQualityEnum,
  subscribedLiveTVBouquetEnum,
  accountTypesStatusEnum,
} = require("../config/constants/Account_Config");

var {
  subscribedVODTypeEnum,
  availableAdsTypesEnum,
  availableSupportTypesEnum,
} = require("../config/constants/general");

var accountConfigSchema = new mongoose.Schema(
  {
    originalAccountConfigId: {
      type: String,
      required: true,
    },

    RegisterationWatchingHour: {
      type: Number,
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
      enum: [
        maxLiveQualityEnum.SD,
        maxLiveQualityEnum.HD,
        maxLiveQualityEnum.FULL_HD,
      ],
    },
    chatEnabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    availableAdsTypes: [
      {
        type: String,
        enum: [
          availableAdsTypesEnum.NONE,
          availableAdsTypesEnum.STREAM_ADS,
          availableAdsTypesEnum.VOD_ADS,
          availableAdsTypesEnum.APP_ADS,
        ],
        required: true,
      },
    ],
    availableSupportTypes: [
      {
        type: String,
        enum: [
          availableSupportTypesEnum.OFFLINE,
          availableSupportTypesEnum.ONLINE_STANDARD,
          availableSupportTypesEnum.ONLINE_PREMIUM,
        ],
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
      enum: [
        subscribedVODTypeEnum.FREE,
        subscribedVODTypeEnum.STANDARD,
        subscribedVODTypeEnum.PREMIUM,
        subscribedVODTypeEnum.VIP,
      ],
    },
    subscribedLiveTVBouquet: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      status: {
        type: String,
        default: "Active",
        enum: [
          subscribedLiveTVBouquetEnum.ACTIVE,
          subscribedLiveTVBouquetEnum.INACTIVE,
        ],
      },
    },
    maxPrivateChatRooms: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        accountTypesStatusEnum.ACTIVE,
        accountTypesStatusEnum.INACTIVE,
        accountTypesStatusEnum.DELETED,
      ],
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

module.exports = mongoose.model("account_config", accountConfigSchema);
