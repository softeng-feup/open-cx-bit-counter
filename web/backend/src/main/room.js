const Room = require('../models/Room');
const Talk = require('../models/Talk');


module.exports = {
  clearRooms: function () {
    return new Promise(function (resolve, reject) {
      Room.remove({}).then(() =>  {
        resolve({code: 200})
      }).catch((error) => {
        reject({code: 200, error})
      });
    })
  },
  createRoom: function (name, maxOccupation) {
    return new Promise(function (resolve, reject) {
      new Room({ name, maxOccupation }).save(function (err, room) {
        resolve(room)
      });
    })
  },
  listAllRooms: function () {
    return new Promise(function (resolve, reject) {
      Room
        .find()
        .populate('talk', null, null, { sort: { 'start': -1 } })
        .exec(function (err, roomList) {
          resolve(roomList)

        });
    })
  },
  findRoomByName: function (name) {
    return new Promise(function (resolve, reject) {
      Room
        .find({ name: name })
        .exec(function (err, room) {
          resolve(room)
        });
    })
  },

  updateRoomOccupation: function (name, value) {
    return new Promise(function (resolve, reject) {
      var date = Date.now()

      Room
        .findOne({name})
        .populate('talk', null,  {start: { $lte: date }, end : {$gte: date}})
        .exec(function (err, room) {
          if(room.talk[0] == undefined){
            reject(
              {
                code:404,
                message : "no talks running at this time"
              }
            )
          }
          if(room.talk[0] === undefined){
            return reject(
              {
                code:404,
                message : "no talks running at this time"
              }
            )
          }
          Talk.findOneAndUpdate({ _id:  room.talk[0]._id}, {$set: { occupation: value }, $push : { occupation_list: {value, date} }}, { new: true, useFindAndModify: false }, (error, talk) => {
            if (error) {
              reject(
                {
                  code:404,
                  message : error
                });
            }
            resolve({
              code: 200,
              talk: talk
            });
          });
        });
    })
  }
};