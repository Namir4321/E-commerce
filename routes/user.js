const express=require('express');
const router=express.Router();
const UserController=require('../controller/user');
const isAuth=require("../Middleware/Authenticated")
router.put(`/:id`,isAuth,UserController.updatePassword)
router.delete(`/:userId`,isAuth,UserController.postdelete);
router.get('/search/all',isAuth,UserController.getallUser);
router.get('/status',isAuth,UserController.getUserstatus);

module.exports=router;