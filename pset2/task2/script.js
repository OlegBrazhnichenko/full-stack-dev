window.onload = function(){
    var result = 0;
    for(var i = -1000; i <=1000; i++){
        if( Math.abs(i) % 10 === 2 || Math.abs(i) % 10 === 3 || Math.abs(i) % 10 === 10 ){
            result += i;
        }
        console.log(result);
    }
    alert(result);
};
