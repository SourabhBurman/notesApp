const express = require("express")
const app= express()
const {connection} = require("./db")
const userRouter = require("./Routes/user.Route")
const auth = require("./middleware/auth.middleware")
const { noteRouter } = require("./Routes/note.Route")
app.use(express.json())
app.use("/users",userRouter)   
app.use('/notes',noteRouter)


app.listen(8080,async()=>{
    try{
        await connection
        console.log("server running at port : http://localhost:8080")
    }catch(err){
        console.log(err)}   
})