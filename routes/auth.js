const express=require("express");
const router=express.Router();
const authController=require("../controller/auth");
const isAuth=require("../Middleware/Authenticated")

router.post("/register",authController.postregister);
router.post("/login",authController.postLogin);
router.post("/logout",isAuth,authController.postLogout);
router.post("/update",authController.updatepassword);
// router.post("/forgot",authController.forgotpassword);


module.exports=router;