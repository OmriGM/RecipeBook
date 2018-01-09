var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    catagory: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Recipe', schema);