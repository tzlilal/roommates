var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    minAge: {type: Number, required: true},
    maxAge: {type: Number, required: true},
    female: {type: String, required: true},
    male: {type: String, reqired: true},
    religion: {type: String, required: true}, 
    kosher: {type: String, required: true}, 
    kitchen: {type: String, required: true}, 
    diet: {type: String, required: true}, 
    smoking: {type: Boolean, required: true}, 
    animals: {type: Boolean, required: true}, 
    cleaning: {type: String, required: true}
});

module.exports = mongoose.model('RoommateDetail', schema);