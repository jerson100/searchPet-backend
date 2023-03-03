// const {
//   NotificationException,
// } = require("../models/Notification/Notification.exception");
const { Notification } = require("../models/Notification/Notification.model");
// const { Types } = require("mongoose");
// const User = require("../models/User/user.model");

const create = async ({ from, to, type, content, seen = false, path }) => {
  //   const userTo = User.findOne({ _id: to, status: 1 });
  //   if (!userTo) {
  //     throw new NotificationException("El usuario destino no existe");
  //   }
  const newNotification = new Notification({
    from,
    to,
    type,
    content,
    seen,
    path,
  });
  //   console.log(`New notification -> ${newNotification}`);
  await newNotification.save();
  return newNotification;
};

const updateSeen = async ({ idNotification }) => {
  const updatedNotification = await Notification.updateOne(
    { _id: idNotification },
    {
      $set: {
        seen: true,
      },
    }
  );
  return updatedNotification;
};

const allByUserId = async ({ userId }, { sort = -1, length = 5, page = 0 }) => {
  const notifications = await Notification.find({
    to: userId,
  })
    .populate({
      path: "from",
      select: "_id username email status urlImageProfile typeUser",
      match: {
        status: 1,
      },
    })
    .sort({
      createdAt: sort,
    })
    .skip((page > 0 ? page - 1 : 0) * length)
    .limit(length);
  return notifications;
};

module.exports = {
  create,
  allByUserId,
  updateSeen,
};
