const Wallet = require ("../../models/Wallet_Config");

class WalletReplica {

    create(walletData) {

        walletData = walletData.wallet;

        let wallet = new Wallet(walletData)
        wallet.save();
    }

    update(walletData) {

        console.log(walletData);
        
        walletData = walletData.wallet;
        delete walletData._id;

        Wallet.updateOne({ userId: walletData.userId }, {
            $set: {
                ...walletData
            }
        }, function (err, response) {
            if (err)
                console.log(err);

            if (response){
                console.log(response);
            }
        })

    }
}

module.exports = new WalletReplica();