const Talk = require('../models/Talk');
const Room = require('../models/Room');


module.exports = {
  createRoom: function (data) {
    return new Promise(function (resolve, reject) {
      let { name } = data;
      new Room({ name: name }).save(function (err, room) {
        resolve(room)
      });
    })
  },
  listAllRooms: function () {
    return new Promise(function (resolve, reject) {
      Room
        .find()
        .exec(function (err, room) {
          console.log(room)
          resolve(room)
        });
    })
  },
  findRoomByName: function (name) {
    return new Promise(function (resolve, reject) {
      Room
        .find({name: name})
        .exec(function (err, room) {
          console.log(room)
          resolve(room)
        });
    })
  }
};