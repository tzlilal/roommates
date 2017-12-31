var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'} // refrence to the user who created the message
});

module.exports = mongoose.model('Message', schema);
// we determine the name "Message" , late well create an object from it
// also it determins the name of the collection mongoose will create for us (the name of the collection will be: messages)