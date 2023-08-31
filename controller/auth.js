const User = require("../models/User");
const bcrypt=require("bcryptjs");
const session=require("../Middleware/session")
const jwt=require("jsonwebtoken");
exports.postregister = async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const token=await newUser.generateAuthToken();
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.postLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log({email,password})
   try{
    const user=await User.findOne({email})
if(user){
  const isMatch=await bcrypt.compare(password,user.password)
  if(isMatch){
    req.session.user=user;
    console.log( req.session.user=user._id)
    const secret=user._id + process.env.ONE_SECRET_KEY;
        const accesstoken=jwt.sign({userId:user._id,isAdmin:user.isAdmin},secret,
            {expiresIn:"3d"
        });
            res.status(200).json({user,accesstoken})
    }else{

      res.status(400)
    }
   }else{
    res.status(400)
   }}catch(err){}
}
exports.postLogout=async(req,res,next)=>{
try{
  req.session.user={};
  res.send(null)
}catch(err){

}
}
exports.updatepassword=async(req,res,next)=>{
  const{userId,token,password}=req.body
  console.log({userId,token,password})
  const user= await User.findById(userId)
  
 try{ 
  const secret=userId + process.env.ONE_SECRET_KEY;
  const decoded=await jwt.verify(token,secret)
if(decoded){
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(user._id, { password: hashedPassword });
}else{
  console.log("not valid")
}
}catch(err){

}
}
