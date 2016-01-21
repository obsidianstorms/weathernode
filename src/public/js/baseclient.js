$(document).ready(function () {

    $("#query").click(function () {
        debug('Button clicked');
        runAjax();
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



function runAjax() {
    var serverUrl = ""; //http://ip.ad.dr.ess:port
    // Submit request
    request = $.ajax({
        url: serverUrl + "/ajax",
        type: "POST", //GET, PUT, DELETE
        dataType: "json",
        data: {
            ajaxkey: "ajaxpair"
            //weather specific
        }
    });

    request.done(function (response, textStatus, jqXHR) {
        dump(response);
        debug('some done event occurred and finished')
    });

    request.fail(function (response, textStatus, errorThrown) {
        switch (response.status) {
            case 404:
                debug('some 404 error');
                break;
            case 400:
                //try catch to attempt to handle PHP Fatal Errors where there is no JSON response
                //try {
                //    $returnedFailure = $.parseJSON(response.responseText);
                //} catch (err) {
                //    $returnedFailure = textStatus;
                //}
                debug('some 400 error');
                break;
            default:
                debug('some default error: [' + textStatus + "]:" + errorThrown);
                dump(errorThrown);
        }

    });

    request.always(function () {
        // something to do always
        debug('some always event');
    });

}