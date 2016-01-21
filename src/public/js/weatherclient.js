$(document).ready(function () {
    $(".query").click(function () {
        runAjax(this.id);
    });
});

function debug(message) {
    console.log("Client: " + message);
}

function dump(obj) {
    var cache = [];
    var dump = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, 4); //prepend 4 spaces to each value and cycle, helps readability
    cache = null; // Enable garbage collection

    console.log("ClientDump: " + dump);
}

function runAjax(queriedId) {
    var serverUrl = ""; //http://ip.ad.dr.ess:port
    var errorMessage = '';
    // Submit request
    request = $.ajax({
        url: serverUrl + "/ajax",
        type: "POST", //GET, PUT, DELETE
        dataType: "json",
        data: {
            stationId: queriedId
        }
    });

    request.done(function (response, textStatus, jqXHR) {
        //dump(response);
        if (response.data) {
            populateContent(queriedId + '_output', response.data);
        } else {
            populateContent(queriedId + '_output', "NA");
        }
    });

    request.fail(function (response, textStatus, errorThrown) {
        switch (response.status) {
            case 404:
                errorMessage = "A permissions error occurred.";
                break;
            case 400:
                errorMessage = "An access error occurred.";
                break;
            default:
                errorMessage = "An unknown error occurred.";
                debug('some default error: [' + textStatus + "]:" + errorThrown);
        }
        displayError(errorMessage);
    });
}


function displayError(message) {
    populateContent('error', message);
}

function populateContent(elementId, content) {
    $("#" + elementId + " .value").html(content);
}