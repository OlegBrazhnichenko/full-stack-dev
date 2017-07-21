const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;
const VALID_TIME_LENGTH = 3;

function count(){
    var first_date = [
        new Date(document.getElementById("date1").value),
        document.getElementById("time1").value
    ];
    var second_date = [
        new Date(document.getElementById("date2").value),
        document.getElementById("time2").value
    ];
    if(valid(first_date) && valid(second_date)){
        showResult(compare(first_date,second_date));
    }else{
        alert("Date is invalid!");
    }
}

function valid(date){
    if(date[0] !== "" && date[1] !== ""){
        if(date[1].split(":").length === VALID_TIME_LENGTH){
            var reg = new RegExp("/^([0-1]?[0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])?$/");

            return reg.test(date[1]);
        }
    }

    return false;
}

function compare(d1, d2){
    var result = getMillisecondsFromDate(d2) - getMillisecondsFromDate(d1);
    if (result > 0){

        return result;
    }else{
        alert("second date must be higher than first!");
    }

    return -1;
}

function showResult(res){
    if(res === -1){

        return false;
    }
    var date = new Date(res);
    date = formateDate(date);
    alert(date);
}

function formateDate(date){
    var str = '';
    str += date.getUTCDate()-1 + " days, ";
    str += date.getUTCHours() + " hours, ";
    str += date.getUTCMinutes() + " minutes, ";
    str += date.getUTCSeconds() + " seconds, ";
    str += date.getUTCMilliseconds() + " millis";

    return str;
}
function getMillisecondsFromDate(date){
    date[1] = date[1].split(":");

    return date[0].getTime() + date[1][0]*MINUTES*SECONDS*MILLISECONDS //hours to milliseconds
                             + date[1][1]*SECONDS*MILLISECONDS // minutes to milliseconds
                             + date[1][2]*MILLISECONDS; // seconds to milliseconds
}