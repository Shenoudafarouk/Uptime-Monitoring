const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeRateSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  countryCode: {
    //ISO-3166-1 country code
    type: String,
  },
  currencyCode: {
    //iso-4217
    type: String,
    required: true,
  },
  currencyName: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
  },
  modifiedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("exchange_Rate", exchangeRateSchema);
