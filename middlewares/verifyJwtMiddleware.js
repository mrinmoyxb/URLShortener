const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyJwtMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(400).json({"msg":"No authorization header"})
    }
    console.log("Header: ", authHeader)
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded)=>{
        if(err){
            return res.status(403).json({"msg":"invalid token"})
        }
        else{
            req.name = decoded.name
            next()
        }
    })
}

module.exports = {
    verifyJwtMiddleware
}