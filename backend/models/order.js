const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderPlacedOn: { type: Date, default: Date.now() },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDelivered: { type: Boolean },
  orderDeliveredOn: { type: String },
  cart: { type: Array },
  //   cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
});

module.exports = mongoose.model("Order", orderSchema);
