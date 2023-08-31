const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.updatePassword = async (req, res, next) => {
  const { id } = req.params;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.postdelete=async(req,res,next)=>{
    const {userId}=req.params;

    try{
await User.findByIdAndDelete(userId);

res.status(200).json("user has been deleted");
    }catch(err){
res.status(500).json(error);
    }
}
exports.getUser=async(req,res,next)=>{
    const {id}=req.params;
    try{
        const user=await User.findById(id);
        res.status(200).json(user)
}catch(err){
        res.status(500).json(err)
    }
}
exports.getallUser=async(req,res,next)=>{
    const query=req.query.new
    try{
        const user= query ? await User.find().sort({_id:-1}).limit(5): await User.find();
    res.status(200).json(user)   
    }catch(err){
res.status(500).json(err)
    }
}
exports.getUserstatus=async(req,res,next)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear)-1);
    try{
        const data=await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {$project:{
                month:{$month:"$createdAt"}
            }},{
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                },
            },
        ]);
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err);
    }
}