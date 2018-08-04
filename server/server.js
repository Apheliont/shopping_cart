const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// history fallback
const history = require('connect-history-api-fallback');
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));

// passport configuration
const passport = require('passport');
require('./passport/passport');
app.use(passport.initialize());

// body-parser init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//port listen
const port = process.env.PORT || 3000;

// mongoose init
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// routes init
const products = require('./routes/products');
// const carts = require('./routes/carts');
const user = require('./routes/users');

// routes set
app.use('/api/products', passport.authenticate('jwt', { session: false }), products);
app.use('/api/user', user);



// static route
app.use(express.static(path.join(__dirname, '..', 'public')));


mongoose.connect('mongodb://customer:customer777@ds263640.mlab.com:63640/shopping_cart937423434').then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  });
}).catch(err => console.log(err));
