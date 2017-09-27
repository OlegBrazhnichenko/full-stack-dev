$(function () {

    loadBalloons();

    $("#parent").dblclick(function (event) {
        event.preventDefault();
        var x = event.offsetX;
        var y = event.offsetY;
        var id = new Date().getTime();
        createNewBalloon(id, x, y);
    });
    $(document).on('keyup', function (event) {
        var input = event.target;
        if (event.keyCode === 13 && $(input).is('input')) {
            var inputText = input.value;
            var parent = $(input.parentNode);
            if(inputText.trim() === ""){
                parent.remove();
                deleteBalloon(parent[0].id);
            }else{
                parent.append("<div class='text'>" + inputText + "</div>");
                saveBalloon(parent[0].id, parseInt(parent[0].style.left), parseInt(parent[0].style.top), inputText);
                $(input).remove();
            }
        }
        if (event.keyCode === 27) {
            $(input).blur();
        }
    })

});

function loadBalloons(){
    $.ajax({
        url: "./server.php",
        type: "GET",
        success: function(balloons){
            balloons = JSON.parse(balloons);
            console.log(balloons);
            for (var i = 0; i < balloons.length; i++) {
                createBalloon(balloons[i].id, balloons[i].x, balloons[i].y, balloons[i].text);
            }
        }
    });
}

function saveBalloon(id, x, y, text){
    $.ajax({
        url: "./server.php",
        type: "POST",
        data: {id: id, x: x, y: y, text: text}
    });
}

function deleteBalloon(id){
    $.ajax({
        url: "./server.php",
        type: "DELETE",
        data: {id: id}
    });
}

function createNewBalloon(id, x, y){

    createBalloon(id, x, y, "Type something!");
    saveBalloon(id, x, y, "Type something!");

}

function createBalloon(id, x, y, text){
    $("#parent").append("" +
        "<div id='" + id + "' class='draggable'>" +
            "<div class='text'>"
            + text +
            "</div>" +
        "</div>");

    var newDraggable = $("#" + id);
    newDraggable.draggable({containment: "parent"});
    newDraggable.css('top', y);
    newDraggable.css('left', x);
    newDraggable.dblclick(function (event) {
        event.preventDefault();
        event.stopPropagation();
        var span = $(this).find('div')[0];
        var spanText = span.innerHTML;
        $(this).append("<input type='text' value='" + spanText + "'>");
        $(span).remove();
        var input = $(this).find('input')[0];
        $(input).focus();
        $(input).focusout(function (event) {
            if(this.value.trim() === ""){
                $(event.target.parentNode).remove();
            }
            $(event.target.parentNode).append("<div class='text'>" + spanText + "</div>");
            $(this).remove();
        });
    });
    newDraggable.bind('dragstop', function(event){
       saveBalloon(id, newDraggable.css('left'), newDraggable.css('top'), $(event.target).find('.text')[0].innerHTML)
    });
}