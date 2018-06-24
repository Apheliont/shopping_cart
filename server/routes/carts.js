const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.get('/', async (req, res) => {
  try {
    const cartData = await Cart.getItems();
    res.send(JSON.stringify(cartData));
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    await Cart.addItem(req.body);
    const cartData = await Cart.getItems();
    res.send(JSON.stringify(cartData));
  } catch (e) {
    console.log(e);
  }

});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (id === 'all') {
      await Cart.removeAll();
    } else {
      await Cart.deleteItem(id);
    }
    const cartData = await Cart.getItems();
    res.send(JSON.stringify(cartData));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
