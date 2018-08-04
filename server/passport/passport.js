const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const ExctractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExctractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = '80860f8505bc141bb39a010dbf905247';
const LocalStrategy = require('passport-local').Strategy;

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
);

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
  session: false
}, function (username, password, done) {
  User.getUserByLogin(username)
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Пользователь с таким логином не существует!' });
      } else {
        User.comparePasswords(password, user.password, (err, isMatch) => {
          if (isMatch) {
            return done(null, user, { message: 'Добро пожаловать!' });
          } else {
            return done(null, false, { message: 'Неверный пароль!' });
          }
        });

      }
    })
    .catch(error => {
      return done(error);
    });
}));
