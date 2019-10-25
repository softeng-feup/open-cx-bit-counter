const router =require('express').Router();

const main = require('../main/main');

//Schema
var Measure = require('../models/Room');

router.route('/api/list/room').get(function(req,res){
    let {name} = req.query;
    if(name !== undefined){
        main.findRoomByName(name)
        .then(function(result) {
            res.json({
                code: 200,
                room: result
            });
        })
    }else{
        main.listAllRooms()
        .then(function(result) {
            res.json({
                code: 200,
                room: result
            });
        })
    }
})

router.route('/api/create/room').get(function(req,res){
    main.createRoom(req.query)
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})

router.route('/api/update/room/occupation').get(function(req,res){
    let {name} = req.query;
    let {occupation} = req.query;
    main.updateRoomOccupation(name, occupation)
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})

module.exports = router;
