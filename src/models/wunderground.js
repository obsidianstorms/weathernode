var http = require('http');
var sprintf = require('sprintf-js').sprintf;


var requestCategory = 'conditions';
var weatherStationLocations = {
    'missoula': 'MT/Missoula',
    'home': 'pws:KMTMISSO15',
    'office': 'CO/Denver'
};

var apiKey = "";
var apiUrlString = "http://api.wunderground.com/api/" + apiKey + "/%1$s/q/%2$s.json";


function process(response, arg)
{
    var body = '';
    var chunks = [];
    response.on('data', function(chunk) {
        //body += chunk;
        chunks.push(chunk);
    });
    response.on('end', function() {
        body = chunks.join('');
        var responseData = JSON.parse(body);
        //console.log(response);
        //console.log(response.current_observation);
        console.log(responseData.current_observation.observation_time);
        console.log(responseData.current_observation.temperature_string);
        console.log(responseData.current_observation.temp_f);
        console.log(responseData.current_observation.feelslike_string);
        console.log(responseData.current_observation.feelslike_f);
        console.log(responseData.current_observation.display_location.city);
        console.log(responseData.current_observation.display_location.state);
        console.log(responseData.current_observation.station_id);
        console.log(myName); //global variable
        console.log(arg);
    });
}

function getSpecial(url, callback, argv) {
    return http.get(url, callback);
}

var myName = "Rick"; //global variable
for (var station in weatherStationLocations) {
    var url = sprintf(apiUrlString, requestCategory, weatherStationLocations[station]);
    //http.get(url, process).on('error', function(e) {  //how would one pass "url" into "process"? nesting callbacks, promises?
    getSpecial(url, process, "Todd").on('error', function(e) {
        console.log('error: ', e);
    });
}

