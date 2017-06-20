var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    user_id:String,
    name:String,
    address:String,
    phno:String,
    email:String,
    active:Boolean,
    createdOn:Date,
    updatedOn:Date
});
module.exports = mongoose.model('contact',contactSchema);