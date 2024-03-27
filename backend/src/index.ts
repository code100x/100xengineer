import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import chatRouter from "./routes/Chat"
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.use("/", chatRouter)

app.listen(3000,()=> {
    console.log("Listening on port 3000")
})