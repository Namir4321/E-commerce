const express=require('express');
const router=express.Router();
const orderController=require("../controller/order");
const isAuth=require("../Middleware/Authenticated")
router.post('/',isAuth,orderController.postOrders);
router.put('/:userId',isAuth,orderController.updateOrder);
// router.get('/single/:userId',isAuth,orderController.SingleOrder);
router.delete('/:id',isAuth,orderController.deleteOrder);
router.get('/search/:userId',isAuth,orderController.getOrder);
router.get('/admin',isAuth,orderController.getallOrder);
router.get('/status',isAuth,orderController.OrderStatus);

module.exports=router;