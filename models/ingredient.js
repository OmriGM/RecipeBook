var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true},
    amount: {type: String, required: true},
    catagory: {type: String, required: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Ingredient', schema);