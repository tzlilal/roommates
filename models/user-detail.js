var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    sex: {type: String, required: true},
    age: {type: String, required: true},
    martialStatus: {type: String, required: true}, 
    hasChildren: {type: String, required: true}, 
    occupation: {type: String, requird: true}, 
    sexualOrient: {type: String, required: true}, 
    religion: {type: String, required: true}, 
    kosher: {type: String, required: true}, 
    kitchen: {type: String, required: true}, 
    diet: {type: String, required: true}, 
    smoking: {type: String, required: true}, 
    animals: {type: Object, required: true}, 
    cleaning: {type: String, required: true},
    additionalInfo: {type: String, required: true}
});

module.exports = mongoose.model('UserDetail', schema);