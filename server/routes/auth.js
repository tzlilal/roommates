const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

// signup route
router.post('/', (req, res, next) => {
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10), // returning hashed password
      email: req.body.email, 
      registryDate: new Date(), 
      isActive: true
    });
    user.save((err, result) => {
      if(err){ 
        if (err.errors.email.kind === 'unique') {
            console.log("sdfsdfsf"); 
            return res.status(500).json({
                title: 'ההרשמה נכשלה', 
                error: {message: 'קיים משתמש במערכת עם האימייל שהוזן'}
              }); 
        }
        else { 
            return res.status(500).json({
                title: 'ההרשמה נכשלה', 
                error: err
              });
        }
      }
      res.status(201).json({
        message: 'User created',
        obj: result 
      });
    });
});

// signin route  
router.post('/signin', (req, res, next) => {
    // looking for the user with the exact email from the request. 'user' is the result from the db
    User.findOne({email: req.body.email}, (err, user) => { 
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user) {
            return res.status(401).json({
                title: 'ההתחברות נכשלה',
                error: {message: 'לא קיים משתמש במערכת עם הפרטים שהוזנו'}
            });
        }
        // if the password from the request and the password in the db doesnt match
        if(!bcrypt.compareSync(req.body.password, user.password)) { 
            return res.status(401).json({
                title: 'ההתחברות נכשלה',
                error: {message: 'האימייל או הסיסמה שהוזנו לא נכונים'}
            });
        }
        // creates a new token and signs it
        //  expiresIn -> how long the token will be vaild, 2 hr
        let token = jwt.sign({user: user}, 'mysecret', {expiresIn: 7200}); 
        res.status(200).json({ 
            // sends the token to the user 
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;