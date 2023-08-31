const express=require("express");
const router=express.Router();
const mailController=require("../controller/Mail")
router.post("/send",mailController.postMail)
router.post ("/forgot",mailController.postforgotMail)
module.exports=router;