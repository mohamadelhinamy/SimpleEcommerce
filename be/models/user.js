const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
  userName: {
    type: String
  },
  cart: {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      }
    ]
  },
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

module.exports = mongoose.model('User', userSchema);
