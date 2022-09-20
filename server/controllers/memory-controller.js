const Memory = require("../models/memories");
const asyncHandler = require("express-async-handler");
// POST api/memories/
const createMemory = asyncHandler(async (req, res) => {
    try {
        const { title,body} = req.body;
        const newMemory = await Memory.create({title, body,user:req.user.id});
        
        res.status(201).json({memory:newMemory});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// get memory
// GET api/memories
const getMemories = asyncHandler(async (req, res) => {
    try {
        const memories = await Memory.find({user: req.user.id});
        res.status(200).json({memories: memories});
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
})
module.exports = {createMemory, getMemories}