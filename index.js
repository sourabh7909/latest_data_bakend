const express=require("express")
const { connection } = require("./db")

require("dotenv").config()
const cors=require("cors")
const { userRouter } = require("./routes/userRoutes")
const { blogRouter } = require("./routes/blogsRoute")
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use("/blogs",blogRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to the db")
        console.log(`server is runnig at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})
