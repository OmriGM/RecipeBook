var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    city: { type: String },
    lat: { type: Number },
    lon: { type: Number }
});


module.exports = mongoose.model('Store', schema);