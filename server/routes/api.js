const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 

router.post('/', (req, res, next) => {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10), // returning hashed password
    email: req.body.email, 
    registryDate: new Date(), 
    isActive: true
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
    User.find()
        .populate('user', 'firstName')
        .exec(function (err, users) {
            if (err) { 
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        }); 
});

router.post('/account', function (req, res, next) {
    console.log(req); 
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if('firstName' in req.body)
            user.firstName = req.body.firstName;
        if('lastName' in req.body)
            user.lastName = req.body.lastName; 
        if('password' in req.body)
            user.password = bcrypt.hashSync(req.body.password, 10);
        if('email' in req.body)
            user.email = req.body.email; 
        if('phoneNumber' in req.body)
            user.phoneNumber = req.body.phoneNumber; 
        user.save(function(err, result) {
            if(err){
              return res.status(500).json({
                title: 'An error occured', 
                error: err
              });
            }
            res.status(201).json({
              message: 'User updated',
              obj: result
            });
        }); 
    })   
});

router.post('/userDetail', function (req, res, next) {
    // User.findOne({email: "tzlil@gmail.com"}, function(err, user) {
    //     if(err){
    //         return res.status(500).json({
    //             title: 'An error occurred',
    //             error: err
    //         });
    //     }
    //     let userDetail = new UserDetail({
    //         sex: "aaaaa", 
    //         age: "bbbbb",
    //         martialStatus: "cccc", 
    //         hasChildren: "dddddd", 
    //         occupation: "dsfdfs",
    //         sexualOrient: "sdfsdf",
    //         religion: "sdfdsfn", 
    //         kosher: "dssggg",
    //         kitchen: "sdgdsg", 
    //         diet: "sdfrg", 
    //         smoking: "fdgbbbb", 
    //         animals: "sfdgg", 
    //         cleaning: "sdfdvb", 
    //         additionalInfo: "sdfdsf"
    //     }); 
    //     userDetail.save(function(err, result) {
    //         if(err){
    //           return res.status(500).json({
    //             title: 'An error occured', 
    //             error: err
    //           });
    //         }
    //         res.status(201).json({
    //           message: 'User updated',
    //           obj: result
    //         })
    //     });
    //     user.userDetail = userDetail; 

    //     user.save(function(err, result) {
    //         if(err){
    //           return res.status(500).json({
    //             title: 'An error occured', 
    //             error: err
    //           });
    //         }
    //         res.status(201).json({
    //           message: 'User updated',
    //           obj: result
    //         });
    //     }); 
    // }); 
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        let userDetail = new UserDetail({
            sex: req.body.sex, 
            age: req.body.age,
            martialStatus: req.body.martialStatus, 
            hasChildren: req.body.hasChildren, 
            occupation: req.body.occupation,
            sexualOrient: req.body.sexualOrient,
            religion: req.body.religion, 
            kosher: req.body.kosher,
            kitchen: req.body.kitchen, 
            diet: req.body.diet, 
            smoking: req.body.smoking, 
            animals: req.body.animals, 
            cleaning: req.body.cleaning, 
            additionalInfo: req.body.additionalInfo
        }); 
        userDetail.save(function(err, result) {
            if(err){
              return res.status(500).json({
                title: 'An error occured', 
                error: err
              });
            }
            user.userDetail = result; 
            user.save(); 
            res.status(201).json({
              message: 'User updated',
              obj: result
            })
        });
    })   
});

module.exports = router;