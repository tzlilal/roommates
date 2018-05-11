var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    city: {type: String, required: true},
    street: {type: String, required: true},
    neighborhood: {type: String, required: true}, 
    price: {type: Number, required: true}, 
    arnona: {type: Number, requird: true}, 
    paymentsOverAYear: {type: Number, required: true}, 
    numOfRooms: {type: Number, required: true}, 
    numOfRoomies: {type: Number, required: true}, 
    sizeInSquareMeter: {type: Number, required: true}, 
    enterDate: {type: Date, required: true}, 
    isImmediate: {type: Boolean, required: true}, 
    airConditioner: {type: String, required: true}, 
    parking: {type: String, required: true}, 
    numOfbalconies: {type: Number, required: true},
    floorNum: {type: String, required: true},
    hasBars: {type: Boolean, requird: true}, 
    hasElevator: {type: Boolean, requird: true}, 
    optionForAnimals: {type: Boolean, requird: true}, 
    furniture: {type: String, requird: true}, 
    additionalFurnitureInfo: {type: String, requird: true}, 
    additionalInfo: {type: String, requird: true}
    // pictues of the apartment 
});

module.exports = mongoose.model('Apartment', schema);