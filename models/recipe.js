var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    description: { type: String },
    imagePath: { type: String },
    catagory: { type: String },
    ingredients: [{ name:{type:String},
                    amount:{type:Number},                    
    }]
});

module.exports = mongoose.model('Recipe', schema);