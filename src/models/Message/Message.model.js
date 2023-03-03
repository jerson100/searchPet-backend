const { Schema, model } = require("mongoose");
const { User } = require("../../utils/consts");

const MessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
    image: String,
    cords: [
      {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: [Number],
      },
    ],
    status: {
      type: Number,
      enum: [User.STATUS.ACTIVE, User.STATUS.INACTIVE],
      default: User.STATUS.ACTIVE,
    },
    seen: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", MessageSchema);

module.exports = {
  Message,
};
