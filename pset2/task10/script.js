function count(){
    var number = document.getElementById('number').value;
    var result = 0;
    while( Number.parseInt(number) > 0) {
        result += number % 10;
        number = Number.parseInt( number / 10 );
    }
    document.getElementById('result').innerHTML = "result: " + result;
}