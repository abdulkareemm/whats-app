const createHttpError = require("http-errors");
const { ConversationModel, UserModel } = require("../models");


exports.doesConversationExists = async (sender_id, receiver_id) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      {
        users: { $elemMatch: { $eq: sender_id } },
        users: { $elemMatch: { $eq: receiver_id } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos) throw createHttpError.BadRequest("Oops.. Something wrong.");

  // populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });
  return convos[0];
};

exports.createChat = async (data) => {
  let newConvo = await ConversationModel.create(data);
  if (!newConvo) {
    throw createHttpError.BadRequest("Oops... Something went wrong!");
  }
  return newConvo;
};
exports.populatedConversation = async (id, fieldToPopulate, fieldsToRemove) => {
  const populatedConvo = await ConversationModel.findById(id).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops.. Something went wrong !");
  return populatedConvo;
};
exports.getUserConversation = async (userId) => {
  let conversation;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password -createdAt -updatedAt -__v")
    .populate("admin", "-passwor")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversation = results;
    })
    .catch((err) => {
      console.log(err);
      throw createHttpError.BadRequest("Oops... Something went wrong!");
    });
  return conversation;
};