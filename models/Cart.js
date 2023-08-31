const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: [
      {
        productId:{
          type: String,
        },
        quantity:{
            type: Number,
            default:1,
        },
        color:{
          type:String,
         },
         size:{
          type:String,
         },
         price:{
          type : String 
         },
         image:{
          type : String 
         },
         title:{
          type : String 
         },
         total:{
          type :Number ,default:'0'
         }
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("cart", CartSchema);
