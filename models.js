const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  name: String,
  quantity: Number,
});

const orderSchema = new Schema({
  items: [orderItemSchema],
  round: Number,
  table: String,
});

const tableSchema = new Schema({
  qr_code: String,
  active_order: { type: Schema.Types.ObjectId, ref: 'Order' },
  current_round: Number,
});

const Order = mongoose.model('Order', orderSchema);
const Table = mongoose.model('Table', tableSchema);

module.exports = { Order, Table };
