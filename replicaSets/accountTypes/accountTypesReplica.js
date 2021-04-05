const UserAccount = require("../../models/User_Account");
const AccointConfig = require("../../models/Account_Config");

class AccountTypesReplica {

    createAccountType(accountTypesData) {

        accountTypesData = accountTypesData.userAccount;
        let userAccount = new UserAccount(accountTypesData);
        userAccount.save();
    }

    updateAccountType(accountTypesData) {

        accountTypesData = accountTypesData.userAccount._doc || accountTypesData.userAccount;
        UserAccount.updateOne({ _id: accountTypesData._id }, {
            $set: {
                ...accountTypesData
            }
        }, function (err, response) {

            if (err)
                console.log(err);

            if (response)
                console.log(response);

        })
    }

    createAccountConfig(accountConfigData) {

        accountConfigData = accountConfigData.accountCofigs;

        AccointConfig.create(accountConfigData, function (err, response) {

            if (err)
                console.log(err);

            if (response)
                console.log(response);

        })
    }


    updateAccountConfig(accountConfigData) {

        accountConfigData = accountConfigData.accountCofigs;

        for (const config of accountConfigData) {

            AccointConfig.updateOne({
                _id: config.accountConfigId,
            }, {
                    $set: {
                        ...config
                    }
                }, function (err, response) {

                    if (err)
                        console.log(err);

                    if (response) {
                        console.log(response);
                    }

                });
        }

    }
}


module.exports = new AccountTypesReplica();