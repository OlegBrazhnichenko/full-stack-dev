function getOptions(selectId){
    var options = [
        {
            id:"mySelect",
            data: [
                {
                    value: "oleg",
                    img : "images/boy.jpg"
                },
                {
                    value: "Nastya",
                    img : "images/girl.jpg"
                }
            ]
        }
    ];

    return options.filter(function( obj ) {
        return obj.id === selectId;
    });
}

window.onload = function(){
  var responseData = getOptions('mySelect');
  for (var i = 0; i < responseData.length; i++) {

          addOptions(responseData[i].id, responseData[i].data);

  }


};