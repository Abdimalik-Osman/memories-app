const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


mongoose.connect(process.env.DB_URL,{useNewUrlParser:true},(err)=>{
    if(err) return console(err.message);

    console.log("Successfully Connected...");
});


app.use("/api/memories",require("./routes/memory-routes"));
app.use("/api/users",require("./routes/user-routes"));



app.listen(PORT,()=>console.log("server is listening on port " +PORT));