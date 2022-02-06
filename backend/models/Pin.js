const mongoose=require("mongoose");

const PinSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
        min:3
    },
    description:{
        type:String,
        require:true,
    },
    lat:{
        type:Number,
        require:true
    },
    lon:{
        type:Number,
        require:true
    }
},{timestamps:true});

module.exports=mongoose.model("Pin",PinSchema);