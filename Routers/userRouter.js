const express = require("express")
const {handlerSignUpUser} = require("../Controller/userController")

const router = express.Router()

router.post("/signUp", handlerSignUpUser)

module.exports = router