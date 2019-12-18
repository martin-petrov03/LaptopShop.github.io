const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },
  url: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  description: {
    type: Schema.Types.String,
    required: true,
    minlength: 10
  },
  price: {
    type: Schema.Types.Number,
    required: true,
    min: 0.01  
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Accessories = mongoose.model('Accessories', accessorySchema);
module.exports = Accessories;