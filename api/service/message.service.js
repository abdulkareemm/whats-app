const createHttpError = require("http-errors");
const { MessageModel, ConversationModel } = require("../models");

exports.createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return newMessage;
};

exports.populatedMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!msg) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return msg;
};

exports.updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return updatedConvo;
};

exports.getConvoMessages = async (id) => {
  const messages = await MessageModel.find({ conversation: id })
    .populate("sender", "name picture email status")
    .populate("conversation");
  if (!messages) {
    throw createHttpError.BadRequest("Oops... Something went wrong !");
  }
  return messages;
};