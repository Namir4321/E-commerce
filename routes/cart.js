const express=require('express');
const router=express.Router();
const cartController=require("../controller/cart");
const isAuth=require("../Middleware/Authenticated")
router.post('/add',isAuth,cartController.postAddtoCart);
router.put('/update/:id',isAuth,cartController.updateCart);
router.delete('/:userId',isAuth,cartController.deleteCart);
router.delete('/clear/:userId',isAuth,cartController.deleteCartall);
router.get('/:userId',isAuth,cartController.getCart);
router.get('/admin',isAuth,cartController.getallProducts);

module.exports=router;