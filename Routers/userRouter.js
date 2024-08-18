const express = require("express")
const {handlerSignUpUser, handlerLoginUser, getAllUsers} = require("../Controller/userController")
const {verifyJwtMiddleware} = require("../middlewares/verifyJwtMiddleware")

const router = express.Router()

router.post("/signup", handlerSignUpUser)
router.post("/login", handlerLoginUser)
router.get("/all", verifyJwtMiddleware, getAllUsers)

module.exports = router