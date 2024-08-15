const mongoose = require("mongoose")

// Schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    noOfVisits: {
        type: Number,
        required: true,
        default: 0
    },
    visitHistory: [{timestamp: {type: Number}}]
}, {timestamps: true})

// Model
const URL = mongoose.model("url", urlSchema)

module.exports = URL