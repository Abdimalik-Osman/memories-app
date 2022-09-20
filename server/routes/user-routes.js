const express = require('express');
const {createUser,loginUser,getMe} = require('../controllers/user-controllers');
const {protect} = require("../middleware/auth");

const router = express.Router();

router.post("/",createUser);
router.post("/login",loginUser);
router.get("/me",protect,getMe);



module.exports = router;