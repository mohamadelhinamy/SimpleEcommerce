const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  productCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory'
  },
  barcode: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: { type: Number },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
