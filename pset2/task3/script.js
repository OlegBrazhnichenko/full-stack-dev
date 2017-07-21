window.onload = function(){
    var stars = "";
    document.getElementById('stars').innerHTML = '';
    for(var i = 0; i <= 50; i++){
        stars += "*";
        document.getElementById('stars').innerHTML += stars + '<br>';
    }
};