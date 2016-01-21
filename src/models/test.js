
//var basearray = {
//    '1': 'a',
//    '2': 'b',
//    '3': 'c'
//};
//
//function process(vara, varb)
//{
//    console.log(vara + varb);
//}
//
//var scndarray = [];
//
//for (var el in basearray) {
//    var data = "boo";
//    var single = basearray[el];
//    var addtlfunc = function (param) {
//        return function(single) {
//            //var double = 'aaah';
//            var double = param;
//            process(single, double);
//        }
//    } (el);
//    //newfunc(el);
//    addtlfunc('foo');
//    scndarray.push(addtlfunc);
//}
//
//for (var ex in scndarray) {
//    scndarray[ex]('foo');
//}


//arr = [];
//for (var i = 1; i < 4; i++) {
//    arr[i] = function () {
//        var a = i;  //j, //b
//        console.log(a);
//    }
//}
//
//for (var j = 2; j < 3; j++) {
//    arr[j]();
//    console.log(arr[j]);
//}


arr = [];
for (var i = 1; i < 4; i++) {
    arr[i] = function (x) {
        return function () {
            var a = x;
            console.log(a);
        }
    } (i);
}


for (var j = 1; j < 4; j++) {
    arr[j]();
}



executeFunction(variable, callbackFunction(parameter));

function executeFunction(variable, whatgoesheretorequireorfillingparameter) {
    console.log("some output after processing");
}

function callbackFunction(providedParameter) {
    console.log("someoutput after callback processing");
}

function callbackFunctionIWant(providedParameter, wantedToAddExtraParameter) {
    console.log("someoutput after callback processing with extra parameter");
}