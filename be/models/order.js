const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    }
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  },
  total: { type: Number },
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

module.exports = mongoose.model('Order', orderSchema);
