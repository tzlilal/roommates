const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    occupation: {type: Object}, 
    religion: {type: Object}, 
    kitchen: {type: Object}, 
    diet: {type: Object}, 
    smoking: {type: Object}, 
    animals: {type: Object}, 
    playInstrument: {type: Object},
    cleaning: {type: Object}
});

module.exports = mongoose.model('EncodedLables', schema);