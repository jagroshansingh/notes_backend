const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({
    title:String,
    status:String,
    author:String
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={NoteModel}