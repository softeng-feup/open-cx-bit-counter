const Talk = require('../models/Talk');
const Room = require('../models/Room');


module.exports = {
  createTalk: function (title, orator, room, start, end) {
    return new Promise(function (resolve, reject) {

      mTalk = new Talk({
        title: title,
        orator: orator,
        start: start,
        end: end
      });
      mTalk.save(function (error, talk) {
        if (error) {
          reject({
            code: 409,
            message: 'Duplicate Data',
          });
          return;
        }
        Room.findOneAndUpdate({ name: room }, { $push: { talk: talk } }, { new: true, upsert: true, useFindAndModify: false }, (error, talk) => {
          if (error) {
            console.log(error)
            reject({
              code: 403,
              message: 'Could not fetch data',
            });
          }
          resolve({
            code: 200,
            talk: talk
          })
        });
      })
    })
  },
  deleteTalk: function (id) {
    return new Promise(function (resolve, reject) {
      Talk.deleteOne({id:id}, function (error) {
        if (error) {
          reject({
            code: 409,
            message: 'Duplicate Data',
          });
          return;
        }
        resolve({
          code: 200,
          talk: talk
        })
      });
    });
  },
  listAll: function () {
    return new Promise(function (resolve, reject) {
      Talk
        .find()
        .exec(function (err, talkList) {
          console.log(talkList)
          resolve({
            code: 200,
            talk: talkList
          })
        });
    })
  },
};