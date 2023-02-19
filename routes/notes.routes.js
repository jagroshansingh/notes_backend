const express=require('express')
const {AuthModel}=require('../models/auth.model')
const {NoteModel}=require("../models/note.model")

const notes=express();

notes.get("/allnotes",async(req,res)=>{
    // console.log(req.body)
    let author=req.body.author
    try {
        let see=await NoteModel.find({'author':author})
        res.send(see)
    } catch (error) {
        res.send(error)
    }
})

notes.post("/addnotes",async(req,res)=>{
    // console.log(req.body)
    try {
        let ans=new NoteModel(req.body)
        ans.save()
        // console.log(ans)
        res.send({msg:'note added success'})
    } catch (error) {
        res.send(error)
    }
})

notes.delete("/delete/:id",async(req,res)=>{
    // console.log(req.params.id)
    try {
        await NoteModel.findByIdAndDelete({'_id':req.params.id})
        res.send({msg:'Note Deleted success'})
    } catch (error) {
        res.send(error)
    }
})

module.exports={notes}