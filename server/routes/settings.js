const express = require('express');
const router = express.Router();
const multer = require('multer'); // for extracting files 

const User = require('../../models/user');
const UserDetail = require('../../models/user-detail'); 
const RoommateDetail = require('../../models/roommate-detail'); 
const RoommateDetailEncoded = require('../../models/roommate-detail-encoded'); 

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

router.post('/account', multer({ storage: storage }).single("image"), (req, res, next) => {
    const userResult = JSON.parse(req.body.user); 
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if ('firstName' in userResult)
            user.firstName = userResult.firstName;
        if ('lastName' in userResult)
            user.lastName = userResult.lastName; 
        if ('password' in userResult)
            user.password = bcrypt.hashSync(userResult.password, 10);
        if ('email' in userResult)
            user.email = userResult.email; 
        if ('phoneNumber' in userResult) { 
            // console.log('userResultuserResultuserResult')
            user.phoneNumber = userResult.phoneNumber; 
        }
        if (req.file) {
            if ('filename' in req.file) {
                const url = req.protocol + '://' + req.get("host"); 
                user.imagePath = url + "/images" + req.file.filename; 
            }
        }
        user.save((err, result) => {
            if (err) {
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

router.post('/userDetail', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
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
        userDetail.save((err, result) => {
            if (err) {
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

router.post('/roommateDetail', (req, res, next) => {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
    .populate('userDetail')
    .exec((err, user) => {
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
        roommateDetail.save((err, result) => {
            if (err) {
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