function make(){
    var height = document.getElementById('height').value;
    var width = document.getElementById('width').value;
    var board = document.getElementById('board');
    board.innerHTML = "";
    for(var i = 0; i < height; i++){
        var row = document.createElement('tr');
        for(var j = 0; j < width; j++){
            var cell = document.createElement('td');
            if((i+j) %2 === 0){
                cell.classList+= "black"
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}