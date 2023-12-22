const router = require("express").Router();
const authRouter = require("./auth");
const conversationRouter = require("./conversation")
const messageRouter = require("./message")

router.use("/auth", authRouter);
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);




module.exports = router;
