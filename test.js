const express =  require("express")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.post("/api", (req, res)=>{
    const body = req.body.msg
    console.log({"msg":body})
    return res.json({"msg":"Result of POST"})
})

app.get("/home", (req, res)=>{
    return res.json({"msg":"home screen"})
})

app.listen(3000, ()=>{
    console.log("Server is running at PORT 3000")
})