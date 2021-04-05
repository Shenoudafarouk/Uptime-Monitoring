const User = require("../../models/user");

class UserReplica {

    create(userData) {

        userData = userData.user;
        let user = new User(userData)
        user.save();
    }

    update(userData) {

        userData = userData.user;

        User.updateOne({ _id: userData._id }, {

            $set: {
                ...userData
            },
        }, function (err, response) {

            if (err)
                console.log(err);

            else {

                console.log(response);
            }

        })
    }
}

module.exports = new UserReplica();