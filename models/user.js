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
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}], // all the messages created by the user 
    // ref - this messages field has a connection to anothor model - in this case to the "Message" model
    userDetail: {type: Schema.Types.ObjectId, ref: 'UserDetail'}, 
    roommateDetail: {type: Schema.Types.ObjectId, ref: 'RoommateDetail'}, 
    apartment: {type: Schema.Types.ObjectId, ref: 'Apartment'}, 
    apartmentDetail: {type: Schema.Types.ObjectId, ref: 'ApartmentDetail'}
    // add picture model 
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);