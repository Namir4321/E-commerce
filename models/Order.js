const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerorder: [
      {
        transcitionId: {
          type: String,
        },
        phone: {
          type: String,
        },
        products: [
          {
            productId: {
              type: String,
            },
            quantity: {
              type: Number,
              default: 1,
            },
            price: {
              type: String,
            },
            image: {
              type: String,
            },
            title: {
              type: String,
            },
            color: {
              type: String,
            },
            size: {
              type: String,
            },
          },
        ],

        amount: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
        },
        address: {
          city: String,
          country: String,
          line1: String,
          line2: String,
          postal_code: String,
          state: String,
        },

        status: { type: String, default: "pending" },
        transcitionStatus:{type:String,default:"complete"},
        timestamps:{type:String,default:new Date(),
        _id:false}
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("order", OrderSchema);
