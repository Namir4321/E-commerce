const express=require('express');
const router=express.Router();
const paymentController=require('../controller/payment')
const stripeController=require("../controller/stripe");
router.post("/payment",stripeController.stripePayment);
router.post('/success/:sessionId',stripeController.success)
// router.post('/cancel',paymentController.verify)
module.exports=router;