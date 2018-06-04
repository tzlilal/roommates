const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const schema = new Schema({
    minAge: {type: String, required: true},
    maxAge: {type: String, required: true},
    gender: {type: String, required: true},
    occupation: {type: String, requird: true}, 
    religion: {type: String, required: true}, 
    kitchen: {type: String, required: true}, 
    diet: {type: String, required: true}, 
    smoking: {type: String, required: true}, 
    animals: {type: String, required: true}, 
    playInstrument: {type: String, required: true},
    cleaning: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('RoommateDetail', schema);