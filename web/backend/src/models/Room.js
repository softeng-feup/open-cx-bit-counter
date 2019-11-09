var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    name: {type: String, unique: true},
    maxOccupation: {type: Number, default: 0},
    talk: [{type: Schema.Types.ObjectId, ref: 'Talk'}]
});

module.exports = mongoose.model('Room',Room);
