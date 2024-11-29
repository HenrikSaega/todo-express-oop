import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(express.json())

app.get("/json-test", (req, res) => {
    res.send({
        message: "Json test ok"
    })
})

app.listen(3009, () => {
    console.log("Server is connected at port 3009")
})