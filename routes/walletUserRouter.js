const express = require('express');
const walletUserValidator = require('../validation/walletUserValidator');
const walletUserController = require("../controller/walletUserController")

const router = express.Router();


router.get('/getWalletInfo', walletUserValidator.getWalletInfoValidator, walletUserController.getWalletInfo)
router.post('/addCredit', walletUserValidator.addCreditValidator, walletUserController.addCredit)
router.post('/addCoins', walletUserValidator.addCoinsValidator, walletUserController.addCoins)
router.post('/getExchangeRate', walletUserController.getExchangeRate)
router.post('/coinsToCurrency', walletUserController.coinsToCurrency)
router.post('/getWalletTransactions', walletUserController.getWalletTransactions)
router.get('/V2/getExchangeRate', walletUserController.getExchangeRatev2)
router.get('/getAcquiredCoins', walletUserValidator.getAcquiredCoins, walletUserController.getAcquiredCoins)


module.exports = router;