const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const schema = new Schema({
    occupation: {type: Number, requird: true}, 
    religion: {type: Number, required: true}, 
    kitchen: {type: Number, required: true}, 
    diet: {type: Number, required: true}, 
    smoking: {type: Number, required: true}, 
    animals: {type: Number, required: true}, 
    playInstrument: {type: Number, required: true},
    cleaning: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('RoommateDetailEncoded', schema);