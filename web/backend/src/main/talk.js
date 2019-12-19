const Talk = require('../models/Talk');
const Room = require('../models/Room');


module.exports = {
  clearTalks: function () {
    return new Promise(function (resolve, reject) {
      Talk.remove({}).then(() =>  {
        resolve({code: 200})
      }).catch((error) => {
        reject({code: 200, error})
      });
    })
  },
  createTalk: function (title, speaker, room, start, end) {
    return new Promise(function (resolve, reject) {

      mTalk = new Talk({
        title: title,
        speaker: speaker,
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
      Talk
        .findById(id)
        .remove() 
        .exec(function (talk) { //need to see which function of mangoose to use
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
          resolve({
            code: 200,
            talk: talkList
          })
        });
    })
  },
};