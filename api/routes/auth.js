const trimRequest = require("trim-request");
const router = require("express").Router();

const {register} = require("../controllers/auth")
router.post("/register", trimRequest.all, register);
module.exports = router;
