window.onload = function(){
    var age = document.getElementById("age");
    age.addEventListener('input',function(event){
        display_output(format_age(event.target.value));
    })
};

function format_age(age){
    var str;
    if(age>=10 && age<= 20 ){
        str = "лет";
    }else{
        switch (age % 10){
            case 1:
                str="год";
                break;
            case 2:
            case 3:
            case 4:
                str="года";
                break;
            default:
                str="лет";
                break;
        }
    }
    age +=" "+str;
    return age;
}

function display_output(output){
    document.getElementById("output").innerHTML = output;
}

