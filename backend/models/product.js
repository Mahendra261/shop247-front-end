const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  price: (number = 0),
  discountPrice: (number = 0),
  description: { type: String },
  image: { type: String },
  createdOn: { type: Date, default: Date.now() },
  isTopProduct: { type: Boolean },
});

module.exports = mongoose.model("Product", productSchema);
