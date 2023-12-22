const router = require("express").Router();
const trimRequest = require("trim-request");
const { auth } = require("../middlewares/auth");
const {
  sendMessage, getMessage,
} = require("../controllers/message");

router.route("/").post(auth, sendMessage);
router.route("/:convo_id").get(auth, getMessage);


module.exports = router;
