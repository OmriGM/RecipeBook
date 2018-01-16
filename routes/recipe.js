var express = require('express');
var router = express.Router();

var Recipe = require("../models/recipe");

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'lSl9hfWRbFJ1n0UYh9UDuU4tS',
    consumer_secret:      'RBObPxHE7tIyCIJZtycsA56EkuOaSlG2t6rC9HJ1NvBr6WkIKV',
    access_token:         '953253386434043905-Xh2ebpINPQPj2qTFRAfMrYKl6nJfmHK',
    access_token_secret:  'J5KJkXswdv1vvGRIpkSYO52FnAbpUb6cNCgdGuCma3SkA',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

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
    T.post('statuses/update', { status: 'Hello Everyone. A new recipe was added to our site! Recipe name: '+recipe['name'] +', come and check it out!' }, function(err, data, response) {
        console.log(data)
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
