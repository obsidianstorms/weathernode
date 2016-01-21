// set environmental variables
var express = require('express');
var app = express();
var path = require('path');
var swig = require('swig');
var http = require('http');
var sprintf = require('sprintf-js').sprintf;

// magic occurs here (?)
app.engine('html', swig.renderFile);

// template connection
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// caching (one needs to be true in development environment)
app.set('view cache', false);
swig.setDefaults({ cache: false });

// static assets
app.use(express.static('public'));

// request-response routes
app.get('/', function (req, res) { //request, response
    res.render('index', {
    /* template locals context */
    });
});

// set server port
app.listen(4000);
console.log('server is running (locally @ http://localhost:4000/)');
