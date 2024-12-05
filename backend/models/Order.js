const mongoose = require("mongoose");
const { AddressSchema } = require("./Schemes");

const UserData = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema,
});

const BookData = new mongoose.Schema({
  isbn13: { type: String, required: true, minlength: 13, maxlength: 13, unique: true },
  isbn10: { type: String, required: true, minlength: 10, maxlength: 10, unique: true },
  title: { type: String, required: true, maxlength: 255 },
  price: { type: Number, required: true, min: 0, set: (v) => Math.round(v * 100) / 100 },
});

const OrderSchema = new mongoose.Schema({
  user: UserData,
  items: [
    {
      book: BookData,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shipped: {
    type: Boolean,
    default: false,
  },
  payment: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
});
// Create the Book model
const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;