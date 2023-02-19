const express=require('express')
const app=express();
const {dbconnection}=require('./db')
const {router}=require("./routes/auth.routes")
const {notes}=require("./routes/notes.routes")
const {authenticate}=require("./middlewares/authenticate")
require('dotenv').config()
const cors=require('cors')

app.use(cors())

app.use(express.json())

app.use('/note',router)

app.use(authenticate)
app.use('/',notes)

app.listen(process.env.PORT,async()=>{
    try {
        await dbconnection
        console.log('db connected success')
    } catch (error) {
        console.log('db connection faliled')
    }
    console.log(`Server is running at PORT ${process.env.PORT}`)
})