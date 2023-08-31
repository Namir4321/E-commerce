require("dotenv").config();
exports.order = async (req, res, next) => {
let {order,session_id}=req.query;
try{
  const session=await stripeGateway.checkout.session.retrive(session_id);
  const customer=await stripeGateway.customer.retrive(session.customer);
  console.log(customer)

}catch(err){console.log(err)}
};
