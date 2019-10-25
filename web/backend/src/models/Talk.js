var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talk = new Schema({
    title: String,
    orator: String,
    _room: {type: Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Talk',Talk);
