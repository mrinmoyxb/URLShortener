const express = require("express")
const {handlerSignUpUser, handlerLoginUser} = require("../Controller/userController")

const router = express.Router()

router.post("/signUp", handlerSignUpUser)
router.post("/login", handlerLoginUser)

module.exports = router