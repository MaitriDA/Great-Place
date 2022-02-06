const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
//Check for password and cpassword on frontend side
//Check for password length on frontend side
router.post("/Register",async(req,res)=>{
    console.log(req.body);
    try{
        var userFind=await User.findOne({username:req.body.username});
        if(userFind){
            res.status(200).json("User already exist")
            return;
        }
        userFind=await User.findOne({email:req.body.email});
        if(userFind){
            res.status(200).json("User already exist")
            return;
        }
        const s=await bcrypt.genSalt(10);
        const hPassword=await bcrypt.hash(req.body.password,s);
        const newUser=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hPassword
        });
        const user=await newUser.save();
        console.log("Success")
        res.status(200).json({message:"Registration Successful",user})
        return;
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Login
router.post("/login",async(req,res)=>{
    //console.log(req.body)
    try{
        const userFind=await User.findOne({email:req.body.email});
        if(userFind){
            const password=await bcrypt.compare(req.body.password,userFind.password);
            if(password){
                res.status(200).json({message:"Login Successful",userFind})
                return;
            }
            res.status(200).json({message:"Invalid credentials"})
            return;
        }
        res.status(200).json({message:"Invalid credentials"})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;