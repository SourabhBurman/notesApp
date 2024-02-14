const mongoose = require("mongoose")
const notesSchema = mongoose.Schema({
    title:{type:String},
    body:{type:String,required:true},
    userId:{type:String},
    author:{type:String}
},
{versionKey:false}
)

const NoteModel = mongoose.model("note",notesSchema)

module.exports = NoteModel