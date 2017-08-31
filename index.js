var express = require('express');
var firebase = require('firebase')
var app = express();
//var mongoose = require('mongoose');
var config = require('./config/config');
var apiController = require('./controllers/outputController')
var port = process.env.PORT || 3000;
//var port = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 3000;
//var setupController = require('./controllers/setupController');
app.use('/assets',express.static(__dirname+'/public'));

//this is added to resolve cross origin problem
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 //res.send("WELdsdsccccccccdCOME");
  next();
});


app.set('view engine','ejs');

console.log('1111115555551111111111');


 var config = {
    apiKey: "AIzaSyDYiYRMlAZpEXya9aVUhv9cpJwJL4Oz7gM",
    authDomain: "dazzling-torch-8270.firebaseapp.com",
    databaseURL: "https://dazzling-torch-8270.firebaseio.com",
    projectId: "dazzling-torch-8270",
    storageBucket: "dazzling-torch-8270.appspot.com",
    messagingSenderId: "935228019520"
  };
  firebase.initializeApp(config);

console.log('firebase connected...');
//mongoose.connect(config.getDbConnectionString());
//mongoose.connect('output-server:k8084164@ds123050.mlab.com:23050/app-data');
//console.log(config.getDbConnectionString());
/*mongoose.connection
    .once('open', () => console.log('Good to go!'))
    .on('error',(error) =>{consol.warn('Warning',error);
});*/

//setupController(app);
apiController(app);
app.listen(port);