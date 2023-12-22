const router = require("express").Router();
const trimRequest = require("trim-request");
const { auth } = require("../middlewares/auth");
const {
  sendMessage,
} = require("../controllers/message");

router.route("/").post(auth, sendMessage);

module.exports = router;
