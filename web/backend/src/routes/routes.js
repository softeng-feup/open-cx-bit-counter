const router =require('express').Router();

const main = require('../main/room');
const talk = require('../main/talk');

router.route('/api/room/list').get(function(req,res){
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

router.route('/api/room/create').get(function(req,res){
    let { name } = data;

    main.createRoom(name)
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})

router.route('/api/room/update').get(function(req,res){
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


router.route('/api/talk/create').get(function(req,res){
    let {title} = req.query;
    let {orator} = req.query;
    let {room} = req.query;
    let {start} = req.query;
    let {end} = req.query;
    talk.createTalk(title, orator, room, start, end)
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})

router.route('/api/talk/list').get(function(req,res){
    talk.listAll()
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})
module.exports = router;
