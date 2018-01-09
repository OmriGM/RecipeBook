var express = require('express');
var router = express.Router();

var Recipe = require("../models/recipe");

//get all recipes
router.get('/', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) {
            res.status.json({
                title: 'recipes not found',
                error: err
            });
        }
        res.status.json({
            title: 'all recipes',
            obj: recipes
        });
    });
})

//Add recipe
router.post('/', function (req, res, next) {
    var recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        catagory: req.body.catagory,
        ingredients: req.body.ingredients
    })
    recipe.save(function (err, result) {
        res.status.json({
            title: 'recipe saved',
            obj: result
        });
    });

});

//TODO:
//delete recipe
router.delete('/:id',function(req,res){

})

//put modified recipe in data base
router.put('/:id',function(res,req){
    
})
module.exports = router;
