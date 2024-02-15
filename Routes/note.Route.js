const express = require("express")
const NoteModel = require("../models/note.model")
const noteRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.middleware")

noteRouter.post('/',auth,async (req,res)=> {
    const payload = req.body;
   try { const newNote = new NoteModel(payload);
    await newNote.save();
    res.send({msg:"note added"})
} catch(error) {
    res.send({error})
}
})

noteRouter.get('/',auth,async (req,res)=> {
try {
     const notes =await NoteModel.find({userId:req.body.userId});
     if(notes) {
        res.send({msg:"your notes",notes})
     } else {
        res.send({msg:"Please add some notes"})
     }
    
} catch(error) {
    res.send({error})
}
})

noteRouter.patch("/:noteId",auth,async(req,res)=>{
    const {noteId} = req.params
    try{
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId===req.body.userId){
            await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
            res.send({msg:"notes updated"})
        }
        else{
            res.send({msg:"not authorized"})
        }
    }catch(err){
        res.send({err})
    }
})

noteRouter.delete("/:noteId",auth,async(req,res)=>{
    const {noteId} = req.params
    try{
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId===req.body.userId){
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.send("notes updated")
        }else{
            res.send({msg:"you are not authorized"})
        }
    }catch(err){
        res.send({err})
   }
})

module.exports = {noteRouter}