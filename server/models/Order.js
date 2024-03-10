
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userMobile: { type: String, required: true },
    itemName: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    orderDateTime: { type: Date, default: Date.now },
  });
  
  // Create Order Model
  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order;