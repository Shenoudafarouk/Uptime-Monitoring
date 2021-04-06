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

    const { PurchasedCoins } = await WalletConfig.findOne({ userId: userId });

    await UserCoins.updateOne(
      { _id: userCoinsId },
      { $set: { status: "EXPIRED" } }
    );

    await WalletConfig.updateOne(
      { userId: userId },
      { $set: { AccquiredCoins: 0, totalPoints: PurchasedCoins } }
    );
    let userCoinsUpdated = await UserCoins.findOne({ userId: userId });
    let data = UserCoinsPublisher.updateUserCoinsParams(userCoinsUpdated);
    let publisher = EventFactory.getEventInstance("kafkaPublisher");
    publisher.send(data);

    /* userUpdateAddedEvent(
      userId,
      "BQT_SUBSCRIPTION_DEACTIVATED",
      "id",
      bouquetId
    ); */

    
  }
}

module.exports = new ExpireEvents();
