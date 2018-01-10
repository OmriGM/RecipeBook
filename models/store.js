var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Store', schema);