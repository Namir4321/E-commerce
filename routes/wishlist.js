const express=require('express');
const router=express.Router();
const isAuth=require("../Middleware/Authenticated")
const wishController=require("../controller/wish");
router.post("/add",isAuth,wishController.postAddtowish);
router.delete('/:userId',isAuth,wishController.deleteWish);
router.delete('/clear/:userId',isAuth,wishController.deleteWishall);
router.get('/:userId',isAuth,wishController.getWish);




module.exports=router;