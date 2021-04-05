const mongoose = require("mongoose");
const {
  userAccountStatusEnum,
  availableLiveBouquetStatusEnum,
  availableVodTitlesStatusEnum,
  mediaProviderUrlEnum,
  sourceEnum,
} = require("../config/constants/User_Account");
const {
  availableAdsTypesEnum,
  availableSupportTypesEnum,
  subscribedVODTypeEnum,
} = require("../config/constants/general");

const userAccountSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
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
  remainingWatchingHours: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      userAccountStatusEnum.ACTIVE,
      userAccountStatusEnum.INACTIVE,
      userAccountStatusEnum.EXPIRED,
      userAccountStatusEnum.CONSUMED,
    ],
    required: true,
  },
  isDefaultAccountType: {
    type: Boolean,
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    deductedAmount: {
      type: Number,
      required: true,
    },
    countryId: {
      type: String,
      required: true,
    },
  },
  EPG: {
    type: Boolean,
    required: true,
  },
  maxPlaybackDuration: {
    type: Number,
    required: true,
  },
  maxLiveQuality: {
    type: String,
    required: true,
  },
  chatEnabled: {
    type: Boolean,
    required: false,
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
    required: true,
  },
  remainingUnlocks: {
    type: Number,
    required: true,
  },
  accountTypeTransactionId: {
    type: String,
    required: true,
  },
  subscribedVODType: {
    type: String,
    required: true,
    enum: [
      subscribedVODTypeEnum.STANDARD,
      subscribedVODTypeEnum.FREE,
      subscribedVODTypeEnum.VIP,
      subscribedVODTypeEnum.PREMIUM,
    ],
  },
  availableLiveBouquet: [
    {
      bouquetId: {
        type: String,
        required: true,
      },
      bouquetName: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        default: new Date(),
      },
      endDate: {
        type: Date,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
      price: {
        amount: {
          type: Number,
          required: true,
        },
        countryId: {
          type: String,
          required: true,
        },
        deductedAmount: {
          type: Number,
          required: true,
        },
      },
      status: {
        type: String,
        enum: [
          availableLiveBouquetStatusEnum.ACTIVE,
          availableLiveBouquetStatusEnum.INACTIVE,
        ],
        required: true,
      },

      source: {
        id: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    },
  ],
  creationDate: {
    type: Date,
    default: new Date(),
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  availableVodTitles: [
    {
      titleId: {
        type: String,
      },
      startDate: {
        type: Date,
        default: new Date(),
      },
      endDate: {
        type: Date,
      },

      drmProtected: {
        type: Boolean,
      },
      remainingHours: {
        type: Number,
      },
      watchingHours: {
        type: Number,
      },
      token: {
        type: String,
      },
      status: {
        type: String,
        enum: [
          availableVodTitlesStatusEnum.ACTIVE,
          availableVodTitlesStatusEnum.INACTIVE,
        ],
        required: true,
      },

      videoId: String,

      mediaProvider: {
        mediaProviderId: {
          type: String,
        },
        mediaProviderName: {
          type: Object,
        },
        url: [
          {
            protocol: {
              type: String,
              enum: [
                mediaProviderUrlEnum.HLS,
                mediaProviderUrlEnum.MPEG_DASH,
                mediaProviderUrlEnum.External,
              ],
            },
            encoding: {
              type: String,
              enum: [mediaProviderUrlEnum.HEVC, mediaProviderUrlEnum.H264],
            },
            url: {
              type: String,
            },
          },
        ],
        quality: {
          type: String,
        },
        price: {
          originalAmount: {
            type: Number,
            required: true,
          },
          countryId: {
            type: String,
            required: true,
          },
          deductededAmount: {
            type: String,
            required: true,
          },
        },
        source: {
          sourceType: {
            type: String,
            required: true,
            enum: ["ACCOUNT_TYPE", "PROMOTION", "RENT"],
          },
          SourceId: {
            type: String,
          },
        },
      },
    },
  ],
  availableUnlockedTitles: [
    {
      titleId: {
        type: String,
      },
      titleType: {
        type: String,
      },
      providerId: {
        type: String,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  source: {
    sourceType: {
      type: String,
      required: true,
      enum: [sourceEnum.ACCOUNT_TYPE, sourceEnum.PROMOTION],
    },
    sourceId: {
      type: String,
    },
  },
  maxPrivateChatRooms: {
    type: Number,
    required: true,
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

  addonsWatchingHours: {
    type: Number,
  },

  addonsRemainingWatchingHours: {
    type: Number,
  },

  lastRequestDateOfTariffLink: {
    type: Date,
  },
  nextRenewalAccount: {
    type: String,
  },
  autoRenew: {
    type: Boolean,
    default: true,
  },
  hasBillingCycle: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user_account", userAccountSchema);
