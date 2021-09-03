const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const MailService = require("./MailService");
const NotifierFactory = require("../factory/NotifierFactory");
const autoBind = require("auto-bind");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
class AuthService {

  constructor() {
    this.factory = new NotifierFactory();
    autoBind(this);
  }
  async signup({ name, password, email }) {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw {
        statusCode: 400,
        status: "USER_ALREADY_EXISTS",
        message: "this email has been already registered",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const verificationCode = Math.floor(Math.random() * 90000) + 10000;
    const emailCodeExpiry = new Date().setMinutes(new Date().getMinutes() + 10);
    const notifierObject = this.factory.getNotifierObject("SEND_EMAIL");

    
    notifierObject.send({
      to: email,
      type: "VERIFY_EMAIL",
      variables: {
        "[VERIFICATION_CODE]": verificationCode,
      },
    });

    const user = await new User({
      email,
      name,
      password: hash,
      verificationCode,
      isVerified: false,
      emailCodeExpiry,
    }).save();

    return user;
  }

  async verifyEmail({ email, code }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw {
        statusCode: 400,
        status: "USER_NOT_EXISTS",
        message: "this email has not been registered",
      };
    }

    if (new Date().getTime() > new Date(user.emailCodeExpiry).getTime())
      throw {
        statusCode: 400,
        status: "CODE_EXPIRED",
        message: "this code has been expired",
      };

    if (code != user.verificationCode)
      throw {
        statusCode: 400,
        status: "WRONG_CODE",
        message: "this code is wrong , please try again",
      };

    user.isVerified = true;
    user.save();

    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw { statusCode: 404, message: "User Not Found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { statusCode: 400, message: "Password Incorrect" };
    } else {
      const payload = {
        name: user.name,
        userId: user._id,
      };
      const token = `bearer ${jwt.sign(payload, process.env.JWT_Key, {
        expiresIn: "7d",
      })}`;

      const response = {
        access_token: token,
        expires_in: "7d",
        user: {
          userId: user._id,
        },
      };

      return response;
    }
  }

  async current({ user }) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}

module.exports = AuthService;
