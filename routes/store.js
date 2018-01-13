var express = require('express');
var router = express.Router();
var Store = require('../models/store')

router.get('/', function (req, res, next) {
    Store.find(function (err, stores) {
        if (err) {
            return res.status(401).json({
                title: 'error occured',
                error: err
            })
        }
        else {
            res.status(200).json({
                title: 'all stores',
                obj: JSON.parse(JSON.stringify(stores || null ))
            });
        }
    });
});

//group by and count for all sotres by city 
router.get('/group', function (req, res, next) {
    Store.aggregate([
        { "$group": { _id: "$city", count: { $sum: 1 } } }], function (err, result) {
            if (err) {
                return res.status(401).json({
                    title: 'error occured',
                    error: err
                })
            }
            res.status(201).json({
                title: 'stores group by cities.',
                obj: result
            });
        });
});
module.exports = router;
