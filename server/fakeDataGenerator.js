const faker = require('faker');
faker.locale = 'ru';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Product = require('./models/product');

const fakeDataArray = [];

for (let i = 0; i < 100; i++) {
  const fakeObj = {};
  fakeObj.title = faker.commerce.productName();
  fakeObj.description = faker.lorem.paragraphs();
  fakeObj.product_type = faker.commerce.productMaterial();
  fakeObj.image_tag = `/images/${(i + 1) % 10}.png`;
  fakeObj.created_at = faker.date.between(1920, 2070).getFullYear();
  fakeObj.price = faker.commerce.price();

  fakeDataArray.push(fakeObj);
}

mongoose.connect('mongodb://customer:customer777@ds263640.mlab.com:63640/shopping_cart937423434')
  .then(() => {
    mongoose.connection.collections.products.drop();
  })
  .then(() => {
    Product.addProducts(fakeDataArray);
  })
  .catch(err => console.log(err));
