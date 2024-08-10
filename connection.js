const mongoose = require("mongoose")

async function connectMongoDB(){
    mongoose.connect("mongodb://localhost:27017/urlShortener")
}

module.exports = {
    connectMongoDB
}
