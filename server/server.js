const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const fsPromise = require('fs').promises;

// body-parser init

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// item model for dummy data
const Product = require('./models/product');

//port listen
const port = process.env.port || 3000;

// mongoose init
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// routes init
const products = require('./routes/products');
const cart = require('./routes/carts');

// routes set
app.use('/products', products);
app.use('/cart', cart);


// static route
app.use(express.static(path.join(__dirname, '..', 'public')));


mongoose.connect('mongodb://customer:customer777@ds263640.mlab.com:63640/shopping_cart937423434').then(() => {
  // dummy data
  fsPromise.readFile('./server-product-data.json', 'utf-8')
    .then(async (data) => {
      try {
        // const productsData = JSON.parse(data);
        // await mongoose.connection.collections.products.drop();
        // await Product.addProducts(productsData);
        app.listen(port, () => {
          console.log(`Server started on port ${port}`)
        });
      } catch (e) {
        console.log(e);
      }
    }).catch(err => console.log(err));
}).catch(err => console.log(err));
