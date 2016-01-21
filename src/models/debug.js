
exports.debug = function (message) {
    console.log("Server: " + message);
};

exports.dump = function (obj) {
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

    //console.log("ServerDump: " + JSON.stringify(obj, null, 4));
    console.log("ServerDump: " + dump);
};