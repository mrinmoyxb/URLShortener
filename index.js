const express = require("express")
const {connectMongoDB} = require("./connection")
require("dotenv").config()

const app = express()

// Database connection
connectMongoDB().then(()=>{
    console.log("MongoDB connected")
})

// routes
const urlRoutes = require("./Routers/urlRouter")
const userUrl = require("./Routers/userRouter")

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/url", urlRoutes)

// Port 
app.listen(process.env.PORT, ()=>{
    console.log(`Server started at PORT ${process.env.PORT}`)
})