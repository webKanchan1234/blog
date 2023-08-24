const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const post = require("./route/postRoute")
const user = require("./route/userRoute")
const fileUpload = require("express-fileupload")
const errorMiddleware = require("./middlware/error")


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use(cors())

app.use("*",cors({
    origin: true,
    credentials: true
}))



app.use("/api/v1",post)
app.use("/api/v1",user)

app.use(errorMiddleware)

module.exports = app