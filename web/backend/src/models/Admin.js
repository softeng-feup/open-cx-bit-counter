var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
    id: {type: Number, unique: true},
    key: {type: String, unique: true}
});

module.exports = mongoose.model('Admin',Admin);
