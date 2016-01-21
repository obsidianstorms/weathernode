// Basic functionality
var http = require('http');

// Functional addition for string manipulation
var sprintf = require('sprintf-js').sprintf;


// Example API URL: http://api.wunderground.com/api/496c4d2b876438d5/conditions/q/MT/Missoula.json
// Example station instead of location (MT/Missoula): pws:KMTMISSO15
var requestCategory = 'conditions';

// Keys should map to location identifiers in the client.html
var weatherStationLocations = {
    'mso': 'MT/Missoula',
    'home': 'pws:KMTMISSO15',
    'den': 'CO/Denver'
};

// Raw API URL string
var apiKey = "";
var apiUrlString = "http://api.wunderground.com/api/" + apiKey + "/%1$s/q/%2$s.json";

// CommonJS pattern
exports.query = function (station, callerResponseFunction, callerResponse) {
    console.log(station);
    var url = sprintf(apiUrlString, requestCategory, weatherStationLocations[station]);
    var process = processWrapper(callerResponseFunction, callerResponse);
    var dataResult = http.get(url, process)
        .on('error', function(e) {
            console.log('error: ', e);
        });
    // anything outside the .on would not be async
};

function processWrapper(callerResponseFunction, callerResponse) {
    return function process(weatherResponse) {
        var body = '';
        var chunks = [];
        weatherResponse.on('data', function(chunk) {
            //body += chunk;
            chunks.push(chunk);
        });
        weatherResponse.on('end', function() {
            body = chunks.join('');
            var responseData = JSON.parse(body);
            //console.log(response);
            //console.log(response.current_observation);
            //console.log(responseData.current_observation.observation_time);
            console.log(responseData.current_observation.temperature_string);
            //console.log(responseData.current_observation.temp_f);
            //console.log(responseData.current_observation.feelslike_string);
            //console.log(responseData.current_observation.feelslike_f);
            //console.log(responseData.current_observation.display_location.city);
            //console.log(responseData.current_observation.display_location.state);
            //console.log(responseData.current_observation.station_id);

            //return responseData.current_observation.temperature_string;
            callerResponseFunction(responseData.current_observation.temperature_string, callerResponse);
        });
    };
}
