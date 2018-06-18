const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 
const RoommateDetail = require('../../models/roommate-detail'); 
const RoommateDetailEncoded = require('../../models/roommate-detail-encoded'); 

//  ?????? 
router.get('/profile', (req, res, next) => {
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

// user profile
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .populate('userDetail')
        .populate('roommateDetail')
        .exec((err, foundUser) => {
            if (err) { 
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: foundUser
            });
        });
});

// // get all users
// router.get('/search', function (req, res, next) {
//     User.find()
//         .populate('user', 'firstName')
//         .exec(function (err, users) {
//             if (err) { 
//                 return res.status(500).json({
//                     title: 'An error occurred',
//                     error: err
//                 });
//             }
//             res.status(200).json({
//                 message: 'Success',
//                 obj: users
//             });
//         }); 
// });

// not implemented on client-side
router.post('/searchUser', (req, res, next) => {     
    UserDetail.
    find({sex: req.body.sex,
        age: req.body.age,
        martialStatus: req.body.martialStatus ,
        hasChildren: req.body.hasChildren,
        occupation: req.body.occupation,
        sexualOrient: req.body.sexualOrient,
        religion: req.body.religion, 
        kosher: req.body.kosher,
        kitchen: req.body.kitchen, 
        diet: req.body.diet, 
        smoking: req.body.smoking, 
        // animals: req.body.animals, 
        cleaning: req.body.cleaning
    }).
    populate('user').
    exec(function (err, result) {
        if (err) return handleError(err);
        res.status(201).json({
            message: 'Users search results',
            obj: result
        });
    });
});

router.post('/favorites', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        user.users.push(req.body._id);
        user.save();
        res.status(201).json({
            message: 'Saved user'
        });
    });
});

router.get('/favorites', (req, res, next) => {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        User.find({
            '_id': { $in: user.users}
        }).exec(function(err, result) {
            if(err) {
                return res.status(500).json({
                  title: 'An error occured', 
                  error: err
                });
            }
            res.status(201).json({
            message: 'favorite users:',
            obj: result
            })
        });
    });
});


module.exports = router;