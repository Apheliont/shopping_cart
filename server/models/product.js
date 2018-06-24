const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  product_type: String,
  image_tag: String,
  created_at: Number,
  price: Number
});


const Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.getProduct = function() {
  return Product.find({});
};

module.exports.addProducts = function(items) {
  return Product.create(items);
};
