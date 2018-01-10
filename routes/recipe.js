var express = require('express');
var router = express.Router();

var Recipe = require("../models/recipe");

//get all recipes
router.get('/', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) {
            return res.status().json({
                title: 'recipes not found',
                error: err
            });
        }
        else {
            res.status().json({
                title: 'all recipes',
                obj: recipes
            });
        }
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
        res.status().json({
            title: 'recipe saved',
            obj: result
        });
    });

});

//TODO:
//delete recipe
router.delete('/:id', function (req, res) {
    var recipeId = req.params.id;
    Recipe.findById(recipeId, function (err, recipe) {
        if (err) {
            return res.status(500).json({
                title: 'an error occureed',
                error: err
            })
        }
        if (!recipe) {
            return res.status().json({
                title: 'recipe not found',
            });
        }

        recipe.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'recipe deleted',
                obj: result
            });
        })
    });
})

//save modified recipe in data base
router.patch('/:id', function (res, req) {
    var recipeId = req.params.id;
    Recipe.findById(recipeId, function (err, recipe) {
        if (err) {
            return res.status(500).json({
                title: 'an error occureed',
                error: err
            })
        }
        if (!recipe) {
            return res.status(500).json({
                title: 'recipe not found',
            });
        }
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.imagePath = req.body.imagePath;
        recipe.catagory = req.body.catagory;
        recipe.ingredients = req.body.ingredients;

        recipe.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'recipe changed',
                obj: result
            });
        })
    });
})
module.exports = router;
