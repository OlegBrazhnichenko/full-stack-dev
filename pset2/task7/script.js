var zodiacs = [
        {
            name:"capricorn",
            img:"capricorn.jpg"
        },{
            name:"aquarius",
            img:"aquarius.jpg"
        },{
            name:"pisces",
            img:"pisces.jpg"
        },{
            name:"aries",
            img:"aries.jpg"
        },{
            name:"taurus",
            img:"taurus.jpg"
        },{
            name:"gemini",
            img:"gemini.jpg"

        },{
            name:"cancer",
            img:"cancer.jpg"

        },{
            name:"leo",
            img:"leo.jpg"
        },{
            name:"virgo",
            img:"virgo.jpg"
        },{
            name:"libra",
            img:"libra.jpg"
        },{
            name:"scorpio",
            img:"scorpio.jpg"
        },{
            name:"sagittarius",
            img:"sagittarius.jpg"
        }
    ];

function getZodiac(){
    var date = document.getElementById("birth").value;
    date = date.split("-");
    var month = Number(date[1]);
    var day = Number(date[2]);
    var zodiac;
    if((month === 1 && day <= 20) || (month === 12 && day >=22)) {
        zodiac = zodiacs[0];
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
        zodiac = zodiacs[1];
    } else if((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        zodiac = zodiacs[2];
    } else if((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
        zodiac = zodiacs[3];
    } else if((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
        zodiac = zodiacs[4];
    } else if((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        zodiac = zodiacs[5];
    } else if((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
        zodiac = zodiacs[6];
    } else if((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
        zodiac = zodiacs[7];
    } else if((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
        zodiac = zodiacs[8];
    } else if((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
        zodiac = zodiacs[9];
    } else if((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
        zodiac = zodiacs[10];
    } else if((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
        zodiac = zodiacs[11];
    }

    showZodiac(zodiac);
}

function showZodiac(zodiac){
    var zodiacSign = '<img src="images/'+zodiac.img+'" alt="'+zodiac.name+'">';
    document.getElementById("output").innerHTML= '<h1>'+zodiac.name+'</h1>' + zodiacSign;
}