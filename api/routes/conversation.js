const router = require("express").Router();
const trimRequest = require("trim-request");
const { auth } = require("../middlewares/auth");

const {
  create_open_conversation, getConversations,
} = require("../controllers/conversation");


router
  .route("/")
  .post(auth, create_open_conversation)
  .get(auth, getConversations);


module.exports = router;