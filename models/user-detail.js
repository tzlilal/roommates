const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const schema = new Schema({
    sex: {type: String, required: true},
    age: {type: String, required: true},
    regions: {type: [String], required: true},
    martialStatus: {type: String, required: true}, 
    hasChildren: {type: String, required: true}, 
    occupation: {type: String, requird: true}, 
    religion: {type: String, required: true}, 
    kitchen: {type: String, required: true}, 
    diet: {type: String, required: true}, 
    smoking: {type: String, required: true}, 
    animals: {type: Object, required: true}, 
    playInstrument: {type: String, required: true},
    cleaning: {type: String, required: true},
    additionalInfo: {type: String}, 
    user: {type: Schema.Types.ObjectId, ref: 'User'}, 
    roommateDetailEncoded: {type: Schema.Types.ObjectId, ref: 'RoommateDetailEncoded'}
});

module.exports = mongoose.model('UserDetail', schema);