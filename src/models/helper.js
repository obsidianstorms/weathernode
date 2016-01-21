//CommonJS pattern

var wapiVar = 'hello';
exports.varv = function () {
    return wapiVar; //abuse of local global?
};

exports.postValues = function(data){
    var pairs = data.split('&');
    var collection = {}; //[];
    for (i = 0; i < pairs.length; i++)
    {
        var keysvalues = pairs[i].split('=');
        collection[keysvalues[0]] = keysvalues[1];
    }
    return collection;
};