const mongoose = require("mongoose")

// Visit History Schema
const visitHistorySchema = new mongoose.Schema({
    timestamp: {
        type: Number
    },
    docId: {
        type: Number
    }
})

// Schema
const urlSchema = new mongoose.Schema({
    urlId: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
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
    visitHistory: [visitHistorySchema]
}, {timestamps: true})



// Model
const URL = mongoose.model("url", urlSchema)

module.exports = URL