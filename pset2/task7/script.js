function getZodiac(){

    document.getElementById("output").innerHTML = "";

    var zod_signs = ["capricorn" , "aquarius", "pisces", "aries",
        "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio",
        "sagittarius"];
    var date = document.getElementById("birth").value;

    var date_regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/ ;

    if(!(date_regex.test(date))) {
        alert("invalid");
        return false;
    }
    date = date.split("-");
    var month = Number(date[1]-1);
    var day = Number(date[2]);
    console.log(month);
    var zodiacSign = "";
    switch(month)
    {
        case 0: {//January
            if(day < 20)
                zodiacSign = zod_signs[0];
            else
                zodiacSign = zod_signs[1];
        }break;
        case 1: {//February
            if(day < 19)
                zodiacSign = zod_signs[1];
            else
                zodiacSign = zod_signs[2];
        }break;
        case 2: {//March
            if(day < 21)
                zodiacSign = zod_signs[2];
            else
                zodiacSign = zod_signs[3];
        }break;
        case 3: {//April
            if(day < 20)
                zodiacSign = zod_signs[3];
            else
                zodiacSign = zod_signs[4];
        }break;
        case 4: {//May
            if(day < 21)
                zodiacSign = zod_signs[4];
            else
                zodiacSign = zod_signs[5];
        }break;
        case 5: {//June
            if(day < 21)
                zodiacSign = zod_signs[5];
            else
                zodiacSign = zod_signs[6];
        }break;
        case 6: {//July
            if(day < 23)
                zodiacSign = zod_signs[6];
            else
                zodiacSign = zod_signs[7];
        }break;
        case 7: {//August
            if(day < 23)
                zodiacSign = zod_signs[7];
            else
                zodiacSign = zod_signs[8];
        }break;
        case 8: {//September
            if(day < 23)
                zodiacSign = zod_signs[8];
            else
                zodiacSign = zod_signs[9];
        }break;
        case 9: {//October
            if(day < 23)
                zodiacSign = zod_signs[9];
            else
                zodiacSign = zod_signs[10];
        }break;
        case 10: {//November
            if(day < 22)
                zodiacSign = zod_signs[10];
            else
                zodiacSign = zod_signs[11];
        }break;
        case 11: {//December
            if(day < 22)
                zodiacSign = zod_signs[11];
            else
                zodiacSign = zod_signs[0];
        }break;
    }
    showZodiac(zodiacSign);
}

function showZodiac(zodiacName){
    var zodiacSign = '<img src="images/' + zodiacName + '.jpg" alt="' + zodiacName + '">';
    document.getElementById("output").innerHTML = '<h1>' + zodiacName + '</h1>' + zodiacSign;
}