const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    registryDate: {type: Date}, 
    isActive: {type: Boolean},
    phoneNumber: {type: String}, 
    userDetail: {type: Schema.Types.ObjectId, ref: 'UserDetail'}, 
    roommateDetail: {type: Schema.Types.ObjectId, ref: 'RoommateDetail'}, 
    apartment: {type: Schema.Types.ObjectId, ref: 'Apartment'}, 
    apartmentDetail: {type: Schema.Types.ObjectId, ref: 'ApartmentDetail'},
    roommateDetailEncoded: {type: Schema.Types.ObjectId, ref: 'RoommateDetailEncoded'},
    users: [{type: Schema.Types.ObjectId}],
    imagePath: {type: String}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);