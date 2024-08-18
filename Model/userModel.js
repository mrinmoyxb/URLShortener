const mongoose = require("mongoose")

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

// Model
const User = mongoose.model("user", userSchema)

module.exports = User