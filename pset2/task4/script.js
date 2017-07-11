window.onload = function(){
    var sec_time = document.getElementById("sec_time");
    sec_time.addEventListener('input',function(event){
        display_time(convert_time(event.target.value));
    })
};

function convert_time(seconds){
    var date = new Date(null);
    date.setSeconds(seconds);

    return date.toISOString().substr(11, 8);
}

function display_time(time){
    document.getElementById("time").innerHTML = time;
}