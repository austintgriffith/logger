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
app.get('/favicon.ico', function(req, res){
    res.send("NO");
});

var exec = require('child_process').exec;


app.get('/:namespace/:n*/:filter*', function(req, res){
    var lines = parseInt(req.params.n);
    if(!lines) lines=1000;
    var filename = req.params.namespace.replace(/\W/g, '')+"Log.txt";
    var filtertext = "";
    if(req.params.filter){
        filtertext = " | grep '"+req.params.filter+"'";
    }
    //console.log("Filter:"+filtertext)
    exec('tail -n '+lines+' '+filename+""+filtertext,{maxBuffer: 1024 * 1000}, function(error, stdout, stderr) {
        res.send(stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});


app.get('/:namespace/:n*?', function(req, res){
    var lines = parseInt(req.params.n);
    if(!lines) lines=1000;
    var filename = req.params.namespace.replace(/\W/g, '')+"Log.txt";
    exec('tail -n '+lines+' '+filename,{maxBuffer: 1024 * 1000}, function(error, stdout, stderr) {
        res.send(stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});


app.post('/:namespace', function(req, res){
    var timestamp = Date.now();
    res.send(""+timestamp);
    var ns = req.params.namespace.replace(/\W/g, '');
    var stringBody = JSON.stringify(req.body);
    console.log(ns+" "+timestamp+" "+stringBody);
    fs.appendFile(ns+"Log.txt",timestamp+": "+stringBody+"\n");
});

var listener = http.listen("32888",'0.0.0.0', function () {
  var host = '0.0.0.0';
  var port = listener.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
