
class UserAccountPublisher {

    updateUserAccountParams(userAccount) {
        const message = {
            ...userAccount._doc,
            epgEnabled: userAccount.EPG,
            availableSupportTypes: userAccount.availableSupportTypes[0],
        }
        //console.log("message log",message)
        let payloads = [{
            topic: 'graphQLSubscriptionTopic',
            messages: `{"channel":"account${userAccount.userId}","account":${JSON.stringify(message)}}`
        },
        {
            topic: 'userAccountTopic',
            messages: `{"event":"UPDATE_ACCOUNT_TYPE","data":${JSON.stringify({ userAccount: message })}}`
        }
        ];

        return payloads

    }

    createUserAccountParams(userAccount) {
        let message = JSON.stringify({
            userAccount: {
                ...userAccount
            }
        })
        const payloads = [{
            topic: 'userAccountTopic',
            messages: `{"event":"CREATE_ACCOUNT_TYPE","data":${message}}`
        }];


        return payloads

    }
}


module.exports = new UserAccountPublisher();
