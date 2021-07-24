const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
//   Items will be available from session
  items: {
    type: Object,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: 'customer'
  },
  status: {
      type: String,
      default: 'order_placed'
  }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);