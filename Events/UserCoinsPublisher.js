
class UserCoinsPublisher {

    updateUserCoinsParams(userCoins) {
        const message = {
            _id: userCoins._id,
            userId: userCoins.userId,
            status: userCoins.status
        }
        //console.log("message log",message)
        let payloads = [
        {
            topic: 'userCoinsTopic',
            messages: `{"event":"UPDATE_USER_COINS","data":${JSON.stringify({ userAccount: message })}}`
        }
        ];

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
