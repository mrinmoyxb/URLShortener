const express = require("express")
const {connectMongoDB} = require("./connection")
const exp = require("constants")

// routes
const urlRoutes = require("./Routers/urlRouter")
const userUrl = require("./Routers/userRouter")

const app = express()
const PORT = 8001

// Database connection
connectMongoDB().then(()=>{
    console.log("MongoDB connected")
})

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/url", urlRoutes)
app.use("/user", userUrl)

// Port 
app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`)
})