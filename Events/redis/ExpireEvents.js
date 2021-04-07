const { userUpdateAddedEvent } = require("../../util/utils");

const UserCoins = require("../../models/User_Coins");
const UserCoinsTransactions = require("../../models/User_Coins_Transactions");
const WalletConfig = require("../../models/Wallet_Config");

const EventFactory = require("../../Events/EventFactory");
const UserCoinsPublisher = require("../../Events/UserCoinsPublisher");

class ExpireEvents {
  async expireCoins(eventData) {
    console.log(eventData);

    let userCoinsId = eventData.userCoinsId;
    let userId = eventData.userId;
    let remainingAmount = await UserCoins.findOne({_id: userCoinsId});

    const { AcquiredCoins , totalPoints} = await WalletConfig.findOne({ userId: userId });

    await UserCoins.updateOne(
      { _id: userCoinsId },
      { $set: { status: "EXPIRED" } }
    );

    await WalletConfig.updateOne(
      { userId: userId },
      { $set: { AcquiredCoins: AcquiredCoins - remainingAmount, totalPoints: totalPoints  - remainingAmount } }
    );
    

    let userWalletUpdated = await WalletConfig.findOne({ userId: userId });
    let data = UserCoinsPublisher.updateUserCoinsParams(userWalletUpdated);
    let publisher = EventFactory.getEventInstance("kafkaPublisher");
    publisher.send(data);
    
  }
}

module.exports = new ExpireEvents();
