const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  quantity: {
    type: Number,
    default: 1
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product'
  }
});

const Cart = module.exports = mongoose.model('cart', CartSchema);

module.exports.addItem = async function (product) {
  const existingProduct = await Cart.findById(product._id);
  if (existingProduct) {
    return existingProduct.update({
      $inc: {
        quantity: 1
      }
    })
  } else {
    const newProduct = new Cart({
      _id: product._id,
      product
    });
    return newProduct.save();
  }
};

module.exports.getItems = function () {
  return Cart.find({}).populate('product', {
    _id: 0
  });
};

module.exports.deleteItem = async function (id) {
  let itemToDelete = await Cart.findById(id);
  if (itemToDelete && itemToDelete.quantity > 1) {
    return itemToDelete.update({
      $inc: {
        quantity: -1
      }
    })
  } else {
    return Cart.findByIdAndRemove(id);
  }
};

module.exports.removeAll = function () {
  return Cart.deleteMany({});
};
