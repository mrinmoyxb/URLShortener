const express = require("express")
const urlRoutes = require("./Routers/urlRouter")
const {connectMongoDB} = require("./connection")
const exp = require("constants")
const URL = require("./Model/urlShortenerModel")

const app = express()
const PORT = 8001

// Database connection
connectMongoDB().then(()=>{
    console.log("MongoDB connected")
})

// Middleware
app.use(express.json())
app.use("/url", urlRoutes)

// Port 
app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`)
})