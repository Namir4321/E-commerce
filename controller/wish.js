const Wish=require("../models/wish");
exports.postAddtowish=async(req,res,next)=>{
    const { userId, product } = req.body;
    const wish = await Wish.findOne({ userId });
    
    if (wish) {
      for (const productToAdd of product) {
        const existingProduct = wish.product.find(
          (item) =>
          item.productId === productToAdd.productId &&
          item.color === productToAdd.color &&
          item.size === productToAdd.size
        );
        
        if (existingProduct) {
        return;
        } else {
            wish.product.push({
            productId: productToAdd.productId,
            quantity:  1,
            color: productToAdd.color,
            size: productToAdd.size,
            price: productToAdd.price,
            image: productToAdd.image,
            title: productToAdd.title,
          });
        }
      }
      await wish.save();
      res.status(200).json(wish);
    } else {
      const newWish = new Wish({
        userId: userId,
        product: product.map((item) => ({
          productId: item.productId,
          quantity: item.quantity || 1,
          color: item.color,
          size: item.size,
          price: item.price,
          image: item.image,
          title: item.title,
        })),
      });
      
      try {
        const savedWish = await newWish.save();
        res.status(200).json(savedWish);
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    }
}
exports.deleteWish = async (req, res, next) => {
    const { userId } = req.params;
    const {WishId}=req.body;
  try { const wish=await Wish.findOne({userId});
    if(wish){
      const existingProduct=wish.product.findIndex((item)=>item.id===WishId);
      if(existingProduct!=-1){
        wish.product.splice(existingProduct, 1);
        await wish.save();
        res.status(200).json(wish);
      }
    }}catch(err){}
  };
  exports.deleteWishall = async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId)
   try{ const wish=await Wish.findOneAndDelete({userId});  
    res.status(200).json(wish)}catch(err){}
  };
  
  exports.getWish = async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId)
    try {
      const wish = await Wish.find({ userId });
      res.status(200).json(wish);
    } catch (err) {
      res.status(500).json(err);
    }
  };