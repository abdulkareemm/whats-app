const trimRequest = require("trim-request");
const router = require("express").Router();

const {register, login} = require("../controllers/auth")
router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);

module.exports = router;
