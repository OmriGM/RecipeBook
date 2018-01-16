var express = require('express');
var router = express.Router();

var Recipe = require("../models/recipe");



//Add recipe
router.post('/', function (req, res, next) {
    var recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        imagePath: req.body.imagePath,
        catagory: req.body.catagory,
        ingredients: req.body.ingredients
    }, { strict: false })
    recipe.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'error saving data',
                erorr: err
            })
        }
        res.status(200).json({
            title: 'recipe saved',
            obj: result
        });
    });

});

//get all recipes
router.get('/', function (req, res, next) {
    Recipe.find(function (err, recipes) {
        if (err) {

            return res.status(500).json({
                title: 'recipes not found',
                error: err
            });
        }
        res.status(200).json({
            title: 'all recipes',
            obj: recipes
        });
    });
})


//TODO:
//delete recipe
router.delete('/:id', function (req, res) {
    var name = req.params.id;
    Recipe.findOne({ 'name': name }, function (err, recipe) {
        if (err) {
            return res.status(500).json({
                title: 'an error occureed',
                error: err
            })
        }
        if (!recipe) {
            return res.status(401).json({
                title: 'recipe not found',
            });
        }

        recipe.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred,recipe has not been deleted!',
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
router.patch('/:id', function (req, res) {
    var recipeId = req.params.id;
    Recipe.findOne({ "name": recipeId }, function (err, recipe) {
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
                message: 'recipe updated!',
                obj: result
            });
        })
    });

})
router.get('/group', function (req, res) {
    Recipe.aggregate([
        { "$group": { _id: "$catagory", count: { $sum: 1 } } }], function (err, result) {
            if (err) {
                return res.status(401).json({
                    title: 'error occured',
                    error: err
                })
            }
            res.status(201).json({
                title: 'recipe group by',
                obj: result
            });
        });
})
module.exports = router;
