require('./server/config/db.js');
var express = require('express');
var app     = express();
var path    = require('path');

var bodyParser = require('body-parser');

var routes = require('./server/routes/routes.js');

app.set('port', (process.env.PORT || 3000));

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/libs', express.static(__dirname + '/public/libs'));
app.use('/font', express.static(__dirname, + '/font'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use('/api', routes);

app.use(function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
	console.log('Magic happens on port', + port);
});