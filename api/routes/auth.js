const trimRequest = require("trim-request");
const router = require("express").Router();

const {register, login} = require("../controllers/auth");
const { logout, refreshToken } = require("../service/auth.service");
router.post("/register", trimRequest.all, register);
router.post("/login", trimRequest.all, login);
router.get("/logout", trimRequest.all, logout);
router.get("/refreshtoken", trimRequest.all, refreshToken);



module.exports = router;
