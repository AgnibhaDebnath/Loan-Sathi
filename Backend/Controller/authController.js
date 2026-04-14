const user = require("../Model/UserModel")
const bcrypt=require('bcrypt')
exports.SignUp = async(req, res, next) => {
    try {
   const { name, email, password } = req.body;  
   const hashedPassword = await bcrypt.hash(password, 12);
   await user.create({
       name,
       email,
       password:hashedPassword,
   })
    res.status(201).json({success:true,message:"Account created successfully 🎉"})
    } catch (err) {
    res.status(500).json({success:false,message:"Something went wrong. Please try again later"});
    }
}

exports.Login = (req,res,next) => {
    
}