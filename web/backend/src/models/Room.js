var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    value: Number,
});

module.exports = mongoose.model('Room',Room);
