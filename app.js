require('dotenv').config()
const express=require("express");
const port = process.env.PORT || 5000;
const app=express();
const stripe=require("stripe")
const mongoose=require("mongoose");
const cors=require("cors")
const bodyParser=require("body-parser")
const authRoute=require("./routes/auth");
const userRoute=require("./routes/user"); 
const prodRoute=require("./routes/product")
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order")
const paymentRoute=require("./routes/stripe")
const session=require("./Middleware/session");
const mailRoute=require("./routes/Mail")
const wishRoute=require("./routes/wishlist");
// const cookie=require("cookie-parser")

// app.use(cookie)
app.use(cors({
    origin:`${process.env.BaseUrl}`,
    credentials: true,
  }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(session)
app.use("/api/checkout",paymentRoute)
app.use("/api/wish",wishRoute);
app.use("/api/auth",authRoute)
app.use("/api/mail",mailRoute);
app.use("/api/users",userRoute)
app.use("/api/cart",cartRoute)
app.use("/api/products",prodRoute)
app.use("/api/orders",orderRoute) 
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("database is connected");
})
app.listen(8080,()=>{
    console.log(`server is ${port}`);
});