require('dotenv').config()
const session=require("express-session");

module.exports=session({
    name:"real-cookie",
    secret:process.env.SECRET_KEY,
    saveUninitialized:true,
    resave:false,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60*60*60
    }
})