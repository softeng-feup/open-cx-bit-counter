const Room = require('../models/Room');


module.exports = {
  createRoom: function (name) {
    return new Promise(function (resolve, reject) {
      new Room({ name: name }).save(function (err, room) {
        resolve(room)
      });
    })
  },
  listAllRooms: function () {
    return new Promise(function (resolve, reject) {
      Room
        .find()
        .populate('talk', 'title orator start end')
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
  },

  updateRoomOccupation: function (name, occupation) {
    return new Promise(function (resolve, reject) {
      Room.findOneAndUpdate({ name: name }, { $set:{occupation: occupation }}, { new: true,  useFindAndModify: false }, (error, room) => {
        if (error) {
          reject(error);
        }
        resolve(room);
      });
    })
  }
};