const Talk = require('../models/Talk');
const Room = require('../models/Room');


module.exports = {
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
            message: 'Dupliacte Data',
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