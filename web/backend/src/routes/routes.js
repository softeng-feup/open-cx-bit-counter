var express = require('express');
var app = express();
var router =express.Router();


//Schema
var Measure = require('../models/Room');

router.route('/').get(function(req,res){
    Measure.find(function (err,items){
        if(err){
            console.log(err);
        } else {
            res.json(items);
        }
    })
})

module.exports = router;
