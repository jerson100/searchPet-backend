const NotificationService = require("../services/notificationService");

const allByUserId = async (req, res) => {
  const { _id: userId } = req.user;
  const { length, page } = req.query;
  const allNotifications = await NotificationService.allByUserId(
    { userId },
    { length, page }
  );
  res.status(200).json(allNotifications);
};

module.exports = {
  allByUserId,
};
