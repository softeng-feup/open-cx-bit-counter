const mongoose = require('mongoose');

const Measure = new mongoose.Schema({
  source: String,
  year: Number,
  value: Number,
  metric: String,
  country: String,
  unit: String,
});

module.exports = mongoose.model('Measure', Measure);
