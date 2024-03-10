// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    currency: 'INR',
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
