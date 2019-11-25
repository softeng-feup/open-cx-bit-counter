var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Talk = new Schema({
    title: String,
    speaker: String,
    start: Date,
    end: Date,
    occupation: {type: Number, default: 0},
    occupation_list : [{value : {type : Number}, date : {type: Date, default: Date.now }}],
    _room: {type: Schema.Types.ObjectId, ref: 'Room'}
});

module.exports = mongoose.model('Talk',Talk);
