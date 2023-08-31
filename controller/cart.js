const Cart = require("../models/Cart");
exports.postAddtoCart = async (req, res, next) => {
  const { userId, product } = req.body;
  const cart = await Cart.findOne({ userId });
  
  if (cart) {
    for (const productToAdd of product) {
      const existingProduct = cart.product.find(
        (item) =>
          item.productId === productToAdd.productId &&
          item.color === productToAdd.color &&
          item.size === productToAdd.size
      );
      
      if (existingProduct) {
        existingProduct.quantity += productToAdd.quantity || 1;
        existingProduct.total+=productToAdd.total
      } else {
        cart.product.push({
          productId: productToAdd.productId,
          quantity: productToAdd.quantity || 1,
          color: productToAdd.color,
          size: productToAdd.size,
          price: productToAdd.price,
          image: productToAdd.image,
          title: productToAdd.title,
          total:productToAdd.total
        });
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } else {
    const newCart = new Cart({
      userId: userId,
      product: product.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 1,
        color: item.color,
        size: item.size,
        price: item.price,
        image: item.image,
        title: item.title,
        total:item.total
      })),
    });
    
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
};

exports.updateCart = async (req, res, next) => {
    const userId=req.params.id
    const {CartId,newQuantity,type,total}=req.body;
    
   
    const cart=await Cart.findOne({userId});
    if(cart){
      const existingProduct=cart.product.find((item)=>item.id===CartId);
      if(existingProduct){
if(type==="inc"){
  if(existingProduct.quantity===10){
    res.status(200).json(cart);
    return
  }
  existingProduct.quantity += 1;
  existingProduct.total+=parseFloat(total)

  await cart.save();
  res.status(200).json(cart);
}else{
  if(existingProduct.quantity===1){
    res.status(200).json(cart);
    return
  }
  existingProduct.quantity -= 1;
  existingProduct.total-=parseFloat(total)

  await cart.save();
  res.status(200).json(cart);
}
      }
    }


  };

exports.deleteCart = async (req, res, next) => {
  const { userId } = req.params;
  const {CartId}=req.body;
  const cart=await Cart.findOne({userId});
  if(cart){
    const existingProduct=cart.product.findIndex((item)=>item.id===CartId);
    if(existingProduct!=-1){
      cart.product.splice(existingProduct, 1);
      await cart.save();
      res.status(200).json(cart);
    }
  }
};
exports.deleteCartall = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId)
  const cart=await Cart.findOneAndDelete({userId});  
  res.status(200).json(cart)
};

exports.getCart = async (req, res, next) => {
  const { userId } = req.params;
  console.log(`cart userId is ${userId}`)
  try {
    const cart = await Cart.find({ userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getallProducts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts.product);
  } catch (err) {
    res.status(500).json(err);
  }
};
