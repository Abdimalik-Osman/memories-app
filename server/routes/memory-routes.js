const express = require("express");
const {protect} = require("../middleware/auth");
const {createMemory,getMemories} = require("../controllers/memory-controller")
const router = express.Router();

router.post('/',protect,createMemory);
router.get('/',protect,getMemories);

module.exports = router;