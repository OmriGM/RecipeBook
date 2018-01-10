var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: String, required: true },
    lon: { type: String, required: true }
});


module.exports = mongoose.model('Store', schema);