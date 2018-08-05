const express = require('express');
const router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExctractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExctractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '80860f8505bc141bb39a010dbf905247';


router.post('/register', async (req, res) => {
  const existingUser = await User.getUserByLogin(req.body.login);
  if (existingUser) {
    res.status(422).json({
      message: 'Пользователь с таким Login\'ом уже существует!'
    });
  } else {
    User.createUser(req.body, (error, user) => {
      if (error) {
        res.status(422).json({
          message: 'Что-то пошло не так. Повторите попытку позже!'
        })
      } else {
        res.json({
          message: 'Регистрация прошла успешно!'
        })
      }
    });
  }
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json(info);
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const payload = {id: user._id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.json({...info, token});
    });
  })(req, res);
});
//-------------------------USER'S CART---------------------------------

router.get('/cart', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const products = await User.getItems(req.user._id);
  res.send(JSON.stringify(products));
});


router.post('/cart', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    await User.addItem(req.user._id, req.body);
    const products = await User.getItems(req.user._id);
    res.send(JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
});


router.delete('/cart/delete/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const productId = req.params.id;
  try {
    if (productId === 'all') {
      await User.removeAllItems(req.user._id);
    } else {
      await User.deleteOneItem(req.user._id, productId);
    }
    const products = await User.getItems(req.user._id);
    res.send(JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
