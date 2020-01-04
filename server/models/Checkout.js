const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  fullName: {
    type: Schema.Types.String,
    required: true,
    minlength: 5
  },
  address: {
    type: Schema.Types.String,
    required: true,
    minlength: 5
  },
  productName: {
    type: Schema.Types.String,
    required: true,    
    minlength: 5
  },
  url: {
    type: Schema.Types.String,
    required: true    
  },  
  price: {
    type: Schema.Types.Number,
    required: true,
    min: 0.01 
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
    max: 10,
    min: 1
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;