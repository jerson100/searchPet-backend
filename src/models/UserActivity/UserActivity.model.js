const {Schema, model} = require("mongoose");

const UserActivitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    model: {
      type: String,
      enum: ["Pet", "LostPet", "LostPetComment"],
      required: true
    },
    doc: {
        type: Schema.Types.ObjectId,
        refPath: "model",
        required: true
    },
    action: {
      type: String,
      enum: ["c","u","d"],
      required: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

const UserActivityModel = model("UserActivity", UserActivitySchema);

module.exports = UserActivityModel;