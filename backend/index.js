const express=require('express');
const mongoose=require('mongoose');
const dotenv=require("dotenv");
const cors = require('cors');


const pinRoute=require("./routes/Pins.js")
const authRoute=require('./routes/User.js');

const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("MongoDB connected")
})

app.use("/server/pin",pinRoute);
app.use("/server/auth",authRoute);

app.listen(8800,()=>{
    console.log("Backend server runnign on port 8800!")
})


