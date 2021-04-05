var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "FROZEN"],
    default: "ACTIVE",
  },
  emailVerifiedDate: {
    type: Date,
  },
  role: {
    type: [String],
    enum: ["USER", "ADMIN", "SOCIAL"],
    default: "USER",
  },
  password: {
    type: String,
    required: true,
  },
  passwordHistory: [
    {
      type: String,
    },
  ],
  userLoginValues: [String],
  mobile: {
    type: String,
    sparse: true,
  },
  isMobileVerified: {
    type: Boolean,
    default: false,
  },
  mobileVerifiedDate: {
    type: Date,
  },
  isTemp: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationDate: {
    type: Date,
  },
  facebookToken: {
    type: String,
  },
  instagramToken: {
    type: String,
  },
  gmailToken: {
    type: String,
  },
  forgotPasswordCode: {
    type: String,
  },
  forgotPasswordCodeLink: {
    type: String,
  },
  forgotPasswordCodeExpiry: {
    type: Date,
  },
  profileImgUrl: {
    type: String,
  },
  profileThumbnail: {
    type: String,
  },
  language: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
  },
  lastLoginDateTime: {
    type: Date,
  },
  lastFailedLoginDateTime: {
    type: Date,
  },
  failedLoginAttempts: {
    type: Number,
  },
  username: {
    type: String,
  },
  jwt: {
    type: String,
  },
  jwtExpireDate: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  referralCode: {
    type: String,
  },
  refreshTokenExpireDate: {
    type: Date,
  },
  creationDateTime: {
    type: Date,
  },
  birthdate: {
    type: Date,
  },
  isSocial: {
    type: Boolean,
  },
  hasPassword: {
    type: Boolean,
  },
  socialId: {
    type: String,
  },
  failedLoginAttempts: {
    type: Number,
  },
  smsCount: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: {
    type: String,
  },
  socialType: {
    type: String,
  },
  emailVerificationCode: {
    type: String,
  },
  emailCodeExpiry: {
    type: Date,
  },
  mobileVerificationCode: {
    type: String,
  },
  mobileCodeExpiry: {
    type: Date,
  },
  frozenDate: {
    type: Date,
  },
  protectionType: {
    //this proberty is deprecated don't use this in any calculation or condition any more
    type: String,
  },
  gender: {
    type: String,
  },
  unVerifiedEmail: {
    type: String,
  },
  unVerifiedMobile: {
    type: String,
  },
  failedCodeAttempts: {
    type: Number,
    default: 0,
  },
  isProfileCompleted: {
    type: Boolean,
    default: false,
  },
  licensedDetail: {
    isLicensed: {
      type: Boolean,
      default: false,
    },
    licensedDate: Date,
    licensedType: {
      type: String,
      enum: ["PAYMENT", "DEVICE_CODE"],
    },
    orderDetail: {
      _id: String,
      items: [
        {
          itemName: String,
          itemId: String,
          quantity: Number,
          price: Number,
        },
      ],
      orderAmount: Number,
      orderCode: String,
      orderDate: Date,
    },
    bundleCode: {
      _id: String,
      code: String,
      createdByUser: {
        id: String,
        firstName: String,
        lastName: String,
      },
      assignedToUser: {
        id: String,
        firstName: String,
        lastName: String,
      },
      device: {
        name: String,
        serial: String,
        brand: String,
        mac: String,
        vendor: String,
      },
      generatedDate: {
        type: Date,
        default: Date.now,
      },

      usedDate: Date,
      licenseDetail: {
        id: String,
        price: String,
        name: String,
      },
    },
  },
  FCMToken: {
    type: String,
  },
  lastLogin: {
    fromIP: String,
    userAgent: String,
    atDate: Date,
    platform: String,
  },
  linkedAccount: [
    new Schema({
      accountType: String,
      token: String,
      accountValue: String,
      email: String,
      mobile: String,
      firstName: String,
      lastName: String,
      socialId: String,
      createDate: Date,
      username: String,
    }),
  ],
  countryRestricted: {
    type: Boolean,
    default: true,
  },
  subscriptionType: {
    type: String,
    enum: ["VIP", "FREE"],
    default: "FREE",
  },
  registrationWay: {
    type: String,
    enum: ["EMAIL", "MOBILE", "GOOGLE", "FACEBOOK", "APPLE", "INSTAGRAM"],
  },
  userObtainedPromo: [
    {
      promoCodeId: String,
      voucherRule: {
        id: String,
        name: String,
      },
      code: String,
      expiryDate: Date,
      createDate: Date,
    },
  ],
  smsReceiptStatusHistory: [
    {
      // id: String,
      outgoing_id: String,
      origin: String,
      destination: String,
      message: String,
      dateTime: String,
      status: String,
      createDate: Date,
      stringResponse: String,
    },
  ],
  rocketChat: {
    userId: String,
    token: String,
    username: String,
    email: String,
    password: String,
    name: String,
    roles: [String],
    settings: {
      chatPreviewOn: {
        type: Boolean,
        default: true,
      },
      showPhotosOn: {
        type: Boolean,
        default: true,
      },
    },
  },
  unreadNotificationsCount: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
  },
  currency: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
