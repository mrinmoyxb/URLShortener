const express = require("express")
const path = require("path")
const {connectMongoDB} = require("./connection")
const exp = require("constants")
const URL = require("./Model/urlShortenerModel")

// routes
const urlRoutes = require("./Routers/urlRouter")
const userUrl = require("./Routers/userRouter")
const staticRoute = require("./Routers/staticRouter")

const app = express()
const PORT = 8001

// Database connection
connectMongoDB().then(()=>{
    console.log("MongoDB connected")
})

app.set("view engine", "ejs")
app.set("views", path.resolve("./View"))

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/url", urlRoutes)
app.use("/user", userUrl)
app.use("/", staticRoute)

app.get("/test", async (req, res) => {
    const allUrls = await URL.find();
    return res.render("test", {
        urls: allUrls
    })
})

// Port 
app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`)
})