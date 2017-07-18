function makeLinks(){
    var links = document.getElementById('links').value;
    links = links.replace(/http:\/\/|https:\/\//gi,'');
    links = links.split(',');
    for(var i = 0; i < links.length; i++){
        document.getElementById('result').innerHTML = '<li><a href="'+links[i]+'">'+links[i]+'</a></li>'
    }
}