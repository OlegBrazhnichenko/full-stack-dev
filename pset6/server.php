<?php

    include './mysqlConfig.php';

    $link = mysqli_connect($mysql_host, $mysql_username, $mysql_password, $db_name);
    if (!$link) {
        die('Could not connect: ' . mysqli_error($link));
    }

    $db_selected = mysqli_select_db($link, 'chat');


    session_start();

    switch ($_SERVER['REQUEST_METHOD']) {
        case "POST":
            handlePostRequest();
            break;
        case "GET":
            handleGetRequest();
            break;
    }

    function handlePostRequest() {
        switch ($_POST["action"]) {
            case "send message":
                postMessage();
                break;
            case "login":
                login();
                break;
            case "logout":
                logout();
                break;
            case "register":
                register();
                break;
        }
    }

    function handleGetRequest() {
        switch ($_GET["action"]) {
            case "get messages":
                getMessages();
                break;
            case "checkAuth":
                checkAuth();
        }
    }

    function checkAuth() {

        if (isset($_SESSION['username'])) {

            echo "true";
        } else {

            echo "false";
        };
    }

    function login() {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if (userExist($username, $password) === "true") {
            $_SESSION['username'] = $username;

            echo 'success';
        } else {

            echo 'failed';
        };
    }

    function logout() {
        session_destroy();
    }

    function register() {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if (userExist($username, $password) === "false") {
            $sql = 'INSERT INTO `users`(`username`, `password`) VALUES ("'.$username.'", "'.$password.'")';
            if(!mysqli_query($GLOBALS['link'], $sql)) {
                mysqli_error($GLOBALS['link']);
            };
            if (userExist($username, $password)) {
                $_SESSION['username'] = $username;

                echo 'register success';
            }
        } else {

            echo 'user exist';
        };
    }

    function userExist($username, $password) {

        $sql = 'SELECT `username` FROM `users` WHERE `username` = "' . $username . '" AND `password` ="' . $password.'"';
        $result = mysqli_query($GLOBALS['link'], $sql);
//        print_r((mysqli_num_rows($result) >= 1) === false);
        if (mysqli_num_rows($result) >= 1) {
            return "true";
        } else {
            return "false";
        }

    }

    function postMessage() {
        if (isset($_SESSION['username'])) {
            $sql = 'INSERT INTO `messages`(`username`, `message`, `timestamp`)
                VALUES ("'.$_SESSION['username'].'","'.$_POST['message'].'",CURRENT_TIMESTAMP)';
            if (mysqli_query($GLOBALS['link'], $sql)) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . mysqli_error($GLOBALS['link']);
            }
        } else {

            echo "auth failed";
        }
    }

    function getMessages() {
        $sql = 'SELECT `id`, `username`, `message`, UNIX_TIMESTAMP(`timestamp`) FROM `messages` WHERE 1';
        $result = mysqli_query($GLOBALS['link'], $sql);
        $messages = Array();
        while($row = mysqli_fetch_assoc($result)) {
            $message = new StdClass();
            $message->id        = $row['id'];
            $message->username  = $row['username'];
            $message->message   = $row['message'];
            $message->timestamp = $row['UNIX_TIMESTAMP(`timestamp`)'];
            $messages[]         = $message;
        }

        echo json_encode($messages);
    }

    function filterMessages($messages) {
        $messages = json_decode($messages);
        return json_encode(array_values(array_filter($messages, function($value){
            return intval($value->timestamp) >= time()-60*60*1000;
        })));

    }

    mysqli_close($link);
