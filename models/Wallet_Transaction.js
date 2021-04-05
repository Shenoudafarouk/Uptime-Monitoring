const mongoose = require('mongoose');

const WalletTransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    walletId: {
        type: String,
        required: true
    },
    amountInPoints: {
        type: Number,
        required: true
    },
    amountInPrice: { // in USD
        type: Number,
    },
    transactionType: {
        type: String,
        required: true
    },
    paymentReferenceSource: {
        type: String,
        required: true
    },
    paymentReferenceId: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    transactionDescription: {
        en: {
            type: String,
            required: true,
        },
        ar: {
            type: String,
            required: true,
        },
        fr: {
            type: String,
            required: true,
        },
    },
    transactionTitle: {
        en: {
            type: String,
            required: true,
        },
        ar: {
            type: String,
            required: true,
        },
        fr: {
            type: String,
            required: true,
        },
    },
    transactionCurrency: {
        type: String,
    },
    referenceType: {
        type: String,
    },
    referenceId: {
        type: String,
    }

});

WalletTransactionSchema.index({
    creationDate: -1
})
WalletTransactionSchema.index({
    userId: -1
})

module.exports = mongoose.model('wallet_transaction', WalletTransactionSchema);