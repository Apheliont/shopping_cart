const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// эта схема является базой для схемы "покупки" - то что лежит в корзине
// покупка имеет дополнительное поле quantity - количество в корзине
const ProductSchema = new Schema({
  title: String,
  description: String,
  product_type: String,
  image_tag: String,
  created_at: Number,
  price: Number
});


const Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.getProducts = function() {
  return Product.find({});
};

module.exports.getProduct = function(id) {
  return Product.findById(id);
};

module.exports.addProducts = function(items) {
  return Product.create(items);
};

module.exports.productsCount = function() {
  return Product.find({}).count();
};
