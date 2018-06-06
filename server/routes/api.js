const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PythonShell = require('python-shell');

const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 
const RoommateDetail = require('../../models/roommate-detail'); 
const EncodedLables = require('../../models/encodedLables');
const RoommateDetailEncoded = require('../../models/roommate-detail-encoded'); 

const myPythonScriptPath = '/server/test.py';

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
            regions: req.body.regions,
            martialStatus: req.body.martialStatus, 
            hasChildren: req.body.hasChildren, 
            occupation: req.body.occupation,
            religion: req.body.religion, 
            kosher: req.body.kosher,
            kitchen: req.body.kitchen, 
            diet: req.body.diet, 
            smoking: req.body.smoking, 
            animals: req.body.animals, 
            playInstrument: req.body.playInstrument, 
            cleaning: req.body.cleaning, 
            additionalInfo: req.body.additionalInfo, 
            user: user._id
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

router.post('/roommateDetail', function (req, res, next) {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        let roommateDetail = new RoommateDetail({
            minAge: req.body.minAge, 
            maxAge: req.body.maxAge,
            gender: req.body.gender, 
            occupation: req.body.occupation,
            religion: req.body.religion, 
            kitchen: req.body.kitchen, 
            diet: req.body.diet, 
            smoking: req.body.smoking, 
            animals: req.body.animals,
            playInstrument: req.body.playInstrument, 
            cleaning: req.body.cleaning,
            user: user._id
        });  
        encodedResult = translateLables(roommateDetail); 
        const roommateDetailEncoded = new RoommateDetailEncoded({
            occupation: encodedResult['occupation'],
            religion: encodedResult['religion'],
            kitchen: encodedResult['kitchen'], 
            diet: encodedResult['diet'],  
            smoking: encodedResult['smoking'],  
            animals: encodedResult['animals'],  
            playInstrument: encodedResult['playInstrument'],  
            cleaning: encodedResult['cleaning'],
            user: user._id
        });
        roommateDetailEncoded.save(); 
        roommateDetail.save(function(err, result) {
            if(err){
              return res.status(500).json({
                title: 'An error occured', 
                error: err
              });
            }
            user.roommateDetail = result; 
            user.save(); 
            res.status(201).json({
              message: 'User updated',
              obj: result
            })
        });
    })   
});

router.get('/matches', function(req, res, next) {
    RoommateDetailEncoded.find().then((doc) => {
        // Use python shell
        var pyshell = new PythonShell(myPythonScriptPath);

        pyshell.send(JSON.stringify(doc));

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                throw err;
            };

            console.log('finished');
        });

        res.status(201).json({
            message: 'encoded data', 
            result: doc
        });

    });
});

router.post('/searchUser', function (req, res, next) {     
    // console.log(req.body);
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

router.post('/image', function(req, res, next) {
    console.log(req.body); 
    res.send("dsfdsf"); 
}); 

function translateLables(res) {
    let occupation, religion, kitchen, diet, smoking, animals, playInstrument, cleaning;
    if(res["occupation"] === 'עובד במשרה חלקית') occupation = 32;
    else if(res["occupation"] === 'עובד במשרה מלאה') occupation = 128;
    else if(res["occupation"] === 'סטודנט') occupation = 256;
    else if(res["occupation"] === 'חייל') occupation = 512;
    else if(res["occupation"] === 'ללא עיסוק') occupation = 1024;        

    if(res["religion"] === 'דתי') religion = 16;
    else if(res["religion"] === 'מסורתי ששומר שבת') religion = 64;
    else if(res["religion"] === 'חילוני') religion = 128;
    else if(res["religion"] === 'אתאיסט') religion = 512;        
    
    if(res["kitchen"] === 'כשר') kitchen = 1; 
    else if(res["kitchen"] === 'לא כשר') kitchen = 256; 

    if(res['diet'] === 'רגילה') diet = 1;    
    else if(res['diet'] === 'צמחונית') diet = 64;    
    else if(res['diet'] === 'טבעונית') diet = 512;      

    if(res['smoking'] === 'מעשן') smoking = 1;
    else if(res['smoking'] === 'לא מעשן') smoking = 256;

    if(res['animals'] === 'אוהב בעלי חיים') animals = 1;
    else if(res['animals'] === 'לא אוהב בעלי חיים') animals = 256;

    if(res['playInstrument'] === 'מנגן בכלי נגינה') playInstrument = 1; 
    else if(res['playInstrument'] === 'לא מנגן בכלי נגינה') playInstrument = 256; 

    if(res['cleaning'] === 'נקי') cleaning = 1;
    else if(res['cleaning'] === 'ממוצע') cleaning = 64;
    else if(res['cleaning'] === 'לא נקי') cleaning = 512;

    return {
        occupation: occupation, 
        religion: religion, 
        kitchen: kitchen, 
        diet: diet, 
        smoking: smoking, 
        animals: animals, 
        playInstrument: playInstrument, 
        cleaning: cleaning
    }; 
};

// RoommateDetail.find().then((doc) => {
//     translateLables(doc); 
// });

// const encodedLables = new EncodedLables({
//     occupation: {partTime: 32, fullTime: 128, student: 256, soldier: 512, unoccupied: 1024, noPref: -9999}, 
//     religion: {religious: 16, traditional: 64, secular: 128, atheist: 512, noPref: -9999}, 
//     kitchen: {kosher: 1, noKosher: 256, noPref: -9999}, 
//     diet: {regular: 1, vegetarian: 64, vegan: 512, noPref: -9999}, 
//     smoking: {smoke: 1, noSmoke: 256, noPref: -9999}, 
//     animals: {proAnimals: 1, conAnimals: 256, noPref: -9999}, 
//     playInstrument: {proPlay: 1, conPlay: 256, noPref: -9999}, 
//     cleaning: {clean: 1, average: 64, notClean: 512, noPref: -9999}
// });


// encodedLables.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2)); 
// }, (e) => {
//     console.log('Unable to save doc', e); 
// });



module.exports = router;