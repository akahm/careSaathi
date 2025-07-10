const express = require("express");
const router = express.Router();

const {signupRegister,upload}=require("../controllers/signupRegister.js")

router.post("/register/user",upload.none() ,signupRegister);

module.exports = router;
