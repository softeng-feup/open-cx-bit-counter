var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    name: {type: String, unique: true},
    talk: [{type: Schema.Types.ObjectId, ref: 'Talk'}]
});

module.exports = mongoose.model('Room',Room);
