const router = require("express").Router();
const Pin = require("../models/Pin.js");

//Create Pins
router.post("/",async(req,res)=>{
    console.log(req.body);
    try{
        const pin=new Pin(req.body);
        const savedPin=await pin.save();
        res.status(200).json(savedPin);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


//Get all Pins
router.get("/",async(req,res)=>{
    try{
        const pins=await Pin.find();
        res.status(200).json(pins);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports=router;