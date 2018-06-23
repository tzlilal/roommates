const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PythonShell = require('python-shell');

const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 
const RoommateDetail = require('../../models/roommate-detail'); 
const RoommateDetailEncoded = require('../../models/roommate-detail-encoded'); 

const myPythonScriptPath = '/server/test.py';

function pythonScript(id, resultArr, res) { 
    resultArr.push({_id: id}); 
    var pyshell = new PythonShell(myPythonScriptPath);

    pyshell.send(JSON.stringify(resultArr));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        let result = JSON.parse(message); 

        User.find({
            '_id': { $in: result}
        }).exec((err, result) => {
            if(err) {
                return res.status(500).json({
                  title: 'An error occured', 
                  error: err
                });
            }
            res.status(201).json({
            message: 'User matches:',
            obj: result
            })
        });
    });
    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
        if (err){
            throw err;
        };

        // console.log('finished');
    });
}

router.get('/', (req, res) => {
    let decoded = jwt.decode(req.query.token);
    const id = decoded.user._id; 
    User.findById(id)
    .populate('roommateDetail')
    .populate('userDetail')
    .exec((err, result) => {
        let onlyMaleOrFemale = true; 
        const minAge = result.roommateDetail.minAge - 1;
        const maxAge = result.roommateDetail.maxAge + 1;
        const gender = result.roommateDetail.gender;
        if (gender === 'אין העדפה')
            onlyMaleOrFemale = false; 
        const regions = result.userDetail.regions; 
        if (onlyMaleOrFemale) {
            // finds all the user with age between minAge-maxAge with the same regions of the current user and the relevent gender
            UserDetail.find(
                {age: { $gt: minAge, $lt: maxAge}, 
                regions: { $in: regions }, 
                sex: gender}
            // joins to the table 'roommateDetailEncoded' to get encoded detail
            ).populate('roommateDetailEncoded')
            .exec((err, result) => {
                // the result from the db is a user containg a key called "roommateDetailEncoded" which holds all the info we need
                // console.log(JSON.stringify(result, undefined, 2));
                let userEncodedArr = []; 
                result.forEach((val) => {
                    userEncodedArr.push(val.roommateDetailEncoded); 
                });
                pythonScript(id, userEncodedArr, res);
            });
        } else { 
            UserDetail.find({age: { $gt: minAge, $lt: maxAge}, regions: { $in: regions }}).then((doc) => {
                console.log(doc); 
            });
        }
    });
});

module.exports = router;