$(function() {
    checkDatabase().then(function() {
        isAuth();
    }, function() {
        console.error('error connecting with database, please set up correct username and password in mysqlConfig.php');
    });
});

function checkDatabase() {
    return $.ajax({
        url: "./databaseSetup.php",
        type: "POST",
        success: function(connection){
            return connection === "success";
        }
    });
}

function isAuth() {
    $.ajax({
        url: "./server.php",
        type: "GET",
        data: {action: "checkAuth"},
        success: function(response){
            if (response === "true") {
                initializeMainPage();
                show("chat");
            } else {
                show("login");
            }
        }
    });
}

function show(page) {
    switch (page) {
        case "chat" :
            $("#login").hide();
            $("#chat").show();
            break;
        case "login":
            $("#chat").hide();
            $("#login").show();
            break;
    }
}

function login(e) {
    e.preventDefault();

    var username = $("#username")[0];
    var password = $("#password")[0];
    $.ajax({
       url: "./server.php",
       type: "POST",
       data: {
           action: "login",
           username: username.value.trim(),
           password: password.value.trim()
       },
       success: function(response){
           if(response === "success") {
               username.value = '';
               password.value = '';
               initializeMainPage();
               show("chat");
           } else if (response === "failed") {
                register();
           }
       }
    });
}

function logout() {
    $.ajax({
        url: "./server.php",
        type: "POST",
        data: {action: "logout"},
        success: function(){
            clearInterval(window.interval); // stop requests for new messages
            show("login");
        }
    });
}

// Method login & register are same because of they are simulating work with two different forms
// but at the moment there is only one form
function register() {

    var username = $("#username")[0];
    var password = $("#password")[0];

    $.ajax({
        url: "./server.php",
        type: "POST",
        data: {
            action: "register",
            username: username.value.trim(),
            password: password.value.trim()
        },
        success: function(response){
            console.log('register status: ' + response);
            if(response === "register success") {
                initializeMainPage();
                show("chat");
            }
        }
    });
    username.value = '';
    password.value = '';
}
function initializeMainPage() {

    updateMessages();

    $("#message-input").keypress(function (e) {
        if (e.which === 13) {
            handleSend();
        }
    });
}

function handleSend() {
    var message = $("#message-input")[0];
    var newMessage = message.value.trim().replace(/ +/g, " ");
    if (newMessage !== '') {
        sendMessage(newMessage);
        message.value = "";
    }
}

function sendMessage(message) {
    $.ajax({
        url: "./server.php",
        type: "POST",
        data: {action: "send message", message: message},
        success: function(){
            loadMessages();
        }
    });

}

function updateMessages() {
    loadMessages();

    // save interval key in window object for ability to clear it
    window.interval = setInterval(function(){
        loadMessages();
    }, 1000)
}

function loadMessages() {
    $.ajax({
        url: "./server.php",
        type: "GET",
        data: {action: "get messages"},
        success: function(response){
            showMessages(JSON.parse(response));
        }
    });
}

function showMessages(messages) {
    var output = $("#messages");
    output.empty();
    var atTheBottom = output.scrollTop === output[0].scrollHeight;
    for (var i = 0; i < messages.length; i++) {
        messages[i].timestamp = convertTime(Number(messages[i].timestamp));
        var template = '<div class="message" id="'+messages[i].id+'">' +
            '<span class="time">['+messages[i].timestamp+']</span>' +
            '<span class="name">'+messages[i].username+':</span>' +
            '<span class="text">'+messages[i].message+'</span>' +
            '</div>';
        output.append(template);
    }
    // scroll down only if user is at the bottom of the chat. if not set this expression
    // user can't scroll to the top

    output.scrollTop(output[0].scrollHeight);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function convertTime(timestamp) {
    timestamp = new Date(timestamp*1000);
    var h = timestamp.getHours();
    var m = timestamp.getMinutes();
    var s = timestamp.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    return h + ":" + m + ":" + s;
}