const { Schema, model } = require("mongoose");
const { CHATS } = require("../../utils/consts");

const ChatSchema = new Schema(
  {
    name: String,
    type: {
      type: String,
      enum: [CHATS.GROUP, CHATS.PRIVATE],
      default: CHATS.PRIVATE,
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    urlImageProfile: String,
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      enum: [User.STATUS.ACTIVE, User.STATUS.INACTIVE],
      default: User.STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", ChatSchema);

module.exports = Chat;
