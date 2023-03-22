const { Schema, model } = require("mongoose");
const { User, MESSAGES } = require("../../utils/consts");

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
    type: {
      type: String,
      enum: [MESSAGES.TYPES.CORDS, MESSAGES.TYPES.IMAGE, MESSAGES.TYPES.TEXT],
      default: MESSAGES.TYPES.TEXT,
    },
    text: String,
    images: [String],
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
