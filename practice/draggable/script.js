$(function () {
    $("#parent").dblclick(function (event) {
        var newId = new Date().getTime();
        $("#parent").append("<div id='" + newId + "' class='draggable'><span>Type something!</span></div>");
        var newDraggable = $("#" + newId);
        newDraggable.draggable({containment: "parent"});
        console.log(event);
        var x = event.offsetX;
        var y = event.offsetY;
        newDraggable.css('top', y);
        newDraggable.css('left', x);
        newDraggable.dblclick(function (event) {
            event.preventDefault();
            event.stopPropagation();
            var span = $(this).find('span')[0];
            var spanText = span.innerHTML;
            $(this).append("<input type='text' value='" + spanText + "'>");
            $(span).remove();
            var input = $(this).find('input')[0];
            $(input).focus();
            $(input).focusout(function (event) {
                if(this.value.trim() === ""){
                    $(event.target.parentNode).remove();
                }
                $(event.target.parentNode).append("<span>" + spanText + "</span>");
                $(this).remove();
            });
        });
    });
    $(document).on('keyup', function (event) {
        var input = event.target;
        if (event.keyCode === 13 && $(input).is('input')) {
            var inputText = input.value;
            var parent = input.parentNode;
            if(inputText.trim() === ""){
                $(parent).remove();
            }else{
                $(parent).append("<span>" + inputText + "</span>");
                $(input).remove();
            }
        }
        if (event.keyCode === 27) {
            $(input).blur();
        }
    })

});
