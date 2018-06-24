const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async function (req, res) {
  const products = await Product.getProduct();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(products));
});

module.exports = router;
