const sessionIdToUserMap = new Map()
const jwt = require("jsonwebtoken")
const SECRET_KEY = "mrindev123"

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
         SECRET_KEY)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret)
}

module.exports = {
    setUser, 
    getUser
}