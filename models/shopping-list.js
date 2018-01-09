var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    userId: { type: String, required: true },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    recipeIds: { type: String, required: true },
    date: { type: Date, required: true },
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('ShoppingList', schema);