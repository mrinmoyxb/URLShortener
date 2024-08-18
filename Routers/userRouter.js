const express = require("express")
const {handlerSignUpUser, handlerLoginUser, getAllUsers} = require("../Controller/userController")

const router = express.Router()

router.post("/signup", handlerSignUpUser)
router.post("/login", handlerLoginUser)
router.get("/all", getAllUsers)

module.exports = router