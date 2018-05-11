var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    city: {type: String, required: true},
    enterDate: {type: Date, required: true}, 
    isImmediate: {type: Boolean, required: true}, 
    maxPrice: {type: Number, required: true}, 
    lenghtOfStay: {type: String, requird: true}, 
    optionForAnimals: {type: Boolean, requird: true}, 
    numOfRooms: {type: Number, required: true}, 
    numOfRoomies: {type: Number, required: true}, 
    furniture: {type: String, requird: true}, 
    airConditioner: {type: String, required: true}, 
    parking: {type: String, required: true}, 
    numOfbalconies: {type: Number, required: true},
    floorNum: {type: String, required: true},
    hasBars: {type: Boolean, requird: true}, 
    hasElevator: {type: Boolean, requird: true}
});

module.exports = mongoose.model('ApartmentDetail', schema);