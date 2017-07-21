function determine(){
    var apartmentNumber = document.getElementById('apartment').value;
    var floors          = document.getElementById('floor').value;
    var entrances       = document.getElementById('entrance').value;
    var apartments      = document.getElementById('apartments').value;

    if(apartments * entrances*floors < apartmentNumber){
        document.getElementById('result').innerHTML = 'This apartment does not exist!';

        return false;
    }
    var apartmentsInEntrance = floors * apartments;
    var entranceNum = Math.ceil(apartmentNumber / apartmentsInEntrance);
    var floorNum = Math.ceil((apartmentNumber % apartmentsInEntrance) / apartments);
    document.getElementById('result').innerHTML = 'This apartment is on the '+floorNum
                                                +' floor and in the '+entranceNum
                                                +' entrance';

}