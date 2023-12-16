const router = require("express").Router();
const authRouter = require("./auth");
const conversationRouter = require("./conversation")

router.use("/auth", authRouter);
router.use("/conversation", conversationRouter);



module.exports = router;
