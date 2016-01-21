// Basic functionality
var http = require('http');

// Custom helpers
var debug = require('./models/debug'); //since running in hacknode/ (ie src/) then paths are relative to that
var helper = require('./models/helper');

// Read files capability
var fs = require('fs');
var path = require('path');

//3rd party api
var wunderground = require('./models/weatherApi.js');

// Build server
var server = http.createServer(requestListener);

// Launch server
var port = 4000;
server.listen(port, function() {
    debug.debug('server listening on port ' + port);
});


function requestListener(request, response) {
    //debug.dump(request);
    debug.debug(request.url + ' request starting of type: ' + request.method);

    // Routing
    if (request.url === '/ajax') {
        retrieveAjaxRequest(request, response);
    } else {
        // retrieving files
        retrieveStaticFiles(request, response);
    }

}

function retrieveAjaxRequest(request, response) {
    // Data being sent from AJAX might take a bit so use event listeners to collect and report when finished
    var body = "";
    request.on('data', function (chunk) {
        body += chunk;
    });
    request.on('end', function () {
        debug.debug("async processing: " + body); //async output of body
        var dataSubmitted = helper.postValues(body);
        debug.debug("value provided: " + dataSubmitted.stationId);

        //query third party
        wunderground.query(dataSubmitted.stationId, sendResponse, response);
    });
    debug.debug("procedural sync processing: " + body); //sync output of body, this could run prior to data transmission finishing

    //response.end(responseJson, 'utf8');  // Had to move this into a callback
}

function sendResponse(appendedData, response) {
    var responseJson = '{' +
        '"success" : "Processed Successfully", ' +
        '"status" : 200, ' +
        '"data" : "' + appendedData + '"' +
        '}';
    debug.debug(responseJson);
    // Specific requirements for returning:
    // Content-type to avoid "not well formed" and
    // Formatted JSON string '{"":"","status":"_code_"}'
    response.setHeader("Content-Type", "text/html"); //"Error: Can't set headers after they are sent."
    response.end(responseJson, 'utf8');  // Had to move this into a callback
}


function retrieveStaticFiles(request, response) {
    // extracting file information from request
    // ./public or ./ would be base path from wherever script is launched to where the 'public' files reside
    var filePath = './public' + request.url;
    if (filePath == './public/') { //default path
        filePath = './public/index.html';
    }

    fs.stat(filePath, function(statError, stats) {
        if (statError) {
            debug.debug("Stat touch of " + filePath + " produced an error: " + statError);
            response.writeHead(500);
            response.end(); //this speeded up the client's final output
        } else if (stats.isFile()) {
            // Content type determination
            var extname = path.extname(filePath);
            var contentType = 'text/html';
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
            }
            var content = "sample content";
            fs.readFile(filePath, function(error, content) {
                debug.debug('Reading file at ' + filePath);
                if (error) {
                    debug.debug('Error reading file.');
                    response.writeHead(500); //for return
                    response.end();
                }
                else {
                    debug.debug('Success reading file.');
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        } else {
            debug.debug("No error but also not a file.");
        }
    });
}