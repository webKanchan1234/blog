const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const post = require("./route/postRoute")
const user = require("./route/userRoute")
const fileUpload = require("express-fileupload")
const errorMiddleware = require("./middlware/error")
const path = require("path");

// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// app.use(cors())

app.use("*",cors({
    origin: true,
    credentials: true
}))


app.use("/api/v1",post)
app.use("/api/v1",user)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)

module.exports = app
// arQnumUzQjXnweev