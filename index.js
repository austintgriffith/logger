var express = require('express');
var app = express();
var http = require('http').createServer(app);
app.use(express.static('build'));
var bodyParser = require("body-parser");
app.use(bodyParser());
var fs = require("fs");

app.get('/', function(req, res){
    res.send("Hello from Logger.");
});

app.post('/', function(req, res){
    res.send("Thanks");
    console.log(req.body);
});

var listener = http.listen("32888",'0.0.0.0', function () {
  var host = '0.0.0.0';
  var port = listener.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
