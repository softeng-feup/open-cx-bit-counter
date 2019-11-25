const router =require('express').Router();

const main = require('../main/room');
const talk = require('../main/talk');





/**
 * 
 * @api {Get} /api/room/list list rooms
 * @apiName GetRooms
 * @apiGroup room
 * @apiDescription This route is responsible for listing all the rooms in the database
 *                 or the info of a single room
 * 
 * @apiParam  {String} name - The name of the room (ex: B350) leave empty if you want a list of every room
 * 
 * @apiSuccess (200) {array} room - array of the rooms with all the info of the rooms (param "room", is empty)
 * @apiSuccess (200) {array} room - info of the room (param "room", is not empty)
 * @apiSuccess (200) {Number} code - code result
 * 
 */
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

/**
 * 
 * @api {Post} /api/room/create - Create Room
 * @apiName CreateRooms
 * @apiGroup room
 * @apiDescription This route is responsible for creating a room
 * 
 * @apiParam  {String} name - The name of the room (ex: B350)
 * @apiParam  {String} maxOccupation - The max number of people the room can take
 * 
 * @apiSuccess (200) {array} room - info of the room created
 * @apiSuccess (200) {Number} code - code result
 * 
 */
router.route('/api/room/create').post(function(req,res){
    let { name, maxOccupation } = req.query;

    main.createRoom(name)
    .then(function(result) {
        res.json({
            code: 200,
            room: result
        });
    })
})

/**
 * 
 * @api {Post} /api/room/create - Update room
 * @apiName UpdateRooms
 * @apiGroup room
 * @apiDescription This route is responsible for updating a room's occupation for the talk running atm
 * 
 * @apiParam  {String} name - The name of the room (ex: B350)
 * @apiParam  {String} occupation - The occupation of the room atm
 * 
 * @apiSuccess (200) {Object} talk - the updated talk
 * @apiSuccess (200) {Number} code - code result
 * 
 * @apiError (404) {Number} code - the updated talk
 * @apiError (404) {String} message - error message
 */
router.route('/api/room/update').post(function(req,res){
    let {name} = req.query;
    let {occupation} = req.query;
    main.updateRoomOccupation(name, occupation)
    .then(function(result) {
        res.json(result);
    })
})


/**
 * 
 * @api {Post} /api/talk/create - Create talk
 * @apiName CreateTalk
 * @apiGroup talk
 * @apiDescription This route is responsible for a talk
 * 
 * @apiParam  {String} title - The title of the talk
 * @apiParam  {String} orator - The orator's name of the talk
 * @apiParam  {String} room - The room of the talk
 * @apiParam  {Number} start - The starting time of the talk in unix (ex: 1573306076000) 13 numbers
 * @apiParam  {Number} end - The ending time of the talk in unix (ex: 1573306076000) 13 numbers
 * 
 * @apiSuccess (200) {Object} talk - the created talk
 * @apiSuccess (200) {Number} code - code result
 * 
 * @apiError (404) {Number} code - the updated talk
 * @apiError (404) {String} message - error message
 */
router.route('/api/talk/create').post(function(req,res){
    let {title} = req.query;
    let {orator} = req.query;
    let {room} = req.query;
    let {start} = req.query;
    let {end} = req.query;
    talk.createTalk(title, orator, room, start, end)
    .then(function(result) {
        res.json(result);
    })
})


/**
 * 
 * @api {Post} /api/talk/list - Update room
 * @apiName GetTalks
 * @apiGroup talk
 * @apiDescription This route is responsible for giving a list of all talks
 * 
 * @apiSuccess (200) {Array} talk - array of talk objects
 * @apiSuccess (200) {Number} code - code result
 * 
 * @apiError (404) {Number} code - the updated talk
 * @apiError (404) {String} message - error message
 */
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

/**
 * 
 * @api {Post} /api/talk/delete - Delete talk
 * @apiName DeleteTalk
 * @apiGroup talk
 * @apiDescription This route is responsible for deleting a talk
 * 
 * @apiParam  {String} title - The title of the talk
 * @apiParam  {String} orator - The orator's name of the talk
 * @apiParam  {String} room - The room of the talk
 * @apiParam  {Number} start - The starting time of the talk in unix (ex: 1573306076000) 13 numbers
 * @apiParam  {Number} end - The ending time of the talk in unix (ex: 1573306076000) 13 numbers
 * 
 * @apiSuccess (200) {Object} talk - the created talk
 * @apiSuccess (200) {Number} code - code result
 * 
 * @apiError (404) {Number} code - the updated talk
 * @apiError (404) {String} message - error message
 */
router.route('/api/talk/delete').delete(function(req,res){
    let {title} = req.query;
    let {orator} = req.query;
    let {room} = req.query;
    let {start} = req.query;
    let {end} = req.query;
    talk.deleteTalk(title, orator, room, start, end)
    .then(function(result) {
        res.json(result);
    })
})
