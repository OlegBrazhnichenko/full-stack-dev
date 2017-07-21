window.onload = function(){
    var result = 0;
    for(var i = -1000; i <= 1000; i++){
        result += i;
    }
    document.getElementById('result').innerHTML = 'result: ' + result;
};
