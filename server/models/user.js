const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const Product = require('./product');

const UserSchema = new Schema({
  login: String,
  email: String,
  password: String,
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
});

const User = module.exports = mongoose.model('user', UserSchema);

UserSchema.virtual('cartItemsQuantity').get(function () {
  return this.products.length;
});

module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
      const newUserResource = new User(newUser);
      newUserResource.password = hash;
      newUserResource.save(callback);
    })
  })
};

module.exports.getUserByLogin = function (login) {
  return User.findOne({login});
};

module.exports.comparePasswords = function (candidatePassword, hash, callback) {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) {
      callback(err, isMatch);
    } else {
      callback(null, isMatch);
    }
  })
};

//--------------------------USER'S CART----------------------------------
module.exports.addItem = function (userId, {productId}) {
  return User.findById(userId)
    .then(user => {
      const existingProduct = user.products.find(item => {
        return String(item._id) === productId;
      });
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        // запихиваем покупку в корзину юзеру
        user.products.push(mongoose.Types.ObjectId(productId));
      }
      return user.save();
    })
    .catch(error => {
      console.log(error);
    });
};
//
module.exports.getItems = function (userId) {
  return User.findById(userId).populate({
    path: 'products._id',
    model: 'product'
  })
    .then(data => {
      return data.products.map(product => {
        const modifiedData = {
          ...product._id,
        };
        // хитрый способ избавится от скрытых свойст объекта
        const {
          $__,
          isNew,
          $init,
          ...clearData
        } = modifiedData;
        return {
          ...clearData._doc,
          quantity: product.quantity
        }
      });
    })
};


module.exports.deleteOneItem = async function (userId, productId) {
  return User.findById(userId)
    .then(user => {
      const indexOfProduct = user.products.findIndex(item => {
        return String(item._id._id) === productId;
      });
      if (indexOfProduct !== -1) {
        if (user.products[indexOfProduct].quantity <= 1) {
          user.products.splice(indexOfProduct, 1);
        } else {
          user.products[indexOfProduct].quantity -= 1;
        }
        return user.save();
      }
      return user;
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports.removeAllItems = function (userId) {
  return User.findById(userId)
    .then(user => {
      user.products = [];
      return user.save();
    })
    .catch(e => {
      console.log(e);
    });
};
