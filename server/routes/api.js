const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../../models/user');

router.post('/', (req, res, next) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10), // returning hashed password
    email: req.body.email
  });
  user.save(function(err, result){
    if(err){
      return res.status(500).json({
        title: 'An error occured', 
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result // the result - the user who was created
    });
  });
});

router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user) { // looking for the user with the exact email from the request. 'user' is the result from the db
      if(err){
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if(!user){
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      if(!bcrypt.compareSync(req.body.password, user.password)){ // if the password from the request and the password in the db doesnt match
          return res.status(401).json({
              title: 'Login failed',
              error: {message: 'Invalid login credentials'}
          });
      }
      let token = jwt.sign({user: user}, config.secret, {expiresIn: 7200}); // creates a new token and signs it
          //  expiresIn -> how long the token will be vaild, 2 hr
      res.status(200).json({ // sends the token to the user 
          message: 'Successfully logged in',
          token: token,
          userId: user._id
      });
  });
});

router.get('/profile', function (req, res, next) {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({ 
            result: user
        });
    })   
});

router.get('/search', function (req, res, next) {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({ 
            result: user
        });
    })   
});

module.exports = router;