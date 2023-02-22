const { model, Schema } = require("mongoose");
const { NOTIFICATIONS } = require("../../utils/consts");

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [NOTIFICATIONS.LOST_PET_COMMENT],
    },
    content: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
    },
    seen: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model("Notification", NotificationSchema);

module.exports = { Notification };
