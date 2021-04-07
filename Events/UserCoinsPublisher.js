
class UserCoinsPublisher {

    updateUserCoinsParams(userWallet) {
        const data = {
            userId: userWallet.userId,
            totalPoints: userWallet.totalPoints,
            AcquiredCoins: userWallet.AcquiredCoins
        }
        //console.log("message log",message)

        payloads = [{
            topic: 'walletTopic',
            messages: `{"event":"UPDATE_USER_WALLET","data":${data}}`
        }, ];


        return payloads

    }

    createUserCoinsParams(userCoins) {
        let message = JSON.stringify({
            userCoins: {
                ...userCoins
            }
        })
        const payloads = [{
            topic: 'userCoinsTopic',
            messages: `{"event":"UPDATE_USER_COINS","data":${message}}`
        }];


        return payloads

    }
}


module.exports = new UserCoinsPublisher();
