const express=require('express');
const router=express.Router();
const productController=require("../controller/product");
const isAuth=require("../Middleware/Authenticated")
router.post("/addProduct",isAuth,productController.postaddProduct);
router.put("/updateProduct/:id",isAuth,productController.putupdateProduct);
router.delete("/delteProduct/:id",isAuth,productController.deleteProduct);
router.get("/searchProduct/:id",productController.getProduct);
router.get("/search/all/product",productController.getallProduct);


module.exports=router;