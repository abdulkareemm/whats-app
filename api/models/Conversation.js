const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const ConversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversation name is required."],
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "UserModel",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);
const ConversationModel =
  mongoose.models.ConversationModel ||
  mongoose.model("ConversationModel", ConversationSchema);

module.exports = ConversationModel;