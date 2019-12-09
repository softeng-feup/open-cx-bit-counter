//Libraries
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

//server configuration
var basePath = '/';
var port = 6200;


const admin = require('./src/main/admin');
// Connection to DB
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Routes and Backend Functionalities
var routes = require('./src/routes/routes');
routes.generateKey();

// App Instance
var app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, routes);

// Execute App
app.listen(port, () => {
  console.log('Backend running on Port: ',port);
});
