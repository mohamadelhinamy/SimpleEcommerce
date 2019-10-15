const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productCategorySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
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
module.exports = mongoose.model('ProductCategory', productCategorySchema);
