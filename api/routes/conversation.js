const router = require("express").Router();
const trimRequest = require("trim-request");
const { auth } = require("../middlewares/auth");

const {
  create_open_conversation,
} = require("../controllers/conversation");


router
  .route("/")
  .post(auth, create_open_conversation)

module.exports = router;