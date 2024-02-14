const express = require("express")
const app= express()
const {connection} = require("./db")
const userRouter = require("./Routes/user.Route")
const { noteRouter } = require("./Routes/note.Route")
require('dotenv').config();
app.use(express.json())
app.use("/users",userRouter)   
app.use('/notes',noteRouter)


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(`server running at port : http://localhost:${process.env.PORT}`)
    }catch(err){
        console.log(err)}   
})