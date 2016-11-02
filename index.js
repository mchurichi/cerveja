var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
var Medicion = require('./models/Medicion');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/sense/:id', function(request, response) {
  var deviceId = request.params.id;
  var temperature = request.query.temperature;

  var medicion = new Medicion({
    id: deviceId,
    temperature: temperature
  });

  medicion.save(function (err) {
    if (err) {
      console.log(err);
      response.send('ERROR');
    } else {
      response.send('OK');
    }
  });

  response.send(`id: ${deviceId}, temp: ${temperature}`);
});

app.get('/ping', function(request, response) {
  response.send('OK');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
