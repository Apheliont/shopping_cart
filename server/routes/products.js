const express = require('express');
const router = express.Router();

const Product = require('../models/product');


router.get('/', async function (req, res) {
  const productsCount = await Product.productsCount();
  let itemsPerPage = parseInt(req.query.per_page) || 10;
  itemsPerPage = (itemsPerPage < 0 || itemsPerPage > productsCount) ? 10 : itemsPerPage;
  const pageCount = Math.ceil(productsCount / itemsPerPage);

  let page = parseInt(req.query.page) || 1;
  page = page < 1 ? 1 : page > pageCount ? pageCount : page;

  res.setHeader('X-Paging-PageCount', pageCount);
  res.setHeader('X-Total-Count', productsCount);
  res.setHeader('X-Paging-CurrentPage', page);
  res.setHeader('Content-Type', 'application/json');
  const products = await Product.getProducts().skip(itemsPerPage * (page - 1)).limit(itemsPerPage);
  res.send(JSON.stringify(products));
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  let product = {};
  setTimeout(async () => {
    try {
      product = await Product.getProduct(id);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(product));
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }, 2000);

});

module.exports = router;
