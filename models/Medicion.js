var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medicion = mongoose.model('Mediciones', {
  id: Number,
  temperature: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Medicion;
