const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please add a title']
    },
    body:{
        type:String,
        required:[true,'Please add a memory body']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const Memory = mongoose.model("Memory",memorySchema);

module.exports =  Memory;
