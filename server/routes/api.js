const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PythonShell = require('python-shell');
const multer = require('multer'); // for extracting files 

const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 
const RoommateDetail = require('../../models/roommate-detail'); 
const RoommateDetailEncoded = require('../../models/roommate-detail-encoded'); 

const myPythonScriptPath = '/server/test.py';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({  // configure how multer stores things 
    destination: (req, file, cb) => { // executes whenever multer tries to save a file 
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "server/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
});

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
      let token = jwt.sign({user: user}, 'mysecret', {expiresIn: 7200}); // creates a new token and signs it
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

// user profile
router.get('/users/:id', function(req, res) {
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

router.post('/account', multer({ storage: storage }).single("image"), function (req, res, next) {
    const userResult = JSON.parse(req.body.user); 
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if('firstName' in userResult)
            user.firstName = userResult.firstName;
        if('lastName' in userResult)
            user.lastName = userResult.lastName; 
        if('password' in userResult)
            user.password = bcrypt.hashSync(userResult.password, 10);
        if('email' in userResult)
            user.email = userResult.email; 
        if('phoneNumber' in userResult) { 
            // console.log('userResultuserResultuserResult')
            user.phoneNumber = userResult.phoneNumber; 
        }
        if(req.file) {
                if('filename' in req.file) {
                    const url = req.protocol + '://' + req.get("host"); 
                    user.imagePath = url + "/images" + req.file.filename; 
            }
        }
        user.save(function(err, result) {
            if(err){
              return res.status(500).json({
                title: 'An error occured', 
                error: err
              });
            }
            res.status(201).json({
              message: 'User updated',
              user: {
                  ...result,
                  id: result._id
              }
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
            kitchen: req.body.kitchen, 
            diet: req.body.diet, 
            smoking: req.body.smoking, 
            animals: req.body.animals, 
            playInstrument: req.body.playInstrument, 
            cleaning: req.body.cleaning, 
            additionalInfo: req.body.additionalInfo, 
            user: user._id, 
            roommateDetailEncoded: null
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
    User.findById(decoded.user._id).populate('userDetail').exec(function (err, user) {
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
        user.userDetail.roommateDetailEncoded = roommateDetailEncoded._id; 
        user.roommateDetailEncoded = roommateDetailEncoded._id; 
        user.userDetail.save();
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

function pythonScript(id, resultArr, res) { 
    resultArr.push({_id: id}); 
    var pyshell = new PythonShell(myPythonScriptPath);

    pyshell.send(JSON.stringify(resultArr));

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        let result = JSON.parse(message); 

        User.find({
            '_id': { $in: result}
        }).populate('userDetail').populate('roommateDetail').exec(function(err, result) {
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

router.get('/matches', function(req, res) {
    let decoded = jwt.decode(req.query.token);
    const id = decoded.user._id; 
    User.findById(id).populate('roommateDetail').populate('userDetail').exec(function(err, result) {
        let onlyMaleOrFemale = true; 
        const minAge = result.roommateDetail.minAge - 1;
        const maxAge = result.roommateDetail.maxAge + 1;
        const gender = result.roommateDetail.gender;
        if (gender === 'אין העדפה')
            onlyMaleOrFemale = false; 
        const regions = result.userDetail.regions; 
        if (onlyMaleOrFemale) {
            UserDetail.find({age: { $gt: minAge, $lt: maxAge}, regions: { $in: regions }, sex: gender}).populate('roommateDetailEncoded').exec(function(err, result) {
                // console.log(JSON.stringify(result, undefined, 2));
                let userEncodedArr = []; 
                result.forEach(function(val) {
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

router.post('/searchUser', function (req, res, next) {     
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

router.post('/favorites', function (req, res, next) {
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

router.get('/favorites', function (req, res, next) {
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

module.exports = router;