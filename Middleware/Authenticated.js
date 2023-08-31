const User=require("../models/User");
// // const jwt=require("jsonwebtoken");


// // const verifyToken=(req,res,next)=>{
// //     const authHeader=(req,res,next)=>{
// //         const authHeader=req.headers.token
// //     const token=authHeader.split(" ")[1];
// //         if(authHeader){
// //         jwt.verify(token,process.env.ONE_SECRET_KEY,(err,user)=>{
// //             if(err) res.status(403).json("token is not valid");
// //             req.user=user;
// //             next();
// //         })
// //     }else{
// //         return res.status(401).json()
// //     }
// //     }
// // }
// // const verifyTokenAuthorization=(req,res,next)=>{
// // verifyToken(req,res,()=>{
// //     if(req.user.id===req.params.id || req.user.isAdmin){
// //         next();
// //     }else{
// //         res.status(403).json("not allowed")
// //     }
// // })
// // }
// // module.exports={verifyToken,verifyTokenAuthorization};
// const isAuth=(req,res,next)=>{

//     console.log(req.session)
//         if(req.session.user){
// console.log("verified")
// //         next();
// //         return req.user;
// //     }else{
// //         var err=new Error("user not logged in")
// //    res.status(200).json("not authunticated")
// // console.log(req.session)
// //     }
// }
// }
// module.exports=isAuth
const Auth=async(req,res,next)=>{
  try{
  
    if(req.session.user){
      const userId=req.session.user._id;
      const user= await User.findById(userId);
      if(user){
        req.user=user;
        next();
    }  
  }else{
    
    next();
  }
  }catch(err){
      console.log(err)
  }
  }
  
  module.exports=Auth;
  
  