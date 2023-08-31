const Order = require("../models/Order");
exports.postOrders = async (req, res, next) => {
  const { userId, customerdetails, productone } = req.body;
  console.log(productone);
  const order = await Order.findOne({ userId });
  if (order) {
    console.log("user found");
   const existingOrder=order.customerorder.find(
    (item)=>item.transcitionId===customerdetails.paymentid
   )
  if(existingOrder){
    console.log("order already placed");
    res.status(200).json(order)
    return
  }else{
    console.log('new order')
    order.customerorder.push({
      transcitionId: customerdetails.paymentid,
      phone: customerdetails.name.phone,
      products: [],
      amount: customerdetails.total,
      name: customerdetails.name.name,
      address: customerdetails.name.address,
      status: "pending",
    });

// 
for (const orderToAdd of productone) {
  const existingProduct = existingOrder?.products.find(
    (item) => item.productId === orderToAdd.productId
  );
  if (existingProduct) {
    console.log("product already exist");
    return;
  } else {
    console.log("product not registered and pushing");

    // Add the product to the transaction's products array
    order.customerorder.forEach((item) => {
      if (item.transcitionId === customerdetails.paymentid) {
        item.products.push({
          productId: orderToAdd.productId,
          quantity: orderToAdd.quantity,
          color: orderToAdd.color,
          size: orderToAdd.size,
          price: orderToAdd.price,
          image: orderToAdd.image,
          title: orderToAdd.title,
          total: orderToAdd.total,
        });
      }
    });
  }
}
}
console.log(order)
await order.save();
res.status(200).json(order);

}else {
    console.log("user not found");

    const newOrder = new Order({
      userId,
      customerorder: [
        {
          transcitionId: customerdetails.paymentid,
          phone: customerdetails.name.phone,
          products: [],
          amount: customerdetails.total,
          name: customerdetails.name.name,
          address: customerdetails.name.address,
          status: "pending",
        },
      ],
    });

    // Add products to the new order's transaction
    for (const orderToAdd of productone) {
      newOrder.customerorder[0].products.push({
        productId: orderToAdd.productId,
        quantity: orderToAdd.quantity,
        color: orderToAdd.color,
        size: orderToAdd.size,
        price: orderToAdd.price,
        image: orderToAdd.image,
        title: orderToAdd.title,
        total: orderToAdd.total,
      });
    }

    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
   
};

}
exports.SingleOrder = async (req, res, next) => {
  const {userId}=req.params;
  const {orderId,updatestatus}=req.body;
  console.log(updatestatus)
 try{ 
  const order=await Order.findOne({userId})
  if(order){
  // console.log(order.customerorder)
const existingOrder=order.customerorder.find((item)=>item.id===orderId)
if(!existingOrder){
res.status(200).json(existingOrder);   
return;
}else{
existingOrder.status=updatestatus;
res.status(200).json(existingOrder);   
}}
}catch(err){
  
}
};











exports.updateOrder = async (req, res, next) => {
  const {userId}=req.params;
  const {orderId,updatestatus}=req.body;
  console.log(updatestatus)
  try {
    const order = await Order.findOne({ userId });
console.log(order)
    if (!order) {
      const orders = await Order.find();
      res.status(200).json(orders);
      return;
    }

    const existingOrder = order.customerorder.find((item) => item.id === orderId);
    if (!existingOrder) {
      const orders = await Order.find();
      res.status(200).json(orders);
      return;
    } else {
      existingOrder.status = updatestatus;
    }

    await order.save();

    const updatedOrders = await Order.find();
    res.status(200).json(updatedOrders);
    console.log(updatedOrders)
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json("Order Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getOrder = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const order = await Order.find({userId});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getallOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
    console.log(orders)
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.OrderStatus = async (req, res, next) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $unwind: "$customerorder",
      },
      {
        $match: {
          "customerorder.createdAt": { $gte: previousMonth },
          ...(productId && {
            "customerorder.products.productId": productId,
          }),
        },
      },
      {
        $group: {
          _id: { $month: "$customerorder.createdAt" },
          total: { $sum: "$customerorder.amount" },
        },
      },
    ]);
    console.log(`is this  ${income}`)
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};