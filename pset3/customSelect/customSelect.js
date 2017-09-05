
handleAllSelects();

function handleAllSelects(){
    var selects = $(".customSelect");
    for(var i = 0; i < selects.length; i++){

        handleSelect(selects[i], getOptionsFromSelect(selects[i]));
    }
}

function handleSelect(select, selectOptions){
    selectOptions = selectOptions || [{data : []}]; // if no data, set default empty data
    select = $(select);
    if(!select.find('.selectedOption').length){
        select.append("<div class='selectedOption'><span>"+$(select).attr("data-placeholder")+"</span></div>");
        select.append("<div class='options'></div>");
        select.find(".selectedOption").on("click", function(){
            select.find(".options").toggle();
        });
    }

    handleOptions(select, selectOptions);
}

function addOptions(select, options){
    select = $("#"+select);
    for (var i = 0; i < options.length; i++){
        var option = document.createElement('div');
        option.className = 'customOption';
        option.setAttribute('data-img', options[i].img);
        option.setAttribute('data-value', options[i].value);
        select.append(option);
    }

    handleSelect(select[0], getOptionsFromSelect(select[0]));
}

function handleOptions(select, selectOptions){
    select = $(select);
    var optionElements = select.find("div.customOption");
    select.find("div.options").append(optionElements);
    for ( var i = 0; i < selectOptions.data.length; i++ ) {
        var optionElem = $(optionElements[i]);
            optionElem.append(
            "<img src='"+selectOptions.data[i].img+"' />" +
            "<span>"+selectOptions.data[i].value+"</span>"
        );
        optionElem.on("click", function(e){
            select.find("div.selected").toggleClass("selected");
            $(this).toggleClass("selected");
            select.find(".options").toggle();
            handleSelectedOptions(select);
        });
    }
}


function getOptionsFromSelect(select){
    var optionElements = $(select).find(".customOption");
    var options = {
        id   : select.id,
        data : []
    };
    for (var i = 0; i < optionElements.length; i++) {
        var optionElement = $(optionElements[i]);
        options.data.push({
            value: optionElement.attr("data-value"),
            img : optionElement.attr("data-img")
        })
    }

    return options;
}

function handleSelectedOptions(select){
    select = $(select);
    var selectedOption = select.find("div.selected");
    if (selectedOption.length > 1) {
        console.error("There should be only one selected option.");

        return false;
    }
    selectedOption = selectedOption[0];
    select.find("div.selectedOption")[0].innerHTML = selectedOption.innerHTML;
    select.trigger("change"); // fire event for user to have an ability to handle change.
}